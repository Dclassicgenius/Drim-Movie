import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { IResponseVideo } from "../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const fetchMovieVideos = async (movieId: number): Promise<IResponseVideo> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
  );

  return response.data;
};

export function useMovieTrailer(
  movieId: number
): UseQueryResult<IResponseVideo, Error> {
  return useQuery(["MovieTrailer", movieId], () => fetchMovieVideos(movieId), {
    enabled: movieId !== undefined,
  });
}
