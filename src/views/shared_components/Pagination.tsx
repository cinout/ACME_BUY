import { iconLeftPagination, iconRightPagination } from "@/utils/icons";

interface PaginationProps {
  currentPage: number;
  setCurrentPage:
    | React.Dispatch<React.SetStateAction<number>>
    | ((page: number) => void);
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>> | ((page: number) => void);
  totalPages: number;
  maxPageOptionsCount: number; // ideal # of page options to be displayed
  backgroundTheme: "light" | "dark";
}

const cssPageButton =
  "h-6 w-6 flex justify-center items-center hover:scale-125 transition";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  maxPageOptionsCount,
  backgroundTheme,
}: PaginationProps) {
  // the actual # of page options to be displayed
  const actualPageOptionsCount =
    totalPages < maxPageOptionsCount ? totalPages : maxPageOptionsCount;

  const nearEnd = currentPage + actualPageOptionsCount - 1 > totalPages;

  const pageOptions = Array.from(
    { length: actualPageOptionsCount },
    nearEnd
      ? (_, i) => i + totalPages - actualPageOptionsCount + 1
      : (_, i) => i + currentPage
  );

  const showStartWithEllipsis =
    totalPages > maxPageOptionsCount && currentPage > 1;
  const showEndWithEllipsis =
    totalPages > maxPageOptionsCount &&
    currentPage + maxPageOptionsCount - 1 < totalPages;

  return (
    <div
      className={`flex justify-center items-center gap-4 text-lg mt-10 ${
        backgroundTheme === "dark" ? "text-white" : "text-aqua-forest-400"
      }`}
    >
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:text-slate-400 not-disabled:hover:scale-125 transition"
      >
        {iconLeftPagination()}
      </button>

      {showStartWithEllipsis && (
        <>
          <button
            className={`${cssPageButton} ${
              currentPage === 1 && `font-bold underline`
            }`}
            onClick={() => setCurrentPage(1)}
          >
            {1}
          </button>
          <span>...</span>
        </>
      )}

      {pageOptions.map((pageValue) => (
        <button
          key={pageValue}
          className={`${cssPageButton} ${
            pageValue === currentPage && `font-bold underline`
          }`}
          onClick={() => setCurrentPage(pageValue)}
        >
          {pageValue}
        </button>
      ))}

      {showEndWithEllipsis && (
        <>
          <span>...</span>
          <button
            className={`${cssPageButton} ${
              totalPages === currentPage && `font-bold underline`
            }`}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

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
