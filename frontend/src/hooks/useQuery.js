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
    page: 1,
  });

  const salesQuery = useQuery({
    queryKey: [
      "sales",
      {
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
        page: query.page,
      },
    ],
    queryFn: () => getSales(query),
    placeholderData: (previousData) => previousData,
  });

  return {
    query,
    setQuery,
    ...salesQuery,
  };
}
