import { Link } from "react-router-dom";
import { IMovie } from "./types";
import { MovieDetail } from "./components/Details/MovieDetail";

interface MovieProps {
  movies: IMovie[];
  API_IMG: string;
}
export function Movie({ movies, API_IMG }: MovieProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
  };
  return (
    <>
      <section className="overflow-x-auto flex w-11/12 mx-auto pt-6 space-x-5">
        {Array.isArray(movies) &&
          movies
            .filter((movie) => movie.poster_path !== null) // Filter out movies with null poster_path
            .map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                // onClick={handleClick}
              >
                <div
                  className="relative rounded-lg min-w-[150px] mb-4 bg-white dark:bg-gray-800 shadow-md"
                  key={movie.id}
                >
                  <img
                    className="w-full h-auto cursor-pointer max-h[240px] sm:max-h[200px] object-contain min-h[150px] transform[450ms] rounded-lg"
                    src={API_IMG + movie.poster_path}
                    alt={movie.title || movie.name}
                  />
                  <div className="absolute top-0 right-0 m-2 bg-green-500 text-white rounded-full p-1 text-xs">
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <div className="py-4 px-1">
                    <h5 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">
                      {movie.title || movie.name}
                    </h5>
                    <p className="font-normal text-sm pt-2 text-gray-700 dark:text-gray-400">
                      {new Date(
                        movie.release_date || movie.first_air_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </section>
    </>
  );
}