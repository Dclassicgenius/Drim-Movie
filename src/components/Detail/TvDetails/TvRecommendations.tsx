import { useTvDetail } from "../../../hooks/VideoHooks/useTvDetail";
import { Recommendations } from "../../Recommendation/Recommendations";

export type TvRecommendationsProps = {
  tvId: number;
  API_IMG: string;
};

export function TvRecommendations({ tvId, API_IMG }: TvRecommendationsProps) {
  return (
    <Recommendations
      id={tvId}
      API_IMG={API_IMG}
      useDetail={useTvDetail}
      detailType="tv"
    />
  );
}
