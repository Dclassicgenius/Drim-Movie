import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { RecommendationResponse, MovieRecommendation } from "../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const fetchMovieRecommendations = async (
  movieId: number
): Promise<RecommendationResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  );

  return response.data;
};

export function useMovieRecommendations(
  movieId: number
): UseQueryResult<RecommendationResponse, Error> {
  return useQuery(
    ["movieRecommendations", movieId],
    () => fetchMovieRecommendations(movieId),
    {
      enabled: movieId !== undefined,
    }
  );
}
