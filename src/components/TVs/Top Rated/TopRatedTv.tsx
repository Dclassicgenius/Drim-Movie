import { FilterStateProvider } from "../../Movies/Hook/useFilterState";
import { MovieMain } from "../../Movies/MovieMain/MovieMain";

export const TopRatedTv = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Top Rated Tv Shows
      </h1>
      <FilterStateProvider
        initialFilterState={{ sortValue: "vote_average.desc", userVote: 150 }}
        mediaType="movie"
      >
        <MovieMain mediaType="tv" pageCount={108} />
      </FilterStateProvider>
    </>
  );
};
