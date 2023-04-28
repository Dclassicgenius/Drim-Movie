import axios from "axios";
import { IMovie, IResponse } from "../types";
import { useQuery } from "@tanstack/react-query";

const fetchMovies = async (url: string) => {
  const response = await axios.get<IResponse>(url);
  return response.data.results;
};

const useFetchMovies = (
  url: string,
  staleTime: number = 0,
  refetchInterval: number = 0
) => {
  const { isLoading, data, error } = useQuery<IMovie[], Error>(
    ["movies", url],
    () => fetchMovies(url),
    {
      staleTime,
      refetchInterval,
    }
  );

  return { isLoading, data, error };
};

export default useFetchMovies;
