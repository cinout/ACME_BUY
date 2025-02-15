import { iconLeftPagination, iconRightPagination } from "@/utils/icons";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  maxPageOptionsCount: number; // ideal # of page options to be displayed
}

// TODO: implement a quick go to page selector, and make it an optional choice
export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  maxPageOptionsCount,
}: PaginationProps) {
  // the actual # of page options to be displayed
  const actualPageOptionsCount =
    totalPages < maxPageOptionsCount ? totalPages : maxPageOptionsCount;

  const pageOptions = Array.from(
    { length: actualPageOptionsCount },
    currentPage + actualPageOptionsCount - 1 > totalPages
      ? (_, i) => i + totalPages - actualPageOptionsCount + 1
      : (_, i) => i + currentPage
  );

  return (
    <div className="flex justify-center items-center gap-4 text-white text-lg">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:text-slate-400 not-disabled:hover:scale-125 transition"
      >
        {iconLeftPagination()}
      </button>

      {pageOptions.map((pageValue) => (
        <button
          key={pageValue}
          className={`h-6 w-6 flex justify-center items-center ${
            pageValue === currentPage && "font-bold text-aqua-forest-300"
          } hover:scale-125 transition`}
          onClick={() => setCurrentPage(pageValue)}
        >
          {pageValue}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="disabled:text-slate-400 not-disabled:hover:scale-125 transition"
      >
        {iconRightPagination()}
      </button>
    </div>
  );
}
