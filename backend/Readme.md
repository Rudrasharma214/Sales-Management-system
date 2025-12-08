## 1. Overview (3–5 lines)

The backend provides a REST API for sales data using Node.js, Express, and SQLite. It supports search, filtering, sorting, and pagination using optimized SQL queries. All query parameters are validated and normalized for predictable results.

## 2. Tech Stack

* Node.js
* Express.js
* Better-SQLite3
* dotenv
* CORS

## 3. Search Implementation Summary

Search performs case-insensitive matching on customer name and phone using `LOWER()` and `LIKE`. Query parameters are normalized for both single and array values.

## 4. Filter Implementation Summary

Filters include region, gender, age range, category, tags, payment method, and date range. All filters combine using SQL `WHERE` conditions. Numeric and range fields include validation to prevent invalid inputs.

## 5. Sorting Implementation Summary

Sorting supports date, quantity, and name. Backend validates sort keys and applies a single `ORDER BY` integrated with all active filters and search terms.

## 6. Pagination Implementation Summary

Page size is fixed at 10. SQL uses `LIMIT` and `OFFSET`. Response includes total items, total pages, current page, and next-page availability.

## 7. Setup Instructions

1. `cd backend`
2. `npm install`
3. Create `.env` (e.g., PORT, Frontend path)
4. `npm run dev` for development or `npm start` for production

SQLite database initializes automatically and loads sample data if present.
