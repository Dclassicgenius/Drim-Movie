import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { MultiSearchResult } from "../../components/Search/SearchType/SearchType";
import { IMovie } from "../../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
type PersonDepartmentAndGender = {
  known_for_department: string;
  gender: number;
  id: number;
};

const fetchPersonDepartment = async (
  personId: number
): Promise<PersonDepartmentAndGender> => {
  const response = await axios.get<PersonDepartmentAndGender>(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&language=en-US`
  );
  return response.data;
};

const fetchSearchResult = async (
  pageParam: number,
  searchType: string,
  searchQuery: string
): Promise<MultiSearchResult> => {
  const response = await axios.get<MultiSearchResult>(
    `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${pageParam}&include_adult=false`
  );
  const data = response.data;

  if (searchType === "person") {
    const updatedresults = await Promise.all(
      data.results.map(async (result) => {
        if (result) {
          const personDepartmentAndGender = await fetchPersonDepartment(
            result.id
          );
          return {
            ...result,
            known_for_department:
              personDepartmentAndGender.known_for_department,
            gender: personDepartmentAndGender.gender,
          };
        }
        console.log(result);

        return result;
      })
    );
    return { ...data, results: updatedresults };
  }
  console.log(data);

  return data;
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
