import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { ITvShowDetails } from "../../components/Detail/TvDetails/TvDetailsType";

const fetchTvdata = async (tvId: number): Promise<ITvShowDetails> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get<ITvShowDetails>(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&language=en-US&append_to_response=credits,content_ratings,recommendations,reviews,videos,external_ids,episode_groups,keywords,aggregate_credits`
  );

  return response.data;
};

export const useTvDetail = (
  tvId: number
): UseQueryResult<ITvShowDetails, Error> => {
  return useQuery(["tvShowdetails", tvId], () => fetchTvdata(tvId));
};
