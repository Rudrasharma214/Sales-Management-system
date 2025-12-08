import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const SearchBar = ({ query, setQuery }) => {
  const [value, setValue] = useState(query.search);
  
  const handleDebouncedSearch = (debouncedValue) => {
    setQuery(prev => ({ ...prev, search: debouncedValue, page: 1 }));
  };
  
  useDebounce(value, handleDebouncedSearch, 300);

  return (
    <div className="relative w-80">
      <svg 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
      <input
        className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-md text-sm bg-gray-100 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:bg-white transition-colors"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;