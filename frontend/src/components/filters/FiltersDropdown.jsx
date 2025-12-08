import { useCallback } from "react";
import Dropdown from "./Dropdown";


const FiltersDropdown = ({ pendingFilters, setPendingFilters }) => {

  const toggleFilter = useCallback(
    (field, value) => {
      setPendingFilters((prev) => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter((x) => x !== value)
          : [...prev[field], value],
      }));
    },
    [setPendingFilters]
  );

  const setFilter = useCallback(
    (field, value) => {
      setPendingFilters((prev) => ({ ...prev, [field]: value }));
    },
    [setPendingFilters]
  );

  return (
    <>
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
            aria-label="Minimum age"
          />
          <input
            type="number"
            placeholder="To"
            min="0"
            max="120"
            className="border px-2 py-1 rounded w-full"
            value={pendingFilters.ageTo}
            onChange={(e) => setFilter("ageTo", e.target.value)}
            aria-label="Maximum age"
          />
        </div>
      </Dropdown>

      <Dropdown
        label="Product Category"
        selectedCount={pendingFilters.category.length}
      >
        {["Electronics", "Clothing", "Furniture", "Beauty", "Sports"].map(
          (c) => (
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
          )
        )}
      </Dropdown>

      <Dropdown label="Tags" selectedCount={pendingFilters.tags.length}>
        {["wireless", "smart", "portable", "premium", "durable"].map((t) => (
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

      <Dropdown
        label="Payment Method"
        selectedCount={pendingFilters.payment.length}
      >
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

      <Dropdown
        label="Date Range"
        selectedCount={pendingFilters.dateFrom || pendingFilters.dateTo ? 1 : 0}
      >
        <div className="flex flex-col gap-2 p-2 w-40">
          <input
            type="date"
            value={pendingFilters.dateFrom}
            onChange={(e) => setFilter("dateFrom", e.target.value)}
            aria-label="Start date"
          />
          <input
            type="date"
            value={pendingFilters.dateTo}
            onChange={(e) => setFilter("dateTo", e.target.value)}
            aria-label="End date"
          />
        </div>
      </Dropdown>
    </>
  );
};

export default FiltersDropdown;
