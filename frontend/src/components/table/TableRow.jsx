const TableRow = ({ row }) => {
  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-4 py-3.5 text-sm">{row.transaction_id}</td>
      <td className="px-4 py-3.5 text-sm">{row.date}</td>
      <td className="px-4 py-3.5 text-sm">{row.customer_id}</td>
      <td className="px-4 py-3.5 text-sm">{row.customer_name}</td>
      <td className="px-4 py-3.5 text-sm text-gray-700">
        +91 {row.phone_number}
        <button
          onClick={() => copyToClipboard(`+91 ${row.phone_number}`)}
          className="ml-2 inline-flex items-center justify-center hover:text-gray-700 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16.5H6.75A2.25 2.25 0 0 1 4.5 14.25V6.75A2.25 2.25 0 0 1 6.75 4.5h7.5A2.25 2.25 0 0 1 16.5 6.75V8M8.25 19.5h8.25A2.25 2.25 0 0 0 18.75 17.25V10.5A2.25 2.25 0 0 0 16.5 8.25H10.5A2.25 2.25 0 0 0 8.25 10.5v8.25Z"
            />
          </svg>
        </button>
      </td>
      <td className="px-4 py-3.5 text-sm">{row.gender}</td>
      <td className="px-4 py-3.5 text-sm">{row.age}</td>
      <td className="px-4 py-3.5 text-sm">{row.product_category}</td>
      <td className="px-4 py-3.5 text-sm">{row.quantity}</td>
      <td className="px-4 py-3.5 text-sm">
        ₹ {row.total_amount?.toLocaleString()}
      </td>
      <td className="px-4 py-3.5 text-sm">{row.customer_region}</td>
      <td className="px-4 py-3.5 text-sm">{row.product_id}</td>
      <td className="px-4 py-3.5 text-sm">{row.employee_name}</td>
    </tr>
  );
};

export default TableRow;
