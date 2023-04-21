import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { ICrewResponse } from "../types";

const fetchMovieData = async (movieId: number): Promise<ICrewResponse> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
  );

  return {
    id: response.data.id,
    crew: response.data.crew,
    cast: response.data.cast,
  };
};

export const useMovieData = (
  movieId: number
): UseQueryResult<ICrewResponse, Error> => {
  return useQuery(["movieData", movieId], () => fetchMovieData(movieId));
};
