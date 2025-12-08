# Retail Sales Management System - Architecture Document

## Backend Architecture

The backend implements a layered architecture with clear separation of concerns across controllers, services, utilities, and configuration.

Entry Point (src/index.js):
Initializes Express server with CORS configuration and middleware setup. Creates database indexes on startup. Listens on port 3000 by default. Provides health check endpoint at GET /api/health.

Controller Layer (src/controllers/sales.controller.js):
Validates and normalizes all incoming query parameters. Implements normalizeParam function to handle array-to-string conversion from axios. Implements validateNumeric for type validation with error messages. Checks age range conflicts preventing invalid To less than From conditions. Passes validated parameters to service layer.

Service Layer (src/services/sales.service.js):
Executes query building and database operations. Calculates pagination metadata including total items, total pages, and hasNext flag. Handles database errors and passes them to middleware.

Utility Layer:
- buildQuery.js: Constructs parameterized SQL queries with WHERE clauses for all filters. Implements sorting with ORDER BY. Applies LIMIT and OFFSET for pagination.
- sendResponse.js: Standardizes all API response formats with success flag, status codes, messages, and data.
- statusCode.js: Defines HTTP status constants (200, 400, 404, 500).
- AppError.js: Custom error class extending Error for consistent error handling.

Middleware:
- error.middleware.js: Catches all errors from controllers and services. Formats error responses with status codes and messages.

Configuration:
- db.js: Initializes SQLite database connection. Loads CSV data into database on startup.
- indexes.js: Creates indexes on frequently queried columns (customer_name, phone_number, date, product_category, tags, payment_method) for performance optimization.

Database Schema:
Sales table contains customer fields (name, region, gender, age, phone), product fields (category, tags), transaction fields (quantity, amount, payment_method, date), and operational fields. All required columns from assignment specifications are included.

## Frontend Architecture

The frontend implements a component-based architecture with custom hooks for state management and services for API communication.

Entry Point (src/main.jsx):
Mounts React application to DOM element. Loads global CSS styles from styles/index.css. Initializes React Query client with default cache and retry settings.

Page Layer (src/pages/SalesPage.jsx):
Orchestrates all feature components. Uses useSalesQuery hook to manage application state. Passes query state and setQuery function to child components. Renders layout with Header, Sidebar, FiltersBar, KpiCard, SalesTable, and Pagination.

Component Layer:

Header Components:
- Header.jsx: Displays application header with branding.
- SearchBar.jsx: Provides full-text search input. Uses useDebounce hook for 300ms debouncing. Calls setQuery on debounced changes.

Filter Components:
- FiltersBar.jsx: Main filter container managing pending filters state. Uses useFilters hook for filter operations. Displays Apply, Cancel, and Reset buttons. Shows buttons only when filters are selected.
- FiltersDropdown.jsx: Individual filter selector with checkboxes. Displays badge counts showing selected items. Supports multi-select for all filter types.
- SortDropdown.jsx: Sorting options selector. Allows selection of date, quantity, or name sorting.

Table Components:
- SalesTable.jsx: Renders data in table format with headers and rows.
- TableHeader.jsx: Defines column headers.
- TableRow.jsx: Displays individual sales records.

Navigation Components:
- Sidebar.jsx: Navigation menu container.
- SidebarItem.jsx: Individual menu items.

Display Components:
- KpiCard.jsx: Displays key performance indicators.
- Pagination.jsx: Previous/Next navigation controls. Disables buttons based on position.

Hook Layer (src/hooks/):
- useQuery.js: Manages centralized state for search, filters, sorting, pagination. Provides single source of truth. Integrates with React Query for server-side caching.
- useDebounce.js: Debounces input values at 300ms intervals. Accepts callback and dependencies. Reduces API calls during rapid typing.
- useFilters.js: Manages filter state with toggleFilter, setFilter, resetFilters methods. Computes hasSelectedFilters flag.
- useValidation.js: Provides form validation utilities including field validation and error management.

Service Layer (src/services/salesService.js):
Exports getSales function making API calls to backend. Constructs query parameters from state object. Handles errors and returns formatted data to components.

Routing:
AppRoutes.jsx defines application routes. Currently uses single page with dashboard layout.

Styling:
Global styles in styles/index.css. Tailwind CSS utility classes in components for responsive design.

## Data Flow

Search Flow:
1. User types in SearchBar component
2. onChange event triggers setQuery with search value
3. useQuery hook receives updated query
4. useDebounce delays API call by 300ms
5. useQuery updates queryKey triggering React Query re-fetch
6. Frontend makes GET request to /api/sales with search parameter
7. Backend normalizes search parameter
8. buildQuery generates SQL with LOWER and LIKE operators
9. Database query returns matching results
10. Results flow back through service, response formatted, and table updates

Filter Flow:
1. User selects filter in FiltersDropdown
2. Pending filter state updates without API call
3. User clicks Apply button
4. pendingFilters merge into query state
5. Query reset to page 1
6. React Query refetches with new filter parameters
7. Backend builds query with WHERE clauses for each filter
8. Filters combine using AND logic
9. Results return and table updates
10. User can click Cancel to discard pending changes

Sort Flow:
1. User selects sort option in SortDropdown
2. onChange triggers setQuery with sort value
3. React Query refetches with sort parameter
4. Backend builds query with ORDER BY clause
5. Results returned in sorted order
6. Table re-renders with sorted data

