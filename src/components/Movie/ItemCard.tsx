import { Link } from "react-router-dom";
import { IMovie } from "../../types";
import { CircularProgressBar } from "../utility/CircularProgressBar";

interface MovieProps {
  movies: IMovie[];
}
export function ItemCard({ movies }: MovieProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  auto-rows"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.isArray(movies) &&
          movies
            .filter((movie) => movie.poster_path !== null)
            .map((movie) => (
              <Link to={`/${movie.type}/${movie.id}`} key={movie.id}>
                <div
                  className="relative rounded-lg mb-4 bg-white dark:bg-gray-800 overflow-hidden shadow-md"
                  key={movie.id}
                >
                  <div className="">
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      src={API_IMG + movie.poster_path}
                      alt={movie.title || movie.name}
                    />
                  </div>
                  <div className=" py-4 px-1">
                    <div className="min-h-[60px]">
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
                    <div className="absolute top-0 right-0 m-0.5 text-white rounded-full text-xs">
                      <CircularProgressBar
                        score={Number(movie.vote_average.toFixed(1))}
                        radius={20}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
}
