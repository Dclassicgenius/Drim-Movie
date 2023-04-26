import { useParams } from "react-router-dom";
import { MovieMainDetail } from "./MovieMainDetail";
import { MovieRecommendations } from "./MovieRecommendations";
import { MovieReviews } from "./MovieReviews";
import { MovieCast } from "./MovieCast";
import { MovieSideBar } from "./MovieSideBar";

export function MovieDetail() {
  const { id } = useParams<{ id?: string }>();

  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const movieId = parseInt(id ?? "0");

  return (
    <>
      <MovieMainDetail movieId={movieId} API_IMG={API_IMG} />

      <section className="grid grid-cols-5 gap-4">
        <MovieCast movieId={movieId} API_IMG={API_IMG} />
        <MovieSideBar movieId={movieId} />
      </section>

      <MovieReviews API_IMG={API_IMG} movieId={movieId} />
      <MovieRecommendations movieId={movieId} API_IMG={API_IMG} />
    </>
  );
}
