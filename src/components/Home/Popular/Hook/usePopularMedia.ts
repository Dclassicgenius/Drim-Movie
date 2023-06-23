import moment from "moment";
import axiosInstance from "../../../../hooks/axiosInstance";
import { IMovie, IResponse } from "../../../../types";
import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() + 6);

const initialReleaseDateEnd = currentDate.toISOString().substring(0, 10);

const now = moment();
const sixWeeksAgo = now.subtract(6, "weeks");
const sixWeeksAndtwoDays = sixWeeksAgo.add(1, "days");
const startDate = sixWeeksAndtwoDays.format("YYYY-MM-DD");

const newNow = moment();
const twoDaysAhead = newNow.add(1, "days");
const endDate = twoDaysAhead.format("YYYY-MM-DD");

// const current = moment();
const onTvStartDate = now.format("YYYY-MM-DD");

const weekAhead = now.clone().add(1, "weeks");
const onTvEndDate = weekAhead.format("YYYY-MM-DD");

const tvBase =
  "&include_adult=false&include_null_first_air_dates=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US";

const movieBase =
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const tvStreamUrl = `discover/tv?api_key=${apiKey}${tvBase}&with_watch_monetization_types=flatrate&air_date.lte=${initialReleaseDateEnd}`;

const movieStreamUrl = `discover/movie?api_key=${apiKey}${movieBase}&watch_region=US&with_watch_monetization_types=flatrate&release_date.lte=${initialReleaseDateEnd}&region=US&with_release_type=1|2|3|4|5|6`;

const forRentUrl = `discover/movie?api_key=${apiKey}${movieBase}&watch_region=US&with_watch_monetization_types=rent&release_date.lte=${initialReleaseDateEnd}&region=US&with_release_type=1|2|3|4|5|6`;

const theaterUrl = `discover/movie?api_key=${apiKey}${movieBase}&release_date.gte=${startDate}&release_date.lte=${endDate}&region=US&with_release_type=3|2`;

const onTvUrl = `discover/tv?api_key=${apiKey}${tvBase}&air_date.gte=${onTvStartDate}&air_date.lte=${onTvEndDate}`;

const fetchData = (url: string) => {
  return axiosInstance
    .get<IResponse>(url)
    .then((response) => response.data.results);
};

const setData = async (activeTabId: number | string) => {
  let data: IMovie[];

  const tvStream = await fetchData(tvStreamUrl);
  const movieStream = await fetchData(movieStreamUrl);

  const streamData = tvStream
    .concat(movieStream)
    .sort((a, b) => b.popularity - a.popularity);

  data =
    activeTabId === 1
      ? streamData
      : activeTabId === 2
      ? await fetchData(theaterUrl)
      : activeTabId === 3
      ? await fetchData(forRentUrl)
      : await fetchData(onTvUrl);

  const popular: IMovie[] = data.map((media) => ({
    ...media,
    type: media.first_air_date ? "tv" : "movie",
  }));

  return popular;
};

export default function usePopularMedia(activeTabId: number | string) {
  return useQuery(["popularMedia", activeTabId], () => setData(activeTabId));
}
