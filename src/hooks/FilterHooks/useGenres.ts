import { Genres } from "../../components/Detail/MovieDetails/movieDetailType";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

type GenresResponse = {
  genres: Genres[];
};

const fetchGenres = (mediaType: "movie" | "tv") => {
  const apiUrl = `genre/${mediaType}/list?api_key=${apiKey}&language=en-US`;
  return axiosInstance
    .get<GenresResponse>(apiUrl)
    .then((response) => response.data.genres);
};

export const useGenres = (mediaType: "movie" | "tv") => {
  return useQuery(["genres", mediaType], () => fetchGenres(mediaType));
};
