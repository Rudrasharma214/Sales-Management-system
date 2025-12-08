import useSalesQuery from "../hooks/useQuery.js";
import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import KpiCard from "../components/kpi/KpiCard.jsx";

import SalesTable from "../components/table/SalesTable.jsx";
import { Pagination } from "../components/table/Pagination.jsx";
import FiltersBar from "../components/filters/FiltersBar.jsx";
import { useState } from "react";

const SalesPage = () => {
  const { query, setQuery, data, isLoading, isError } = useSalesQuery();
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    ageFrom: "",
    ageTo: "",
    category: [],
    tags: [],
    payment: [],
    dateFrom: "",
    dateTo: "",
  });
  const pagination = data?.data?.data?.pagination;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <Header query={query} setQuery={setQuery} />

        <div className="mb-4">
          <FiltersBar
            filters={filters}
            setFilters={setFilters}
            query={query}
            setQuery={setQuery}
          />
        </div>

        <div className="flex gap-3 my-4">
          <KpiCard title="Total units sold" value="10" subtitle="" />
          <KpiCard title="Total Amount" value="₹89,000" subtitle="19 SRs" />
          <KpiCard title="Total Discount" value="₹15000" subtitle="45 SRs" />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : (
          <>
            <SalesTable data={data} />
            <Pagination
              query={query}
              setQuery={setQuery}
              pagination={pagination}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default SalesPage;
