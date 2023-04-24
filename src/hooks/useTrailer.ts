import { IVideo } from "../types";
import { useMovieDetail } from "./MovieHooks/useMovieDetail";

export function useTrailer(movieId: number) {
  const { data, isLoading, error } = useMovieDetail(movieId);

  let trailer: IVideo | undefined;

  if (data) {
    const videos: IVideo[] = data.videos.results || [];

    trailer = videos.find(
      (video) =>
        video.type === "Trailer" ||
        video.type === "Teaser" ||
        (video.type === "Clip" && video.site === "YouTube")
    );
  }

  return { trailer, isLoading, error };
}
