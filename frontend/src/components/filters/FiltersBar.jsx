import { useState } from "react";
import SortDropdown from "./SortDropdown";
import FiltersDropdown from "./FiltersDropdown";

const FiltersBar = ({ query, setQuery }) => {
  const [pendingFilters, setPendingFilters] = useState({
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
  });

  const handleApplyFilters = () => {
    setQuery((prev) => ({
      ...prev,
      ...pendingFilters,
      page: 1,
    }));
  };

  const hasSelectedFilters =
    pendingFilters.region.length > 0 ||
    pendingFilters.gender.length > 0 ||
    pendingFilters.category.length > 0 ||
    pendingFilters.tags.length > 0 ||
    pendingFilters.payment.length > 0 ||
    pendingFilters.ageFrom ||
    pendingFilters.ageTo ||
    pendingFilters.dateFrom ||
    pendingFilters.dateTo ||
    pendingFilters.sort;

  return (
    <div className="w-full m-2">
      <div className="flex items-center justify-start gap-3">
        <div className="flex gap-3 items-center whitespace-nowrap ">
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
          >
            Apply
          </button>

          <button
            onClick={() =>
              setPendingFilters({
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
              })
            }
            className="px-2 py-0.5 bg-gray-400 text-white text-xs rounded-sm hover:bg-gray-500 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;
