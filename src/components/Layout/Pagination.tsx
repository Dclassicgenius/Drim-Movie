import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

export type PaginationProps = {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

export function Pagination({
  setCurrentPage,
  currentPage,
  totalPages,
}: PaginationProps) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  const showNextButton = currentPage !== totalPages;

  const showPrevButton = currentPage !== 1;

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md mr-4">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border border-solid border-gray-500 hover:bg-gray-300 w-8 h-8 flex items-center justify-center rounded-md mr-3"
        activeClassName="bg-blue-500 text-white"
      />
    </motion.div>
  );
}
