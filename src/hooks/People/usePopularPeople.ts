import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMovie } from "../../types";
import { Person } from "../../components/Search/SearchType/SearchType";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export interface PopularPeopleResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

const fetchPopularPeople = async (pageParam: number) => {
  const apiUrl = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${pageParam}`;

  const response = await axios.get<PopularPeopleResponse>(apiUrl);
  console.log(response.data.results);

  return response.data;
};

export const usePopularPeople = (
  pageParam: number
): UseQueryResult<PopularPeopleResponse, Error> => {
  return useQuery(
    ["popularPeople", pageParam],
    () => fetchPopularPeople(pageParam),
    { keepPreviousData: true }
  );
};
