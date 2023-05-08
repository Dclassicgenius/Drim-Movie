// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useMultiSearch } from "../../../hooks/SearchHook/useMultiSearch";
// import { IMovie } from "../../../types";
// import { Person, Collections } from "../SearchType/SearchType";
// import { useSearchResult } from "../../../hooks/SearchHook/useSearchResult";
// import { MediaSearchCard } from "../MediaSearchCard";
// import { Pagination } from "flowbite-react";

// export type TvResultProps = {
//   totalResults: number;
// };

// export function TvResult() {
//   const [page, setPage] = useState(1);
//   const { query } = useParams();

//   if (query === undefined) {
//     throw new Error("query is undefined");
//   }

//   const {
//     isLoading,
//     error,
//     data: searchResults,
//   } = useSearchResult(page, query, "tv");

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const isTvShow = (item: IMovie | Person | Collections): item is IMovie =>
//     (item as IMovie).media_type === "tv";

//   const queryResult = searchResults.results || [];
//   const tvResults = queryResult.filter(isTvShow);
//   return (
//     <>
//       <MediaSearchCard media={tvResults} />
//       {searchResults.total_pages > 1 && (
//         <Pagination
//           currentPage={page}
//           onPageChange={(page) => setPage(page)}
//           totalPages={searchResults.total_pages}
//         />
//       )}
//     </>
//   );
// }
