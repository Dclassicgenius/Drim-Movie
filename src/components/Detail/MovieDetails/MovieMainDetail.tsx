import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { DetailMain } from "../DetailMain";

type MovieMainProps = {
  movieId: number;
  API_IMG: string;
};

export function MovieMainDetail({ movieId, API_IMG }: MovieMainProps) {
  return (
    <DetailMain
      id={movieId}
      API_IMG={API_IMG}
      useDetail={useMovieDetail}
      detailType="movie"
    />
  );
}
