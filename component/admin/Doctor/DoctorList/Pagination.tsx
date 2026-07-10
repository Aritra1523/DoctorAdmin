"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
      <span>
        Page {page} of {totalPages}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="rounded-md border border-white/10 px-3 py-1.5 text-zinc-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-8 w-8 rounded-md text-xs font-medium transition ${
              p === page
                ? "bg-blue-600 text-white"
                : "text-zinc-300 hover:bg-white/5"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="rounded-md border border-white/10 px-3 py-1.5 text-zinc-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};