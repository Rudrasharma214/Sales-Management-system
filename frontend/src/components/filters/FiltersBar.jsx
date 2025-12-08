import { useMemo } from "react";
import useFilters from "../../hooks/useFilters.js";
import SortDropdown from "./SortDropdown";
import FiltersDropdown from "./FiltersDropdown";

const FiltersBar = ({ query, setQuery }) => {

  const initialFilters = useMemo(
    () => ({
      search: query.search || "",
      region: query.region || [],
      gender: query.gender || [],
      ageFrom: query.ageFrom || "",
      ageTo: query.ageTo || "",
      category: query.category || [],
      tags: query.tags || [],
      payment: query.payment || [],
      dateFrom: query.dateFrom || "",
      dateTo: query.dateTo || "",
      sort: query.sort || "",
    }),
    [query]
  );

  const {
    pendingFilters,
    setPendingFilters,
    hasSelectedFilters,
    resetFilters,
  } = useFilters(initialFilters);

  const handleApplyFilters = () => {
    setQuery((prev) => ({
      ...prev,
      ...pendingFilters,
      page: 1,
    }));
  };

  const handleCancel = () => {
    resetFilters();
  };

  const handleReset = () => {
    const defaultFilters = {
      search: "",
      region: [],
      gender: [],
      ageFrom: "",
      ageTo: "",
      category: [],
      tags: [],
      payment: [],
      dateFrom: "",
      dateTo: "",
      sort: "",
      page: 1,
    };
    setQuery(defaultFilters);
    resetFilters();
  };

  return (
    <div className="w-full m-2">
      <div className="flex items-center justify-start gap-3">
        <button
          onClick={handleReset}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors"
          title="Reset all filters"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        <div className="flex gap-3 items-center whitespace-nowrap">
          <FiltersDropdown
            pendingFilters={pendingFilters}
            setPendingFilters={setPendingFilters}
          />
        </div>

        <SortDropdown
          pendingFilters={pendingFilters}
          setPendingFilters={setPendingFilters}
        />
      </div>

      {hasSelectedFilters && (
        <div className="mt-3 ml-2 flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition-colors font-medium"
            title="Apply selected filters"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;
