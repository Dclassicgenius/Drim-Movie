import moment from "moment";
import { MovieMain } from "../MovieMain/MovieMain";
import { FilterStateProvider } from "../Hook/useFilterState";

export const Upcoming = () => {
  const now = moment();
  const twoDaysAhead = now.add(1, "days");
  const startDate = twoDaysAhead.format("YYYY-MM-DD");

  const newNow = moment();
  const threeWeeksAhead = newNow.add(3, "weeks");
  const threeWeeksAheadAndtwoDays = threeWeeksAhead.add(1, "days");
  const endDate = threeWeeksAheadAndtwoDays.format("YYYY-MM-DD");
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Upcoming Movies
      </h1>
      <FilterStateProvider
        initialFilterState={{
          releasesAll: false,
          releasesTypes: [2, 3],
          releaseDateStart: startDate,
          releaseDateEnd: endDate,
        }}
        mediaType={"movie"}
      >
        <MovieMain pageCount={4} mediaType="movie" />
      </FilterStateProvider>
    </>
  );
};
