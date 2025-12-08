import SearchBar from "./SearchBar";

const Header = ({ query, setQuery }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="w-full flex items-center justify-between px-5 py-3">

        <h1 className="text-[16px] font-semibold text-gray-900">
          Sales Management System
        </h1>

        <SearchBar query={query} setQuery={setQuery} />

      </div>
    </header>
  );
};

export default Header;
