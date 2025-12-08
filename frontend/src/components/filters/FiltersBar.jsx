import SortDropdown from "./SortDropdown";
import FiltersDropdown from "./FiltersDropdown";

const FiltersBar = ({ filters, setFilters, query, setQuery }) => {
  return (
    <div
      className="w-full bg-white border border-gray-200 
                flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-1">
        <FiltersDropdown filters={filters} setFilters={setFilters} />
      </div>

      <SortDropdown query={query} setQuery={setQuery} />
    </div>
  );
};

export default FiltersBar;
