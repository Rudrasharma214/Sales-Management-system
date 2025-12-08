const SortDropdown = ({ pendingFilters, setPendingFilters }) => {
  return (
    <select
      className="px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700 cursor-pointer outline-none focus:border-blue-500 min-w-[200px]"
      value={pendingFilters.sort || ""}
      onChange={(e) =>
        setPendingFilters(prev => ({ ...prev, sort: e.target.value }))
      }
    >
      <option value="">Sort by: Default</option>
      <option value="date">Date (Newest)</option>
      <option value="quantity">Quantity</option>
      <option value="name">Customer Name (A–Z)</option>
    </select>
  );
};

export default SortDropdown;