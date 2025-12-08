import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

const SearchBar = ({ query, setQuery }) => {
  const [value, setValue] = useState(query.search);
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    setQuery(prev => ({ ...prev, search: debounced, page: 1 }));
  }, [debounced]);

  return (
    <input
      className="w-80 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none transition-colors focus:border-blue-500 placeholder:text-gray-400"
      placeholder="Search name or phone..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBar;