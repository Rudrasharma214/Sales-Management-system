import useSalesQuery from "../hooks/useQuery.js";
import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import KpiCard from "../components/kpi/KpiCard.jsx";
import SalesTable from "../components/table/SalesTable.jsx";
import FiltersBar from "../components/filters/FiltersBar.jsx";
import { Pagination } from "../components/table/Pagination.jsx";

const SalesPage = () => {
  const { query, setQuery, data, isLoading, isError } = useSalesQuery();

  const pagination = data?.data?.data?.pagination;

  return (
    <div className="flex h-screen overflow-x-auto overflow-hidden">
      <Sidebar />

      <main className="flex-1  overflow-y-auto scrollbar-thin bg-white">
        <Header query={query} setQuery={setQuery} />

        <div className="mb-4">
          <FiltersBar query={query} setQuery={setQuery} />
        </div>

        <div className="flex gap-3 m-4">
          <KpiCard title="Total units sold" value="10" subtitle="" />
          <KpiCard title="Total Amount" value="₹89,000" subtitle="19 SRs" />
          <KpiCard title="Total Discount" value="₹15000" subtitle="45 SRs" />
        </div>

        {isLoading ? (
          <div className="text-center py-4 text-sm text-gray-600">
            Loading...
          </div>
        ) : isError ? (
          <div className="text-center py-4 text-sm text-red-500">
            Error loading data
          </div>
        ) : (
          <>
            <SalesTable data={data} isLoading={isLoading} />
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
