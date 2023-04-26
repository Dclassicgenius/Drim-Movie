import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { Cast } from "../../Cast/Cast";

export type MovieCastProps = {
  movieId: number;
  API_IMG: string;
};
export function MovieCast({ movieId, API_IMG }: MovieCastProps) {
  return (
    <Cast
      id={movieId}
      API_IMG={API_IMG}
      useDetail={useMovieDetail}
      detailType={"movie"}
    />
  );
}
