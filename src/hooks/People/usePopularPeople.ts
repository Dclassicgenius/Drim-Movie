import { useQuery } from "@tanstack/react-query";
import { Person } from "../../components/Search/SearchType/SearchType";
import axiosInstance from "../axiosInstance";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export interface PopularPeopleResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

const fetchPopularPeople = (pageParam: number) => {
  const apiUrl = `person/popular?api_key=${apiKey}&language=en-US&page=${pageParam}`;

  return axiosInstance
    .get<PopularPeopleResponse>(apiUrl)
    .then((response) => response.data);
};

export const usePopularPeople = (pageParam: number) => {
  return useQuery(
    ["popularPeople", pageParam],
    () => fetchPopularPeople(pageParam),
    { keepPreviousData: true }
  );
};
