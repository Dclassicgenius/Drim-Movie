import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type PaginationProps = {
  page: number;
  isPreviousData: boolean;
  lastPage: number;
  pages: number[];
  setPage: (page: number) => any;
};

export function Pagination({
  page,
  isPreviousData,
  lastPage,
  pages,
  setPage,
}: PaginationProps) {
  return (
    <>
      <nav className="flex flex-nowrap justify-between items-center">
        <button
          onClick={setPage(1)}
          disabled={isPreviousData || page === 1}
          className="m-[1em] p[1em]"
        >
          <FaArrowLeft /> Previous
        </button>
        {pages.map((pg) => (
          <button
            className="m-[1em] p[1em] rounded-2xl"
            key={pg}
            onClick={setPage(pg)}
          >
            {pg}
          </button>
        ))}
        <button
          onClick={setPage(lastPage)}
          disabled={isPreviousData || page === lastPage}
          className="m-[1em] p[1em]"
        >
          Next <FaArrowRight />
        </button>
      </nav>
    </>
  );
}
