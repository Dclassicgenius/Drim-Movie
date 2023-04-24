import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { ICrewResponse } from "../types";

const fetchMovieData = async (movieId: number): Promise<ICrewResponse> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,releases`
  );

  return {
    id: response.data.id,
    release_date: response.data.release_date,
    original_title: response.data.original_title,
    crew: response.data.credits.crew,
    cast: response.data.credits.cast,
    releases: response.data.releases,
  };
};

export const useMovieData = (
  movieId: number
): UseQueryResult<ICrewResponse, Error> => {
  return useQuery(["movieData", movieId], () => fetchMovieData(movieId));
};
