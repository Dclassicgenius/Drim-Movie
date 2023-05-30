import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface TVResponse {
  page: number;
  results: Tv[];
  total_pages: number;
  total_results: number;
}

export interface Tv {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  origin_country: string[];
  name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

const fetchTvAll = async (
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
  airDateStart: string | null,
  airDateEnd: string | null,
  pageParam: number
) => {
  const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&include_adult=false&include_null_first_air_dates=false&include_video=false&language=en-US&page=${pageParam}&sort_by=${sortValue}&vote_average.gte=${userScoreStart}&vote_average.lte${userScoreEnd}&vote_count.gte=${userVote}&with_genres=${genreFilters}&with_runtime.gte=${runtimeStart}&with_runtime.lte${runtimeEnd}&certification=${certificationFilter}&certification_country=US&with_watch_monetization_types=${monetizationFilterQuery}${keywordFilter}&air_date.gte=${airDateStart}&air_date.lte=${airDateEnd}&watch_region=US`;

  console.log(apiUrl);

  const response = await axios.get<TVResponse>(apiUrl);
  return response.data;
};

export const useTvAll = (
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
  airDateStart: string | null,
  airDateEnd: string | null,
  //   region: string | null,
  //   ReleaseType: string | number | (string | number)[],
  pageParam: number,
  isDataFetched: boolean
): UseQueryResult<TVResponse, Error> => {
  return useQuery(
    [
      "movies",
      sortValue,
      userScoreStart,
      userScoreEnd,
      userVote,
      genreFilters,
      runtimeStart,
      runtimeEnd,
      certificationFilter,
      monetizationFilterQuery,
      keywordFilter,
      airDateStart,
      airDateEnd,
      //   region,
      //   ReleaseType,
      pageParam,
    ],
    () =>
      fetchTvAll(
        sortValue,
        userScoreStart,
        userScoreEnd,
        userVote,
        genreFilters,
        runtimeStart,
        runtimeEnd,
        certificationFilter,
        monetizationFilterQuery,
        keywordFilter,
        airDateStart,
        airDateEnd,
        // region,
        // ReleaseType,
        pageParam
      ),
    { keepPreviousData: true }
  );
};
