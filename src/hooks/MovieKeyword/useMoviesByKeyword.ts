import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMovie } from "../../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export interface KeywordResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const fetchMoviesKeyword = async (
  pageParam: number,
  keyword: string,
  sortValue: string,
  mediaType: "tv" | "movie"
) => {
  const apiUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=${sortValue}&with_keywords=${keyword}`;

  const response = await axios.get<KeywordResponse>(apiUrl);

  return response.data;
};

export const useMoviesByKeyword = (
  pageParam: number,
  keyword: string,
  sortValue: string,
  mediaType: "tv" | "movie"
): UseQueryResult<KeywordResponse, Error> => {
  return useQuery(
    [keyword, mediaType, pageParam, sortValue],
    () => fetchMoviesKeyword(pageParam, keyword, sortValue, mediaType),
    { keepPreviousData: true }
  );
};
