import { MovieMain } from "../MovieMain/MovieMain";

export function PopularMovies() {
  return (
    <>
      <h1 className="font-bold text-2xl pl-5 my-7">Popular Movies</h1>
      <MovieMain mediaType="movie" />
    </>
  );
}
