import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { Review } from "../../Review/Review";

export type MovieReviewProps = {
  movieId: number;
};

export function MovieReviews({ movieId }: MovieReviewProps) {
  return (
    <Review
      id={movieId}
      useDetail={useMovieDetail}
      displayCount={1}
      detailType="movie"
    />
  );
}
