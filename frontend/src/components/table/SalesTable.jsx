import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const SalesTable = ({ data, isLoading }) => {
  const rows = data?.data?.data?.data || [];

  return (
    <div className="w-full overflow-x-auto m-3 scrollbar-thin">
      <table className="min-w-max w-full border-collapse bg-white">
        <TableHeader />
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="9" className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Loading data...</p>
                </div>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan="9" className="px-4 py-12 text-center text-sm text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => <TableRow key={idx} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;

