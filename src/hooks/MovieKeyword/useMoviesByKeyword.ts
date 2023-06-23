import { useQuery } from "@tanstack/react-query";
import { IMovie } from "../../types";
import axiosInstance from "../axiosInstance";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export interface KeywordResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const fetchMoviesKeyword = (
  pageParam: number,
  keyword: string,
  sortValue: string,
  mediaType: "tv" | "movie"
) => {
  const apiUrl = `discover/${mediaType}?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=${sortValue}&with_keywords=${keyword}`;

  return axiosInstance.get<KeywordResponse>(apiUrl).then((response) => {
    const resultWithMediaTypes = response.data.results.map((movie) => ({
      ...movie,
      media_type: movie.first_air_date ? "tv" : "movie",
    }));
    return {
      resultWithMediaTypes,
      totalResults: response.data.total_results,
      totalPages: response.data.total_results,
    };
  });
};

export const useMoviesByKeyword = (
  ...params: [
    pageParam: number,
    keyword: string,
    sortValue: string,
    mediaType: "tv" | "movie"
  ]
) => {
  return useQuery([...params], () => fetchMoviesKeyword(...params), {
    keepPreviousData: true,
  });
};
