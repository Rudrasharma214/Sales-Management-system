## 1. Overview (3–5 lines)

The frontend is a React (Vite) application providing search, filter, sort, and pagination features for sales data. It uses React Query for efficient API interaction and custom hooks for reusable logic. Tailwind CSS is used for utility-based styling.

## 2. Tech Stack

* React (Vite)
* Tailwind CSS
* React Query
* Axios
* Lucide React Icons

## 3. Search Implementation Summary

Search is case-insensitive on customer name and phone. Input is debounced (400ms) to reduce API calls. Search automatically resets pagination to page 1 and works with all filters and sorting.

## 4. Filter Implementation Summary

Filters include region, gender, age range, category, tags, payment method, and date range. Pending filter state prevents unnecessary API calls until Apply is pressed. Reset clears all filters.

## 5. Sorting Implementation Summary

Sorting supports date, quantity, and name. Sorting persists across navigation and combines with search and filter parameters.

## 6. Pagination Implementation Summary

Fixed page size of 10. Pagination uses Previous/Next navigation and resets to page 1 when search or filters update. All parameters persist during navigation.

## 7. Setup Instructions

1. `cd frontend`
2. `npm install`
3. Create `.env` with `VITE_API_URL=http://localhost:3000`
4. `npm run dev` and open `http://localhost:5173`