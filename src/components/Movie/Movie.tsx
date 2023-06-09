import { Link } from "react-router-dom";
import { IMovie } from "../../types";
import { CircularProgressBar } from "../utility/CircularProgressBar";

interface MovieProps {
  movies: IMovie[];
}
export function Movie({ movies }: MovieProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <section className="overflow-x-auto flex w-11/12 mx-auto pt-6 space-x-5 ">
        {Array.isArray(movies) &&
          movies
            .filter((movie) => movie.poster_path !== null)
            .map((movie) => (
              <Link to={`/${movie.type}/${movie.id}`} key={movie.id}>
                <div
                  className="relative rounded-lg min-w-[150px] mb-4 bg-white dark:bg-gray-800 "
                  key={movie.id}
                >
                  <img
                    className="w-full h-auto cursor-pointer max-h[240px] sm:max-h[200px] object-contain min-h[150px] transform[450ms] rounded-lg"
                    src={API_IMG + movie.poster_path}
                    alt={movie.title || movie.name}
                  />
                  <div className="absolute top-0 right-0 m-0.5 text-white rounded-full text-xs">
                    {/* {movie.vote_average.toFixed(1)} */}
                    <CircularProgressBar
                      score={Number(movie.vote_average.toFixed(1))}
                      radius={20}
                    />
                  </div>
                  <div className="py-4 px-1">
                    <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      {movie.title || movie.name}
                    </h5>
                    {(() => {
                      const dateValue =
                        movie.release_date || movie.first_air_date;
                      if (dateValue) {
                        return (
                          <p className="text-[10px] pt-2 text-gray-700 dark:text-gray-400 font-light">
                            {new Date(dateValue).toLocaleDateString()}
                          </p>
                        );
                      }
                    })()}
                  </div>
                </div>
              </Link>
            ))}
        {/* <div
          className="top-0 right-0 w-[60px] h-full absolute pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
          }}
        ></div> */}
      </section>
    </>
  );
}
