const SortDropdown = ({ query, setQuery }) => {
  return (
    <select
      className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 cursor-pointer outline-none focus:border-blue-500 min-w-[200px]"
      value={query.sort}
      onChange={(e) =>
        setQuery(prev => ({ ...prev, sort: e.target.value, page: 1 }))
      }
    >
      <option value="">Sort by: Customer Name (A–Z)</option>
      <option value="date">Date (Newest)</option>
      <option value="quantity">Quantity</option>
      <option value="customerName">Customer Name (A–Z)</option>
    </select>
  );
};

export default SortDropdown;