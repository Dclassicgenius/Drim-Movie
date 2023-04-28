import axios from "axios";
import { IMovie, IResponse } from "../types";
import { useQuery } from "@tanstack/react-query";

const fetchMovies = async (url: string) => {
  const response = await axios.get<IResponse>(url);
  return response.data.results;
};

const useFetchMovies = (url: string) => {
  const { isLoading, data, error } = useQuery<IMovie[], Error>(
    ["movies", url],
    () => fetchMovies(url)
  );

  return { isLoading, data, error };
};

export default useFetchMovies;
