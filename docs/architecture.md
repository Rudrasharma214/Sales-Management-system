# Retail Sales Management System - Architecture

## Backend Architecture

The backend uses a layered architecture where each component has a single responsibility.

**Entry Point (src/index.js):** Initializes Express server with CORS configuration, loads environment variables, creates database indexes on startup, and registers the sales route.

**Controller Layer (src/controllers/sales.controller.js):** Validates and normalizes incoming query parameters. Handles type conversion, range validation (ageFrom cannot exceed ageTo), and passes clean data to the service layer. All errors are caught and passed to middleware.

**Service Layer (src/services/sales.service.js):** Executes database operations using the controller's cleaned parameters. Builds and runs SQL queries, computes pagination metadata (total items, total pages, hasNext flag), and returns formatted results.

**Custom Utilities (Core Building Blocks):**
- **AppError.js:** Custom error class that carries both message and HTTP status code. Extends JavaScript Error and captures stack traces for debugging. Used throughout the codebase to throw consistent, predictable errors.
- **sendResponse.js:** Standardized response formatter used everywhere in the API. Ensures every successful response follows the same contract with frontend (success flag, message, data, status code). Maintained consistency across all endpoints.
- **buildQuery.js:** Constructs parameterized SQL queries with filters, sorting, and pagination. Prevents SQL injection through parameter binding.
- **statusCode.js:** Centralized HTTP status constants.

**Error Handling (error.middleware.js):** Global error handler that catches all exceptions from any endpoint. Identifies whether error is custom AppError or unexpected, formats responses appropriately, and conditionally includes stack traces (development only for debugging, hidden in production).

**Configuration:** Database uses Better-SQLite3 with indexes on search and filter columns for query performance.

## Frontend Architecture

React application with component composition and custom hooks for state management.

**Entry Point (src/main.jsx):** Renders React app and wraps it with React Query's QueryClientProvider for server state caching.

**Page Layer (src/pages/SalesPage.jsx):** Main layout component. Uses `useQuery` hook to manage global state for search parameters, active filters, sort option, and current page.

**Component Structure:**
- **Header & Search:** Navigation and search input with 800ms debounce to minimize API calls
- **Filters:** Container with pending state pattern - filters apply only when user clicks "Apply", not on each selection
- **Table:** Data display with headers and rows, handles empty states and loading states
- **Pagination:** Previous/Next navigation buttons

**Custom Hooks (Reusable Logic):**
- **useQuery.js:** Central state management holding search term, active filters, sort choice, and page number
- **useFilters.js:** Manages pending filter state before application to prevent premature API calls
- **useDebounce.js:** Utility hook for debouncing function execution

**Service Layer (src/services/salesService.js):** Single point of API contact using axios. Handles request/response for `/api/sales` endpoint.

## Data Flow

User interactions update state through hooks. State changes trigger React Query refetch with combined parameters. Backend receives one request with all filters/sort/pagination, runs a single optimized SQL query, returns data with metadata. Frontend re-renders table with results.

## Directory Structure

```
backend/src/
  controllers/     - Request validation and parameter normalization
  services/        - Database operations and query execution
  utils/           - Shared utilities (buildQuery, AppError, sendResponse, statusCode)
  routes/          - API endpoint definitions
  middleware/      - Global error handler
  config/          - Database connection and index creation

frontend/src/
  components/      - Reusable UI components (filters, table, pagination, header)
  hooks/           - Custom React hooks (useQuery, useFilters, useDebounce)
  pages/           - Page layouts
  services/        - API communication
  routes/          - Client-side routing
  styles/          - Tailwind CSS
```

## Edge Case Handling

1. **No Search Results:** Returns empty array with `totalItems: 0` and `totalPages: 0` metadata without errors
2. **Conflicting Filters (ageFrom > ageTo):** Validation in controller prevents impossible ranges, returns zero results gracefully
3. **Invalid Numeric Inputs:** Non-numeric values caught in `validateNumeric()` function, prevents crashes with clear error messages
4. **Large Filter Combinations:** Efficient SQL construction handles multiple filters combined with AND logic
5. **Missing Optional Fields:** Empty strings and null values filtered out, no "undefined filter" errors

## Key Design Decisions

1. **Single Endpoint:** All filtering, sorting, pagination routed through `/api/sales` with query parameters for simplicity and efficiency
2. **Pending Filter State:** Frontend buffers filter selections before applying to prevent unnecessary API calls
3. **Parameterized Queries:** All SQL uses parameter binding to prevent injection attacks
4. **Custom Error & Response Classes:** AppError and sendResponse standardize error handling and response format across entire backend
5. **Centralized Error Middleware:** Catches all exceptions, distinguishes error types, and returns consistent formatted responses
