// hooks/useTrailer.ts
import { useMovieTrailer } from "./useMovieTrailer";
import { IVideo } from "../types";

export function useTrailer(movieId: number) {
  const { data, isLoading, error } = useMovieTrailer(movieId);

  let trailer: IVideo | undefined;

  if (data) {
    const videos: IVideo[] = data.results || [];

    trailer = videos.find(
      (video) =>
        video.type === "Trailer" ||
        video.type === "Teaser" ||
        (video.type === "Clip" && video.site === "YouTube")
    );
  }

  return { trailer, isLoading, error };
}
