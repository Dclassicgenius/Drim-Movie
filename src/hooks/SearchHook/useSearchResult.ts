import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  MultiSearchResult,
  Person,
  SearchResult,
} from "../../components/Search/SearchType/SearchType";
import axiosInstance from "../axiosInstance";
import { IMovie } from "../../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
type PersonDepartmentAndGender = {
  known_for_department: string;
  gender: number;
  id: number;
};

const filterMovie = (value: SearchResult): value is IMovie => {
  return (
    typeof value === "object" && value && value.hasOwnProperty("release_date")
  );
};

const filterTvShow = (value: SearchResult): value is IMovie => {
  return (
    typeof value === "object" && value && value.hasOwnProperty("first_air_date")
  );
};

const filterPerson = (value: SearchResult): value is Person => {
  return (
    typeof value === "object" &&
    value &&
    value.hasOwnProperty("id") &&
    value.hasOwnProperty("name") &&
    value.hasOwnProperty("known_for") &&
    value.hasOwnProperty("known_for_department") &&
    value.hasOwnProperty("gender")
  );
};

const fetchPersonDepartment = async (personId: number) => {
  const response = await axiosInstance.get<PersonDepartmentAndGender>(
    `person/${personId}?api_key=${apiKey}&language=en-US`
  );
  return response.data;
};

const fetchSearchResult = async (
  pageParam: number,
  searchType: string,
  searchQuery: string
) => {
  const { data } = await axiosInstance.get<MultiSearchResult>(
    `search/${searchType}?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${pageParam}&include_adult=false`
  );

  let filteredResults: IMovie[] | Person[] = [];

  if (searchType === "movie") {
    filteredResults = data.results.filter(filterMovie);
  } else if (searchType === "tv") {
    filteredResults = data.results.filter(filterTvShow);
  } else if (searchType === "person") {
    const updatedresults = await Promise.all(
      data.results.map(async (result) => {
        const personDepartmentAndGender = await fetchPersonDepartment(
          result.id
        );
        return {
          ...result,
          known_for_department: personDepartmentAndGender.known_for_department,
          gender: personDepartmentAndGender.gender,
        };
      })
    );
    filteredResults = updatedresults.filter(filterPerson);
  }

  return { ...data, results: filteredResults };
};

export const useSearchResult = (
  pageParam: number,
  searchType: string,
  searchQuery: string
): UseQueryResult<MultiSearchResult, Error> => {
  return useQuery(
    [searchType, pageParam],
    () => fetchSearchResult(pageParam, searchType, searchQuery),
    { keepPreviousData: true }
  );
};
