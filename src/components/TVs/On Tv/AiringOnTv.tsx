import moment from "moment";
import { MovieMain } from "../../Movies/MovieMain/MovieMain";
import { FilterStateProvider } from "../../Movies/Hook/useFilterState";

export const AiringOnTv = () => {
  const now = moment();
  const startDate = now.format("YYYY-MM-DD");

  const weekAhead = now.clone().add(1, "weeks");
  const endDate = weekAhead.format("YYYY-MM-DD");
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Currently Airing TV Shows
      </h1>
      <FilterStateProvider
        initialFilterState={{
          checkedAvailabilityAll: false,
          releaseDateStart: startDate,
          releaseDateEnd: endDate,
        }}
        mediaType="tv"
      >
        <MovieMain pageCount={16} mediaType="tv" />
      </FilterStateProvider>
    </>
  );
};
