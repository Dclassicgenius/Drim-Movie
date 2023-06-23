import { IMovie, IResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../hooks/axiosInstance";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const fetchMovies = (day: string) => {
  const url = `trending/all/${day}?api_key=${apiKey}`;
  return axiosInstance.get<IResponse>(url).then((response) => {
    const trending: IMovie[] = response.data.results.map((movie) => ({
      ...movie,
      type: movie.first_air_date ? "tv" : "movie",
    }));

    return trending;
  });
};

const useFetchTrendingMovies = (day: string) => {
  const { isLoading, data, error } = useQuery<IMovie[], Error>(
    ["TrendingMovies", day],
    () => fetchMovies(day)
  );

  return { isLoading, data, error };
};

export default useFetchTrendingMovies;
