import Dropdown from "./Dropdown";

const FiltersDropdown = ({ pendingFilters, setPendingFilters }) => {
  const toggle = (field, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((x) => x !== value)
        : [...prev[field], value],
    }));
  };

  const set = (field, value) => {
    setPendingFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <button
        onClick={() => {
          setPendingFilters({
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
          });
        }}
        className="p-2 hover:bg-gray-200 rounded-md transition-colors"
        title="Reset filters"
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

      <Dropdown label="Customer Region" selectedCount={pendingFilters.region.length}>
        {["North", "South", "East", "West", "Central"].map((r) => (
          <button
            key={r}
            onClick={() => toggle("region", r)}
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

      <Dropdown label="Gender" selectedCount={pendingFilters.gender.length}>
        {["Male", "Female"].map((g) => (
          <button
            key={g}
            onClick={() => toggle("gender", g)}
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

      <Dropdown label="Age Range" selectedCount={pendingFilters.ageFrom || pendingFilters.ageTo ? 1 : 0}>
        <div className="flex flex-col gap-2 p-2 w-40">
          <input
            type="number"
            placeholder="From"
            className="border px-2 py-1 rounded w-full"
            value={pendingFilters.ageFrom}
            onChange={(e) => set("ageFrom", e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            className="border px-2 py-1 rounded w-full"
            value={pendingFilters.ageTo}
            onChange={(e) => set("ageTo", e.target.value)}
          />
        </div>
      </Dropdown>

      <Dropdown label="Product Category" selectedCount={pendingFilters.category.length}>
        {["Electronics", "Clothing", "Furniture", "Beauty", "Sports"].map(
          (c) => (
            <button
              key={c}
              onClick={() => toggle("category", c)}
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
          )
        )}
      </Dropdown>

      <Dropdown label="Tags" selectedCount={pendingFilters.tags.length}>
        {["wireless", "smart", "portable", "premium", "durable"].map((t) => (
          <button
            key={t}
            onClick={() => toggle("tags", t)}
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

      <Dropdown label="Payment Method" selectedCount={pendingFilters.payment.length}>
        {["UPI", "Cash", "Credit Card", "Debit Card"].map((p) => (
          <button
            key={p}
            onClick={() => toggle("payment", p)}
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

      <Dropdown label="Date Range" selectedCount={pendingFilters.dateFrom || pendingFilters.dateTo ? 1 : 0}>
        <div className="flex flex-col gap-2 p-2 w-40">
          <input
            type="date"
            value={pendingFilters.dateFrom}
            onChange={(e) => set("dateFrom", e.target.value)}
          />
          <input
            type="date"
            value={pendingFilters.dateTo}
            onChange={(e) => set("dateTo", e.target.value)}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default FiltersDropdown;
