import { MovieMain } from "../../Movies/MovieMain/MovieMain";
import moment from "moment";
import { FilterStateProvider } from "../Hook/useFilterState";

export const NowPlaying = () => {
  const now = moment();
  const sixWeeksAgo = now.subtract(6, "weeks");
  const sixWeeksAndtwoDays = sixWeeksAgo.add(1, "days");
  const startDate = sixWeeksAndtwoDays.format("YYYY-MM-DD");

  const newNow = moment();
  const twoDaysAhead = newNow.add(1, "days");
  const endDate = twoDaysAhead.format("YYYY-MM-DD");
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Now Playing Movies
      </h1>
      <FilterStateProvider
        initialFilterState={{
          releasesAll: false,
          releasesTypes: [3, 2],
          releaseDateStart: startDate,
          releaseDateEnd: endDate,
        }}
        mediaType="movie"
      >
        <MovieMain pageCount={16} mediaType="movie" />
      </FilterStateProvider>
    </>
  );
};
