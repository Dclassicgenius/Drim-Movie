import { FaHeart, FaBookmark, FaStar, FaCalendarAlt } from "react-icons/fa";
import { MovieRecommendation } from "../../types";
import { useState } from "react";
import { useMovieRecommendations } from "../../hooks/useMovieRecommendations";

interface RecommendationProps {
  movieId: number;
  API_IMG: string;
}

export function Recommendations({ API_IMG, movieId }: RecommendationProps) {
  const { data, isLoading, error } = useMovieRecommendations(movieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const movies: MovieRecommendation[] = data?.results || [];
  return (
    <>
      <section className=" px-10 text-sm">
        <hr />
        <h2 className="font-bold text-lg py-5">Recommendations</h2>
        <ol className="flex gap-4 overflow-x-scroll overflow-y-hidden list-none list-inside pb-6">
          {movies &&
            movies.map((movie) => (
              <li
                className="shadow-md rounded-lg overflow-hidden min-w-[200px] w-[250px]"
                key={movie.id}
              >
                <a href="#">
                  <img
                    src={API_IMG + movie.poster_path}
                    alt={movie.title}
                    className="rounded-lg"
                  />
                </a>
                <div className="flex justify-between p-2">
                  <p>{movie.title || movie.original_title}</p>
                  <p>{Math.round(movie.vote_average * 10)}%</p>
                </div>
                <div className="flex justify-between px-2 pb-3 items-center">
                  <div className="flex gap-2 items-center">
                    <FaCalendarAlt />
                    <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <FaHeart />
                    <FaBookmark />
                    <FaStar />
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </section>
    </>
  );
}
