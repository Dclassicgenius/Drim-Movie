import { Cast } from "../Cast/Cast";
import { Review } from "../Review/Review";
import { Recommendations } from "../Recommendation/Recommendations";
import { SideBar } from "./SideBar";
import { useParams } from "react-router-dom";
import { MovieMainDetail } from "./MovieMainDetail";

export function MovieDetail() {
  const { id } = useParams<{ id?: string }>();

  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const movieId = parseInt(id ?? "0");

  return (
    <>
      <MovieMainDetail movieId={movieId} API_IMG={API_IMG} />

      <section className="grid grid-cols-5 gap-4">
        <Cast movieId={movieId} API_IMG={API_IMG} />
        <SideBar movieId={movieId} />
      </section>

      <Review API_IMG={API_IMG} movieId={movieId} />
      <Recommendations movieId={movieId} API_IMG={API_IMG} />
    </>
  );
}
