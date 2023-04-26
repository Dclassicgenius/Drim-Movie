import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { ReviewAll } from "../../Review/ReviewAll";

export function MovieReviewAll() {
  const { id } = useParams<{ id?: string }>();
  const movieId = parseInt(id ?? "0");
  return (
    <ReviewAll id={movieId} useDetail={useMovieDetail} detailType={"movie"} />
  );
}
