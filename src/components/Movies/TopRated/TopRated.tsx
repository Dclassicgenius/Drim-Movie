import { MovieMain } from "../MovieMain/MovieMain";

export const TopRated = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Top Rated Movies
      </h1>
      <MovieMain
        sortValue="vote_average.desc"
        userVote={300}
        mediaType="movie"
      />
    </>
  );
};
