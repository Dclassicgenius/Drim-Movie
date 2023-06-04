import { useTvDetail } from "../../../hooks/TvHooks/useTvDetail";
import { Recommendations } from "../../Recommendation/Recommendations";

export type TvRecommendationsProps = {
  tvId: number;
};

export function TvRecommendations({ tvId }: TvRecommendationsProps) {
  return <Recommendations id={tvId} useDetail={useTvDetail} detailType="tv" />;
}
