import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { Review } from "../../Review/Review";

export type MovieReviewProps = {
  movieId: number;
  API_IMG: string;
};

export function MovieReviews({ movieId, API_IMG }: MovieReviewProps) {
  return (
    <Review
      API_IMG={API_IMG}
      id={movieId}
      useDetail={useMovieDetail}
      displayCount={1}
      detailType="movie"
    />
  );
}
