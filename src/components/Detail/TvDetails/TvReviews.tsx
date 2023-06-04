import { useTvDetail } from "../../../hooks/TvHooks/useTvDetail";
import { Review } from "../../Review/Review";

export type TvReviewProps = {
  tvId: number;
};

export function TvReviews({ tvId }: TvReviewProps) {
  return (
    <Review
      id={tvId}
      useDetail={useTvDetail}
      displayCount={1}
      detailType="tv"
    />
  );
}
