import SortDropdown from "./SortDropdown";
import FiltersDropdown from "./FiltersDropdown";

const FiltersBar = ({ query, setQuery }) => {
  return (
    <div className="w-full m-2 flex items-center justify-start gap-18">

      <div className="flex gap-3 items-center whitespace-nowrap ">
        <FiltersDropdown query={query} setQuery={setQuery} />
      </div>

      <SortDropdown query={query} setQuery={setQuery} />
    </div>
  );
};

export default FiltersBar;
