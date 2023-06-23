import { useQuery } from "@tanstack/react-query";
import { IMovieDetails } from "../../components/Detail/MovieDetails/movieDetailType";
import axiosInstance from "../axiosInstance";

const fetchMovieData = (movieId: number) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  return axiosInstance
    .get<IMovieDetails>(
      `movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,releases,recommendations,reviews,videos,external_ids,keywords`
    )
    .then((response) => response.data);
};

export const useMovieDetail = (movieId: number) => {
  return useQuery(["movieDatails", movieId], () => fetchMovieData(movieId));
};
