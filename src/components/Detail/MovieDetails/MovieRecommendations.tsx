import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { Recommendations } from "../../Recommendation/Recommendations";

export type MovieRecommendationsProps = {
  movieId: number;
};

export function MovieRecommendations({ movieId }: MovieRecommendationsProps) {
  return (
    <Recommendations
      id={movieId}
      useDetail={useMovieDetail}
      detailType="movie"
    />
  );
}
