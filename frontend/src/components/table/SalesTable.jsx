import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const SalesTable = ({ data }) => {
  const rows = data?.data?.data?.data || [];

  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-lg mt-3 scrollbar-thin">
      <table className="min-w-max w-full border-collapse bg-white">
        <TableHeader />
        <tbody>
          {rows.map((row, idx) => (
            <TableRow key={idx} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
