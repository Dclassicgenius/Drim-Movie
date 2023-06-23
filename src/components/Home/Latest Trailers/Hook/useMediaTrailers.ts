import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../hooks/axiosInstance";
import { IMovie, IResponse, IVideo } from "../../../../types";
import { TrailerTabs } from "../TrailerTabs";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const getTrailer = async (videoUrl: string) => {
  const videoResponse = await axiosInstance.get(videoUrl);

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

  return trailer;
};

// const fetchTvWithTrailers = async () => {
//   const apiUrl = `tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;

//   const response = await axiosInstance.get<IResponse>(apiUrl);
//   const tvShows = response.data.results;
//   const trailerPromises: Promise<IMovie>[] = (tvShows || []).map(
//     async (tvShow) => {
//       const trailerUrl = `tv/${tvShow.id}/videos?api_key=${apiKey}&language=en-US`;

//       try {
//         const trailer = await getTrailer(trailerUrl);

//         return { ...tvShow, trailer: trailer };
//       } catch (error) {
//         console.error(
//           `Error fetching trailer for TV show with ID: ${tvShow.id}`,
//           error
//         );
//         return { ...tvShow, trailer: null };
//       }
//     }
//   );

//   return Promise.all(trailerPromises);
// };

const fetchMediaWithTrailers = async (activeTab: TrailerTabs) => {
  const apiUrl =
    activeTab.id === 2
      ? `movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
      : activeTab.id === 1
      ? `movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      : `tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;

  const response = await axiosInstance.get<IResponse>(apiUrl);
  const media = response.data.results;
  const trailerPromises: Promise<IMovie>[] = (media || []).map(async (item) => {
    const trailerUrl =
      activeTab.id === 3
        ? `tv/${item.id}/videos?api_key=${apiKey}&language=en-US`
        : `movie/${item.id}/videos?api_key=${apiKey}&language=en-US`;

    try {
      const trailer = await getTrailer(trailerUrl);

      return { ...item, trailer: trailer };
    } catch (error) {
      console.error(
        `Error fetching trailer for TV show with ID: ${item.id}`,
        error
      );
      return { ...item, trailer: null };
    }
  });

  return Promise.all(trailerPromises);
};

export default function useMediaTrailers(activeTab: TrailerTabs) {
  return useQuery(["media", activeTab], () =>
    fetchMediaWithTrailers(activeTab)
  );
}
