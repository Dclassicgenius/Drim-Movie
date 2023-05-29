import { MovieMain } from "../MovieMain/MovieMain";

export const TopRated = () => {
  return (
    <>
      <MovieMain sortValue="vote_average.desc" userVote={300} />
    </>
  );
};
