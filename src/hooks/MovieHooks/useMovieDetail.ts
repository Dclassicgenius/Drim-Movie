import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IMovieDetails } from "../../components/Detail/movieDetailType";

const fetchMovieData = async (movieId: number): Promise<IMovieDetails> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get<IMovieDetails>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,releases,recommendations,reviews,videos`
  );
  console.log(response.data);
  return response.data;
};

export const useMovieDetail = (
  movieId: number
): UseQueryResult<IMovieDetails, Error> => {
  return useQuery(["movieDatails", movieId], () => fetchMovieData(movieId));
};
