import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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
  userScoreStart: number | number[],
  userScoreEnd: number | number[],
  userVote: string | number | (string | number)[],
  genreFilters: string | null,
  runtimeStart: number | number[],
  runtimeEnd: number | number[],
  certificationFilter: string | null,
  monetizationFilterQuery: string | null,
  keywordFilter: string | null,
  releaseDateStart: string | null,
  releaseDateEnd: string | null,
  region: string | null,
  ReleaseType: string | number | (string | number)[],
  pageParam: number
) => {
  const apiUrl = `discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=${sortValue}&vote_average.gte=${userScoreStart}&vote_average.lte=${userScoreEnd}&vote_count.gte=${userVote}&with_genres=${genreFilters}&with_runtime.gte=${runtimeStart}&with_runtime.lte=${runtimeEnd}&certification=${certificationFilter}&certification_country=US&with_watch_monetization_types=${monetizationFilterQuery}${keywordFilter}&release_date.gte=${releaseDateStart}&release_date.lte=${releaseDateEnd}&region=${region}&with_release_type=${ReleaseType}`;

  const response = await axiosInstance.get<MovieResponse>(apiUrl);
  return response.data;
};

export const useMoviesAll = (
  ...params: [
    sortValue: string,
    userScoreStart: number | number[],
    userScoreEnd: number | number[],
    userVote: string | number | (string | number)[],
    genreFilters: string | null,
    runtimeStart: number | number[],
    runtimeEnd: number | number[],
    certificationFilter: string | null,
    monetizationFilterQuery: string | null,
    keywordFilter: string | null,
    releaseDateStart: string | null,
    releaseDateEnd: string | null,
    region: string | null,
    ReleaseType: string | number | (string | number)[],
    pageParam: number
  ]
): UseQueryResult<MovieResponse, Error> => {
  return useQuery(["movies", ...params], () => fetchMoviesAll(...params), {
    keepPreviousData: true,
  });
};
