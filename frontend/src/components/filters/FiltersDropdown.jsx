import Dropdown from "./Dropdown";

const FiltersDropdown = ({ query, setQuery }) => {
  const toggle = (field, value) => {
    setQuery((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((x) => x !== value)
        : [...prev[field], value],
      page: 1,
    }));
  };

  const set = (field, value) => {
    setQuery((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  return (
    <>
      <button
        onClick={() => {
          setQuery({
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

      <Dropdown label="Customer Region">
        {["North", "South", "East", "West", "Central"].map((r) => (
          <button key={r} onClick={() => toggle("region", r)}>
            {r}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Gender">
        {["Male", "Female"].map((g) => (
          <button key={g} onClick={() => toggle("gender", g)}>
            {g}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Age Range">
        <div className="flex flex-col gap-2 p-2 w-40">
          <input
            type="number"
            placeholder="From"
            className="border px-2 py-1 rounded w-full"
            value={query.ageFrom}
            onChange={(e) => set("ageFrom", e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            className="border px-2 py-1 rounded w-full"
            value={query.ageTo}
            onChange={(e) => set("ageTo", e.target.value)}
          />
        </div>
      </Dropdown>

      <Dropdown label="Product Category">
        {["Electronics", "Clothing", "Furniture", "Beauty", "Sports"].map(
          (c) => (
            <button key={c} onClick={() => toggle("category", c)}>
              {c}
            </button>
          )
        )}
      </Dropdown>

      <Dropdown label="Tags">
        {["wireless", "smart", "portable", "premium", "durable"].map((t) => (
          <button key={t} onClick={() => toggle("tags", t)}>
            {t}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Payment Method">
        {["UPI", "Cash", "Credit Card", "Debit Card"].map((p) => (
          <button key={p} onClick={() => toggle("payment", p)}>
            {p}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Date Range">
        <input
          type="date"
          value={query.dateFrom}
          onChange={(e) => set("dateFrom", e.target.value)}
        />
        <input
          type="date"
          value={query.dateTo}
          onChange={(e) => set("dateTo", e.target.value)}
        />
      </Dropdown>
    </>
  );
};

export default FiltersDropdown;
