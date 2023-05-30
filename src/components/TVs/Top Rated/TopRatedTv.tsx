import { MovieMain } from "../../Movies/MovieMain/MovieMain";

export const TopRatedTv = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pl-5 my-7">Top Rated Tv Shows</h1>
      <MovieMain
        sortValue="vote_average.desc"
        userVote={150}
        mediaType="tv"
        pageCount={108}
      />
    </>
  );
};
