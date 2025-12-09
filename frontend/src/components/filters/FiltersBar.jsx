import useFilters from "../../hooks/useFilters.js";
import Dropdown from "./Dropdown";

const FiltersBar = ({ query, setQuery }) => {
  const initialFilters = {
    search: query.search,
    region: query.region,
    gender: query.gender,
    ageFrom: query.ageFrom,
    ageTo: query.ageTo,
    category: query.category,
    tags: query.tags,
    payment: query.payment,
    dateFrom: query.dateFrom,
    dateTo: query.dateTo,
    sort: query.sort,
  };

  const {
    pendingFilters,
    setPendingFilters,
    hasSelectedFilters,
    resetFilters,
  } = useFilters(initialFilters);

  const toggleFilter = (field, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((x) => x !== value)
        : [...prev[field], value],
    }));
  };

  const setFilter = (field, value) => {
    setPendingFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    setQuery((prev) => ({
      ...prev,
      ...pendingFilters,
      page: 1,
    }));
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

        {/* Reset Button */}
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

        {/* Combined Filters */}
        <div className="flex gap-3 items-center whitespace-nowrap">

          {/* Customer Region */}
          <Dropdown label="Customer Region" selectedCount={pendingFilters.region.length}>
            {["North", "South", "East", "West", "Central"].map((r) => (
              <button
                key={r}
                onClick={() => toggleFilter("region", r)}
                className="flex items-center gap-2 w-full text-left"
              >
                <input
                  type="checkbox"
                  checked={pendingFilters.region.includes(r)}
                  readOnly
                  className="w-4 h-4"
                />
                {r}
              </button>
            ))}
          </Dropdown>

          {/* Gender */}
          <Dropdown label="Gender" selectedCount={pendingFilters.gender.length}>
            {["Male", "Female"].map((g) => (
              <button
                key={g}
                onClick={() => toggleFilter("gender", g)}
                className="flex items-center gap-2 w-full text-left"
              >
                <input
                  type="checkbox"
                  checked={pendingFilters.gender.includes(g)}
                  readOnly
                  className="w-4 h-4"
                />
                {g}
              </button>
            ))}
          </Dropdown>

          {/* Age Range */}
          <Dropdown
            label="Age Range"
            selectedCount={pendingFilters.ageFrom || pendingFilters.ageTo ? 1 : 0}
          >
            <div className="flex flex-col gap-2 p-2 w-40">
              <input
                type="number"
                placeholder="From"
                min="0"
                max="120"
                className="border px-2 py-1 rounded w-full"
                value={pendingFilters.ageFrom}
                onChange={(e) => setFilter("ageFrom", e.target.value)}
              />
              <input
                type="number"
                placeholder="To"
                min="0"
                max="120"
                className="border px-2 py-1 rounded w-full"
                value={pendingFilters.ageTo}
                onChange={(e) => setFilter("ageTo", e.target.value)}
              />
            </div>
          </Dropdown>

          {/* Product Category */}
          <Dropdown label="Product Category" selectedCount={pendingFilters.category.length}>
            {["Electronics", "Clothing", "Beauty"].map((c) => (
              <button
                key={c}
                onClick={() => toggleFilter("category", c)}
                className="flex items-center gap-2 w-full text-left"
              >
                <input
                  type="checkbox"
                  checked={pendingFilters.category.includes(c)}
                  readOnly
                  className="w-4 h-4"
                />
                {c}
              </button>
            ))}
          </Dropdown>

          {/* Tags */}
          <Dropdown label="Tags" selectedCount={pendingFilters.tags.length}>
            {["wireless", "smart", "unisex", "skincare", "portable", "organic", "makeup", "gadgets", "fragrance-free", "formal", "fashion", "cotton", "casual", "beauty", "accessories"].map((t) => (
              <button
                key={t}
                onClick={() => toggleFilter("tags", t)}
                className="flex items-center gap-2 w-full text-left"
              >
                <input
                  type="checkbox"
                  checked={pendingFilters.tags.includes(t)}
                  readOnly
                  className="w-4 h-4"
                />
                {t}
              </button>
            ))}
          </Dropdown>

          {/* Payment Method */}
          <Dropdown label="Payment Method" selectedCount={pendingFilters.payment.length}>
            {["UPI", "Cash", "Credit Card", "Debit Card"].map((p) => (
              <button
                key={p}
                onClick={() => toggleFilter("payment", p)}
                className="flex items-center gap-2 w-full text-left"
              >
                <input
                  type="checkbox"
                  checked={pendingFilters.payment.includes(p)}
                  readOnly
                  className="w-4 h-4"
                />
                {p}
              </button>
            ))}
          </Dropdown>

          {/* Date Range */}
          <Dropdown
            label="Date Range"
            selectedCount={pendingFilters.dateFrom || pendingFilters.dateTo ? 1 : 0}
          >
            <div className="flex flex-col gap-2 p-2 w-40">
              <input
                type="date"
                value={pendingFilters.dateFrom}
                onChange={(e) => setFilter("dateFrom", e.target.value)}
              />
              <input
                type="date"
                value={pendingFilters.dateTo}
                onChange={(e) => setFilter("dateTo", e.target.value)}
              />
            </div>
          </Dropdown>


          <select
            className="px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700 cursor-pointer outline-none focus:border-blue-500 min-w-[200px]"
            value={pendingFilters.sort || ""}
            onChange={(e) =>
              setPendingFilters(prev => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value="">Sort by: Default</option>
            <option value="date">Date (Newest)</option>
            <option value="quantity">Quantity (Maximum)</option>
            <option value="name">Customer Name (A–Z)</option>
          </select>

        </div>
      </div>

      {hasSelectedFilters && (
        <div className="mt-3 ml-2 flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;