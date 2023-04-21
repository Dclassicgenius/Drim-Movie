import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { ReviewResponse } from "../types";

const fetchReviewData = async (movieId: number): Promise<ReviewResponse> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US`
  );

  return response.data;
};

export const useReviewData = (
  movieId: number
): UseQueryResult<ReviewResponse, Error> => {
  return useQuery(["reviewData", movieId], () => fetchReviewData(movieId));
};
