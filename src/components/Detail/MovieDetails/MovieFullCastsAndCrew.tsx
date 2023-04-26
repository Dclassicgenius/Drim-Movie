import { useParams } from "react-router-dom";
import { FullCastsAndCrew } from "../../Cast/FullCastsAndCrew";
import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";

export function MovieFullCastsAndCrew() {
  const { id } = useParams<{ id?: string }>();
  const movieId = parseInt(id ?? "0");
  return (
    <FullCastsAndCrew
      detailType="movie"
      id={movieId}
      useDetail={useMovieDetail}
    />
  );
}
