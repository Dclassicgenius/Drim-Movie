import { useParams } from "react-router-dom";
import { TvMainDetail } from "./TvMainDetail";
import { TvRecommendations } from "./TvRecommendations";
import { TvReviews } from "./TvReviews";
import { TvCast } from "./TvCast";
import { TvSideBar } from "./TvSideBar";
export function TvDetail() {
  const { id } = useParams<{ id?: string }>();
  const tvId = parseInt(id ?? "0");

  return (
    <>
      <TvMainDetail tvId={tvId} />

      <section className="grid sm:grid-cols-5 grid-cols-1 gap-4">
        <div className="col-span-4">
          <TvCast tvId={tvId} />
          <TvReviews tvId={tvId} />
          <TvRecommendations tvId={tvId} />
        </div>
        <TvSideBar id={tvId} />
      </section>
    </>
  );
}
