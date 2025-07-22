function Pagination({ page, total, limit, onPageChange }) {
    const totalPages = Math.ceil(total / limit);
  
    if (totalPages <= 1) return null;
  
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div className="flex justify-center items-center gap-2 my-6">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 rounded border"
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded border ${p === page ? "bg-blue-500 text-white" : ""}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border"
        >
          Next
        </button>
      </div>
    );
  }
  
  export default Pagination