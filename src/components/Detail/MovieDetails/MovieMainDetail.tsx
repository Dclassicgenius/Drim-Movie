import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { DetailMain } from "../DetailMain";

type MovieMainProps = {
  movieId: number;
  API_IMG: string;
};

export function MovieMainDetail({ movieId }: MovieMainProps) {
  return (
    <DetailMain id={movieId} useDetail={useMovieDetail} detailType="movie" />
  );
}
