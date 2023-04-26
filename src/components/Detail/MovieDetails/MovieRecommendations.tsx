import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { Recommendations } from "../../Recommendation/Recommendations";

export type MovieRecommendationsProps = {
  movieId: number;
  API_IMG: string;
};

export function MovieRecommendations({
  movieId,
  API_IMG,
}: MovieRecommendationsProps) {
  return (
    <Recommendations
      id={movieId}
      API_IMG={API_IMG}
      useDetail={useMovieDetail}
      detailType="movie"
    />
  );
}
