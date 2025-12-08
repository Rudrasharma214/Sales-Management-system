export const Pagination = ({ pagination, setQuery }) => {
  const { page, totalPages } = pagination;

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setQuery(prev => ({ ...prev, page: p }));
    }
  };

  const getVisiblePages = () => {
    const windowSize = 6;

    if (totalPages <= windowSize) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    let start = page - Math.floor(windowSize / 2);
    let end = page + Math.floor(windowSize / 2);

    if (start < 1) {
      start = 1;
      end = windowSize;
    } else if (end > totalPages) {
      end = totalPages;
      start = totalPages - windowSize + 1;
    }

    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-5 flex items-center justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
        className="px-3 py-1.5 rounded-md border border-gray-300 bg-white disabled:opacity-40"
      >
        &lt;
      </button>

      <div className="flex gap-2">
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1.5 rounded-md text-sm transition-all 
              ${p === page
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
        className="px-3 py-1.5 rounded-md border border-gray-300 bg-white disabled:opacity-40"
      >
        &gt;
      </button>
    </div>
  );
};
