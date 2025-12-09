import { useState, useCallback } from "react";

export default function useFilters(initialFilters) {
  const [pendingFilters, setPendingFilters] = useState(initialFilters);

  const toggleFilter = useCallback((field, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((x) => x !== value)
        : [...prev[field], value],
    }));
  }, []);

  const setFilter = useCallback((field, value) => {
    setPendingFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetFilters = useCallback(() => {
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
  }, []);

  const hasSelectedFilters =
    pendingFilters.region.length > 0 ||
    pendingFilters.gender.length > 0 ||
    pendingFilters.category.length > 0 ||
    pendingFilters.tags.length > 0 ||
    pendingFilters.payment.length > 0 ||
    pendingFilters.ageFrom ||
    pendingFilters.ageTo ||
    pendingFilters.dateFrom ||
    pendingFilters.dateTo ||
    pendingFilters.sort;

  return {
    pendingFilters,
    setPendingFilters,
    toggleFilter,
    setFilter,
    resetFilters,
    hasSelectedFilters,
  };
}