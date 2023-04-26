import { useTvDetail } from "../../../hooks/VideoHooks/useTvDetail";
import { Review } from "../../Review/Review";

export type TvReviewProps = {
  tvId: number;
  API_IMG: string;
};

export function TvReviews({ tvId, API_IMG }: TvReviewProps) {
  return (
    <Review
      API_IMG={API_IMG}
      id={tvId}
      useDetail={useTvDetail}
      displayCount={1}
      detailType="tv"
    />
  );
}
