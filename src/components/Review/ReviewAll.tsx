import { useParams } from "react-router-dom";
import { Review } from "./Review";
import { PageHeader } from "../Layout/PageHeader";

export function ReviewAll() {
  const { id } = useParams<{ id?: string }>();

  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const movieId = parseInt(id ?? "0");
  return (
    <>
      <div className="">
        <PageHeader />
        <Review movieId={movieId} API_IMG={API_IMG} displayCount={-1} />
      </div>
    </>
  );
}
