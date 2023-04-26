import { useParams } from "react-router-dom";
import { FullCastsAndCrew } from "../../Cast/FullCastsAndCrew";
import { useTvDetail } from "../../../hooks/VideoHooks/useTvDetail";

export function TvFullCastsAndCrew() {
  const { id } = useParams<{ id?: string }>();
  const tvId = parseInt(id ?? "0");
  return <FullCastsAndCrew detailType="tv" id={tvId} useDetail={useTvDetail} />;
}
