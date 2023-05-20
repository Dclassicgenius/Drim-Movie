import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Keyword } from "../../types";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const fetchMoviesAll = async (
  sortValue: string,
  userScore: string | number | (string | number)[],
  userVote: string | number | (string | number)[],
  genreFilters: string | null,
  runtime: string | number | (string | number)[],
  certificationFilter: string | null,
  monetizationFilterQuery: string | null,
  keywordFilter: string | null,
  pageParam: number
) => {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=${sortValue}&vote_average.gte=${userScore}&vote_count.gte=${userVote}&with_genres=${genreFilters}&with_runtime.gte=${runtime}&certification_country=US${certificationFilter}&with_watch_monetization_types=${monetizationFilterQuery}${keywordFilter}`;

  const response = await axios.get<MovieResponse>(apiUrl);
  return response.data;
};

export const useMoviesAll = (
  sortValue: string,
  userScore: string | number | (string | number)[],
  userVote: string | number | (string | number)[],
  genreFilters: string | null,
  runtime: string | number | (string | number)[],
  certificationFilter: string | null,
  monetizationFilterQuery: string | null,
  keywordFilter: string | null,
  pageParam: number,
  isDataFetched: boolean
): UseQueryResult<MovieResponse, Error> => {
  return useQuery(
    [
      "movies",
      sortValue,
      userScore,
      userVote,
      genreFilters,
      runtime,
      certificationFilter,
      monetizationFilterQuery,
      keywordFilter,
      pageParam,
      isDataFetched,
    ],
    () =>
      fetchMoviesAll(
        sortValue,
        userScore,
        userVote,
        genreFilters,
        runtime,
        certificationFilter,
        monetizationFilterQuery,
        keywordFilter,
        pageParam
      ),
    { keepPreviousData: true }
  );
};
