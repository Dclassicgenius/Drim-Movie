import axios from "axios";
import { Genres } from "../../components/Detail/MovieDetails/movieDetailType";
import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

type GenresResponse = {
  genres: Genres[];
};

const fetchGenres = async (mediaType: "movie" | "tv") => {
  const apiUrl = `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}&language=en-US`;
  const response = await axios.get<GenresResponse>(apiUrl);
  return response.data.genres;
};

export const useGenres = (mediaType: "movie" | "tv") => {
  return useQuery(["genres", mediaType], () => fetchGenres(mediaType));
};
