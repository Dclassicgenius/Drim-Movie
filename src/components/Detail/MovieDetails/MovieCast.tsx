import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { Cast } from "../../Cast/Cast";

export type MovieCastProps = {
  movieId: number;
};
export function MovieCast({ movieId }: MovieCastProps) {
  return <Cast id={movieId} useDetail={useMovieDetail} detailType={"movie"} />;
}
