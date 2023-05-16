import useFetchMovies from "../../../api/api";
import { IMovie } from "../../../types";
import { ItemCard } from "../../Movie/ItemCard";
import { Movie } from "../../Movie/Movie";
import { MovieFilters } from "../SideBar/MovieFilters";

const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${
  import.meta.env.VITE_TMDB_API_KEY
}&language=en-US&page=1`;

export function PopularMovies() {
  const {
    isLoading,
    data: movies,
    error,
  } = useFetchMovies(apiUrl, 1000 * 60 * 5, 1000 * 60);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: IMovie[] = movies || [];

  return (
    <>
      <h1 className="font-bold text-2xl ml-10 mt-4">Popular Movies</h1>
      <div className="grid grid-cols-9 m-4">
        <section className="col-span-2">
          <MovieFilters />
        </section>
        <section className="w-11/12 mx-auto pt-6 col-span-7">
          <div className="">
            <ItemCard movies={popular} />
          </div>
        </section>
      </div>
    </>
  );
}
