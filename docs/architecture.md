# Retail Sales Management System - Architecture Document

## Backend Architecture

The backend is organized in layers where each part has a specific job.

Entry Point (src/index.js):
Starts the Express server. Sets up CORS rules and middleware. Creates database indexes when the server starts. Runs on port 3000. Has a health check endpoint at GET /api/health to test if the API is working.

Controller Layer (src/controllers/sales.controller.js):
Checks all incoming query parameters. Cleans up parameters using normalizeParam function to convert arrays to strings (because axios sends data differently). Checks if numbers are valid using validateNumeric. Makes sure age ranges don't have mistakes (like From being bigger than To). Sends clean data to the service layer.

Service Layer (src/services/sales.service.js):
Takes the clean parameters and builds a SQL query. Runs the query on the database. Counts total items, total pages, and checks if there's a next page. Sends results back to the controller.

Utility Layer:
- buildQuery.js: Creates the SQL query with filter conditions, sorting, and pagination.
- sendResponse.js: Formats all responses in the same way with status, message, and data.
- statusCode.js: Stores HTTP status codes (200, 400, 404, 500).
- AppError.js: Custom error class for consistent error handling.

Middleware:
- error.middleware.js: Catches all errors that happen anywhere. Formats them nicely and sends error messages back to the frontend.

Configuration:
- db.js: Opens a connection to the SQLite database file. The database and data are loaded only once at the start, not every time the server runs.
- indexes.js: Creates database indexes to make searches fast. Uses IF NOT EXISTS so it only creates them if they don't already exist.

Database:
The sales table stores customer info (name, region, gender, age, phone), product info (category, tags), transaction info (quantity, amount, payment method, date), and other fields. All the data required by the assignment is included.

## Frontend Architecture

The frontend uses React with a component-based design. Each component does one job well.

Entry Point (src/main.jsx):
Starts the React app and puts it in the HTML page. Loads styles. Sets up React Query for getting data from the server.

Page Layer (src/pages/SalesPage.jsx):
The main page that puts all pieces together. Uses the useQuery hook to manage all the data and state. Passes the query state down to child components. Shows the header, sidebar, filters, table, and pagination.

Component Layer:

Header Components:
- Header.jsx: Shows the app name and branding at the top.
- SearchBar.jsx: The search box where users type. Waits 300ms before calling the API to avoid too many requests.

Filter Components:
- FiltersBar.jsx: The main filter container. Keeps filters in a "pending" state until the user clicks Apply. Shows Apply, Cancel, and Reset buttons. Buttons only show when filters are selected.
- FiltersDropdown.jsx: Individual filter dropdowns with checkboxes. Shows how many items are selected in each filter.
- SortDropdown.jsx: Let users choose how to sort the results (by date, quantity, or name).

Table Components:
- SalesTable.jsx: Shows the data in a table with headers and rows.
- TableHeader.jsx: The column names at the top.
- TableRow.jsx: Each row of data.

Other Components:
- Sidebar.jsx: Navigation menu on the side.
- SidebarItem.jsx: Individual menu items.
- KpiCard.jsx: Shows important numbers like total sales.
- Pagination.jsx: Previous and Next buttons to go through pages.

Custom Hooks (src/hooks/):
- useQuery.js: Keeps track of search, filters, sorting, and page number. This is the center of all data. Works with React Query to cache data.
- useDebounce.js: Delays the search input by 300ms to reduce API calls while typing.
- useFilters.js: Manages the filter state. Has methods to toggle filters, set filters, and reset them.
- useValidation.js: Checks if form data is correct and manages error messages.

Service Layer (src/services/salesService.js):
Calls the backend API. Sends query parameters and gets data back. Handles errors.

Routing:
AppRoutes.jsx sets up the routes. Right now there's just one page (the dashboard).

Styling:
All styles are in styles/index.css. Uses Tailwind CSS classes in components for quick styling.

## Data Flow

How Search Works:
1. User types in the search box
2. setQuery updates the search value
3. useDebounce waits 300ms
4. React Query sees the change and calls the API
5. Frontend sends GET /api/sales with the search term
6. Backend normalizes the search term
7. buildQuery creates a SQL query using LOWER and LIKE to find matches
8. Database returns matching results
9. Table updates with results

How Filters Work:
1. User clicks a checkbox in a filter dropdown
2. The pending filter state updates (no API call yet)
3. User clicks Apply button
4. Pending filters move into the main query state
5. Page resets to 1
6. React Query calls the API with new filters
7. Backend adds WHERE conditions to the SQL query
8. All filters combine with AND (all must be true)
9. Results come back and table updates
10. User can click Cancel to undo pending changes

How Sorting Works:
1. User picks a sort option from the dropdown
2. setQuery updates the sort value
3. React Query calls the API
4. Backend adds ORDER BY to the SQL query
5. Results come back sorted
6. Table shows sorted data

How Pagination Works:
1. User clicks Next or Previous button
2. The page number updates in the query state
3. React Query calls the API with new page number
4. Backend calculates offset as (page - 1) times 10
5. SQL query uses LIMIT 10 OFFSET value to get the right 10 rows
6. Table shows the new 10 rows
7. Buttons update based on current page

