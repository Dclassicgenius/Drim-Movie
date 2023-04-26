import { useParams } from "react-router-dom";
import { useTvDetail } from "../../../hooks/VideoHooks/useTvDetail";
import { ReviewAll } from "../../Review/ReviewAll";

export function TvReviewAll() {
  const { id } = useParams<{ id?: string }>();
  const tvId = parseInt(id ?? "0");
  return <ReviewAll id={tvId} useDetail={useTvDetail} detailType={"tv"} />;
}
