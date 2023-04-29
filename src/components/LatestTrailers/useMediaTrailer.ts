// api.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IMovie, IVideo, TabType } from "../../types";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchMoviesWithTrailers = async (
  url: string,
  activeTab: TabType
): Promise<IMovie[]> => {
  const response = await axios.get(url);
  const mediaItems = response.data.results;

  const mediaItemsWithTrailers = await Promise.all(
    mediaItems.map(async (item: IMovie) => {
      const videoUrl =
        activeTab.id === 1
          ? `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
          : `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`;

      const videoResponse = await axios.get(videoUrl);

      let trailer: IVideo | undefined;

      if (videoResponse) {
        const videos: IVideo[] = videoResponse.data.results || [];

        trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (!trailer) {
          trailer = videos.find(
            (video) =>
              video.type === "Teaser" ||
              video.type === "Clip" ||
              (video.type === "Opening Credits" && video.site === "YouTube")
          );
        }
      }

      //   const trailer = videoResponse.data.results.find(
      //     (video: any) => video.type === "Trailer"
      //   );
      return { ...item, trailer };
    })
  );

  return mediaItemsWithTrailers;
};

export default function useMediaTrailer(
  url: string,
  activeTab: TabType,
  staleTime: number,
  cacheTime: number
) {
  return useQuery(
    ["movies", url],
    () => fetchMoviesWithTrailers(url, activeTab),
    {
      staleTime,
      cacheTime,
    }
  );
}
