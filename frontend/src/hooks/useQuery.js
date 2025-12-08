import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "../services/salesService";

export default function useSalesQuery() {
  const [query, setQuery] = useState({
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
    page: 1
  });

  const salesQuery = useQuery({
    queryKey: ["sales", query],
    queryFn: () => getSales(query),
    placeholderData: (previousData) => previousData
  });

  return {
    query,
    setQuery,
    ...salesQuery
  };
}