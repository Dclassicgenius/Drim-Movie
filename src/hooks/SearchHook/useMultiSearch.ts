import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import {
  MultiSearchResult,
  Person,
  Collections,
} from "../../components/Search/SearchType/SearchType";
import { IMovie } from "../../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
type PersonDepartmentAndGender = {
  known_for_department: string;
  gender: number;
  id: number;
};

const isPerson = (item: IMovie | Person | Collections): item is Person =>
  (item as Person).media_type === "person";

const fetchPersonDepartment = async (
  personId: number
): Promise<PersonDepartmentAndGender> => {
  const response = await axios.get<PersonDepartmentAndGender>(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US`
  );
  return response.data;
};

const fetchMultiSearch = async (
  pageParam: number = 1,
  searchQuery: string
): Promise<MultiSearchResult> => {
  const response = await axios.get<MultiSearchResult>(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchQuery}&${pageParam}=1&include_adult=false`
  );
  const data = response.data;

  const updatedresults = await Promise.all(
    data.results.map(async (result) => {
      if (isPerson(result)) {
        const personDepartmentAndGender = await fetchPersonDepartment(
          result.id
        );
        return {
          ...result,
          known_for_department: personDepartmentAndGender.known_for_department,
          gender: personDepartmentAndGender.gender,
        };
      }
      return result;
    })
  );
  return { ...data, results: updatedresults };
};

export const useMultiSearch = (
  pageParam: number,
  searchQuery: string
): UseQueryResult<MultiSearchResult, Error> => {
  return useQuery(
    [searchQuery, pageParam],
    () => fetchMultiSearch(pageParam, searchQuery),
    { keepPreviousData: true }
  );
};
