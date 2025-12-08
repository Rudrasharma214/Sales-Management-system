import Dropdown from "./Dropdown";

const FiltersDropdown = ({ filters, setFilters }) => {

  const toggle = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(x => x !== value)
        : [...prev[field], value],
      page: 1,
    }));
  };

  const set = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
  };

  return (
    <>
      <Dropdown label="Customer Region">
        {["North", "South", "East", "West", "Central"].map(r => (
          <button key={r} onClick={() => toggle("region", r)}>
            {r}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Gender">
        {["Male", "Female"].map(g => (
          <button key={g} onClick={() => toggle("gender", g)}>
            {g}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Age Range">
        <input
          type="number"
          value={filters.ageFrom}
          onChange={e => set("ageFrom", e.target.value)}
        />
        <input
          type="number"
          value={filters.ageTo}
          onChange={e => set("ageTo", e.target.value)}
        />
      </Dropdown>

      <Dropdown label="Product Category">
        {["Electronics", "Clothing", "Furniture", "Beauty", "Sports"].map(c => (
          <button key={c} onClick={() => toggle("category", c)}>
            {c}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Tags">
        {["wireless", "smart", "portable", "premium", "durable"].map(t => (
          <button key={t} onClick={() => toggle("tags", t)}>
            {t}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Payment Method">
        {["UPI", "Cash", "Credit Card", "Debit Card"].map(p => (
          <button key={p} onClick={() => toggle("payment", p)}>
            {p}
          </button>
        ))}
      </Dropdown>

      <Dropdown label="Date Range">
        <input
          type="date"
          value={filters.dateFrom}
          onChange={e => set("dateFrom", e.target.value)}
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={e => set("dateTo", e.target.value)}
        />
      </Dropdown>
    </>
  );
};

export default FiltersDropdown;
