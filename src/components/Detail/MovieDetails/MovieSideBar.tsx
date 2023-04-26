import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { SideBar } from "../SideBar";

export type MovieSideBarProps = {
  movieId: number;
};

export function MovieSideBar({ movieId }: MovieSideBarProps) {
  return (
    <SideBar id={movieId} useDetail={useMovieDetail} detailType={"movie"} />
  );
}
