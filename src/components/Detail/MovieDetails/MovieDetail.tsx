import { useParams } from "react-router-dom";
import { MovieMainDetail } from "./MovieMainDetail";
import { MovieRecommendations } from "./MovieRecommendations";
import { MovieReviews } from "./MovieReviews";
import { MovieCast } from "./MovieCast";
import { MovieSideBar } from "./MovieSideBar";

export function MovieDetail() {
  const { id } = useParams<{ id?: string }>();
  const movieId = parseInt(id ?? "0");

  return (
    <>
      <MovieMainDetail movieId={movieId} />

      <section className="grid sm:grid-cols-5 grid-cols-1 gap-4">
        <div className=" col-span-1 sm:col-span-4">
          <MovieCast movieId={movieId} />
          <MovieReviews movieId={movieId} />
          <MovieRecommendations movieId={movieId} />
        </div>
        <div>
          <MovieSideBar movieId={movieId} />
        </div>
      </section>
    </>
  );
}
