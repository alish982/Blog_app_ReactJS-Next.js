import clsx from "clsx";
import { Button } from "@/components/ui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages
  );

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          const prevPage = pages[index - 1];
          const showEllipsis = prevPage && page - prevPage > 1;
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-ink/40">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={clsx(
                  "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-ink text-paper"
                    : "text-ink/70 hover:bg-canvas"
                )}
              >
                {page}
              </button>
            </span>
          );
        })}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </nav>
  );
}
