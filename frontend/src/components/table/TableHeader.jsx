const TableHeader = () => {
  return (
    <thead className="bg-gray-50 sticky top-0 z-10">
      <tr>
        {[
          "Transaction ID",
          "Date",
          "Customer ID",
          "Customer Name",
          "Phone Number",
          "Gender",
          "Age",
          "Product Category",
          "Quantity",
          "Total Amount",
          "Customer Region",
          "Product ID",
          "Employee Name"
        ].map((h) => (
          <th
            key={h}
            className="px-4 py-3 text-xs text-gray-600 text-left border-b border-gray-200 font-semibold whitespace-nowrap"
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;