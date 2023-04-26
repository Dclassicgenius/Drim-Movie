import { useParams } from "react-router-dom";
import { TvMainDetail } from "./TvMainDetail";
import { TvRecommendations } from "./TvRecommendations";
import { TvReviews } from "./TvReviews";
import { TvCast } from "./TvCast";
// import { TvSideBar } from "./TvSideBar";

export function TvDetail() {
  const { id } = useParams<{ id?: string }>();

  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const tvId = parseInt(id ?? "0");

  return (
    <>
      <TvMainDetail tvId={tvId} API_IMG={API_IMG} />

      <section className="grid grid-cols-5 gap-4">
        <TvCast tvId={tvId} API_IMG={API_IMG} />
        {/* <TvSideBar tvId={tvId} /> */}
      </section>

      <TvReviews API_IMG={API_IMG} tvId={tvId} />
      <TvRecommendations tvId={tvId} API_IMG={API_IMG} />
    </>
  );
}