Pagination Flow:
1. User clicks Previous or Next button
2. Pagination component updates page in query state
3. React Query refetches with new page parameter
4. Backend calculates offset as (page - 1) * 10
5. SQL query applies LIMIT 10 OFFSET value
6. Results from that page returned
7. Table displays new set of 10 items
8. Current page metadata updates navigation buttons

Combined Flow Example (search + filters + sort + pagination):
1. User searches for term, selects filters, chooses sort, navigates pages
2. Each action updates corresponding part of query state
3. React Query detects queryKey change (combines all parameters)
4. Single GET request to /api/sales with all query parameters
5. Backend applies all conditions in single parameterized query
6. Database filters results through WHERE clauses, sorts with ORDER BY, paginates with LIMIT/OFFSET
7. Response includes data and pagination metadata
8. Frontend renders updated table with all active conditions applied

## Folder Structure

```
backend/
  src/
    controllers/
      sales.controller.js - Validates and normalizes request parameters
    services/
      sales.service.js - Executes queries and formats responses
    utils/
      buildQuery.js - Constructs parameterized SQL queries
      sendResponse.js - Standardizes response format
      statusCode.js - HTTP status constants
      AppError.js - Custom error class
    routes/
      sales.routes.js - Defines GET /api/sales endpoint
    middleware/
      error.middleware.js - Global error handler
    config/
      db.js - Database initialization and CSV import
      indexes.js - Index creation for performance
    data/
      sales.csv - Source data file
    index.js - Express server entry point
  package.json
  README.md

frontend/
  src/
    components/
      filters/
        FiltersBar.jsx - Main filter container
        FiltersDropdown.jsx - Individual filter selectors
        SortDropdown.jsx - Sort options selector
        Dropdown.jsx - Reusable dropdown component
      header/
        Header.jsx - Application header
        SearchBar.jsx - Search input with debouncing
      table/
        SalesTable.jsx - Main table container
        TableHeader.jsx - Column headers
        TableRow.jsx - Individual rows
        Pagination.jsx - Navigation controls
      kpi/
        KpiCard.jsx - Key performance indicators
      sidebar/
        Sidebar.jsx - Navigation menu
        SidebarItem.jsx - Menu items
    hooks/
      useQuery.js - Central query state management
      useDebounce.js - Debounce utility with callback
      useFilters.js - Filter state management
      useValidation.js - Form validation utilities
    pages/
      SalesPage.jsx - Main page layout
    routes/
      AppRoutes.jsx - Route definitions
    services/
      salesService.js - API communication
    styles/
      index.css - Global styles
    App.jsx - Root component
    main.jsx - React entry point
  package.json
  README.md

docs/
  architecture.md - This document

.env - Environment variables
README.md - Project README
assignment.md - Assignment requirements
```

## Module Responsibilities

Backend Modules:

sales.controller.js:
- Accept HTTP requests
- Extract and normalize query parameters
- Validate numeric inputs and ranges
- Handle parameter errors gracefully
- Pass validated data to service layer

sales.service.js:
- Call buildQuery to construct SQL
- Execute query on SQLite database
- Calculate pagination metadata
- Format and structure response data
- Handle database errors

buildQuery.js:
- Accept parameter object
- Construct base SELECT statement
- Build WHERE clauses for filters
- Add ORDER BY for sorting
- Apply LIMIT and OFFSET for pagination
- Return SQL string and parameterized values array

error.middleware.js:
- Catch errors from all layers
- Format error responses
- Return appropriate HTTP status codes
- Send error messages to frontend

db.js:
- Initialize SQLite database
- Create tables if not exist
- Load CSV data into database
- Maintain database connection

indexes.js:
- Create indexes on search columns
- Create indexes on filter columns
- Create indexes on sort columns
- Optimize query performance

Frontend Modules:

SalesPage.jsx:
- Initialize sales query hook
- Manage page-level state
- Orchestrate all child components
- Handle loading and error states
- Structure page layout

SearchBar.jsx:
- Capture user search input
- Debounce input changes
- Trigger query updates
- Display search term

FiltersBar.jsx:
- Manage pending filter state
- Orchestrate filter dropdowns
- Display Apply, Cancel, Reset buttons
- Coordinate filter operations

FiltersDropdown.jsx:
- Display individual filter options
- Handle checkbox selection
- Show selected item counts
- Support multi-select

SortDropdown.jsx:
- Display sorting options
- Handle sort selection
- Update query state

SalesTable.jsx:
- Render filtered and sorted data
- Display data in table format
- Show row count

Pagination.jsx:
- Display page navigation controls
- Handle page changes
- Calculate button disabled states
- Show current page and total

useQuery.js:
- Maintain search term state
- Maintain filter selections state
- Maintain sort selection state
- Maintain page number state
- Integrate with React Query
- Provide queryKey for caching

useDebounce.js:
- Delay callback execution
- Accept customizable delay interval
- Return debounced value
- Clean up timers on unmount

useFilters.js:
- Manage pending filter state
- Provide toggleFilter method
- Provide setFilter method
- Provide resetFilters method
- Compute hasSelectedFilters flag

salesService.js:
- Make API requests to backend
- Construct axios calls with query parameters
- Handle API responses
- Handle API errors
