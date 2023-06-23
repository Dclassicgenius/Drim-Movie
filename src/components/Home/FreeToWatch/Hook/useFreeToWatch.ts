import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../hooks/axiosInstance";
import { IResponse } from "../../../../types";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const tvBase =
  "&include_adult=false&include_null_first_air_dates=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US";

const movieBase =
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const tvUrl = `discover/tv?api_key=${apiKey}${tvBase}&with_watch_monetization_types=free`;

const movieUrl = `discover/movie?api_key=${apiKey}${movieBase}&watch_region=US&with_watch_monetization_types=free&region=US&with_release_type=1|2|3|4|5|6`;

const fetchFreeMedia = (activeTabId: number | string) => {
  const apiUrl = activeTabId === 1 ? movieUrl : tvUrl;

  return axiosInstance.get<IResponse>(apiUrl).then((response) => {
    const freeTowatch = response.data.results.map((media) => ({
      ...media,
      type: media.release_date ? "movie" : "tv",
    }));
    return freeTowatch;
  });
};

const useFreetoWatchMedia = (activeTabId: number | string) => {
  return useQuery(["freeMedia", activeTabId], () =>
    fetchFreeMedia(activeTabId)
  );
};

export default useFreetoWatchMedia;