How It All Works Together:
When a user searches, filters, sorts, and navigates pages:
1. Each action updates part of the query state
2. React Query sees the change (all params are combined as the queryKey)
3. One GET request is sent to /api/sales with all parameters
4. Backend runs one query that applies search, filters, sorting, and pagination
5. Results come back with data and page info
6. Table updates with everything applied

## Folder Structure

```
backend/
  src/
    controllers/
      sales.controller.js - Checks and cleans request parameters
    services/
      sales.service.js - Runs queries and formats data
    utils/
      buildQuery.js - Builds the SQL query
      sendResponse.js - Formats API responses
      statusCode.js - HTTP status codes
      AppError.js - Custom errors
    routes/
      sales.routes.js - The /api/sales endpoint
    middleware/
      error.middleware.js - Catches and handles errors
    config/
      db.js - Opens database connection
      indexes.js - Creates database indexes
    data/
      sales.csv - The sales data file
    index.js - Server entry point
  package.json
  README.md

frontend/
  src/
    components/
      filters/
        FiltersBar.jsx - Main filter container
        FiltersDropdown.jsx - Individual filters with checkboxes
        SortDropdown.jsx - Sort selector
        Dropdown.jsx - Reusable dropdown
      header/
        Header.jsx - Top header
        SearchBar.jsx - Search input
      table/
        SalesTable.jsx - Table container
        TableHeader.jsx - Column names
        TableRow.jsx - Data rows
        Pagination.jsx - Page navigation
      kpi/
        KpiCard.jsx - Info cards
      sidebar/
        Sidebar.jsx - Side menu
        SidebarItem.jsx - Menu items
    hooks/
      useQuery.js - Manages all query state
      useDebounce.js - Delays input
      useFilters.js - Manages filters
      useValidation.js - Validates forms
    pages/
      SalesPage.jsx - Main page layout
    routes/
      AppRoutes.jsx - App routes
    services/
      salesService.js - Calls the API
    styles/
      index.css - Global styles
    App.jsx - Root component
    main.jsx - App entry point
  package.json
  README.md

docs/
  architecture.md - This file

.env - Settings
README.md - Main documentation
assignment.md - Assignment requirements
```

## What Each Module Does

Backend:

sales.controller.js:
- Gets HTTP requests
- Extracts and cleans query parameters
- Checks if numbers are valid
- Checks age ranges (From should not be bigger than To)
- Handles errors from bad inputs
- Sends clean data to the service

sales.service.js:
- Calls buildQuery to create SQL
- Runs SQL on the database
- Counts total items and pages
- Formats the response
- Handles database errors

buildQuery.js:
- Takes parameters
- Creates SELECT statement
- Adds WHERE for each filter
- Adds ORDER BY for sorting
- Adds LIMIT and OFFSET for pagination
- Returns the SQL and the values to use

sendResponse.js:
- Formats all success responses in the same way
- Every response has: success flag, message, data, and status code
- Used everywhere in the app to keep responses consistent
- Makes the frontend know exactly what to expect from the API

AppError.js:
- Custom error class that extends JavaScript Error
- Carries both an error message and an HTTP status code
- Captures stack trace showing exactly where the error started
- Stack trace shows file name, line number, and function names in the call chain

error.middleware.js:
- Global error handler that catches ALL errors from anywhere in the app
- If error is AppError, uses its status code. Otherwise uses 500 (internal error)
- Formats errors into responses and sends them back to frontend
- In development: shows full stack trace for debugging
- In production: hides stack trace for security (doesn't expose code to hackers)
- Stack trace tracing: shows the complete call chain from where error started to where it was caught

indexes.js:
- Creates indexes on search columns
- Creates indexes on filter columns
- Creates indexes on sort columns
- Only creates if they don't exist (idempotent)

Frontend:

SalesPage.jsx:
- Sets up the query hook
- Manages page state
- Shows all child components
- Shows loading and error states
- Arranges the page layout

SearchBar.jsx:
- Gets user input
- Delays the input (debounce)
- Updates the query
- Shows what the user typed

FiltersBar.jsx:
- Keeps filters before they're applied
- Shows filter dropdowns
- Shows Apply, Cancel, Reset buttons
- Manages filter actions

FiltersDropdown.jsx:
- Shows filter options with checkboxes
- Counts selected items
- Lets users pick multiple items

SortDropdown.jsx:
- Shows sort options
- Updates sort when user chooses
- Updates the query

SalesTable.jsx:
- Shows data in table format
- Has headers and rows
- Shows how many items

Pagination.jsx:
- Shows Previous and Next buttons
- Disables buttons when needed
- Shows current page number

useQuery.js:
- Stores search term
- Stores filter selections
- Stores sort choice
- Stores page number
- Works with React Query for caching

useDebounce.js:
- Delays function execution
- Waits 300ms by default
- Cleans up timers when done
- Returns delayed value

useFilters.js:
- Stores pending filter state
- toggleFilter method - turns filter on/off
- setFilter method - sets a whole filter group
- resetFilters method - clears all filters
- hasSelectedFilters flag - tells if any filter is selected

salesService.js:
- Calls the backend API
- Sends query parameters
- Gets results back
- Handles API errors
