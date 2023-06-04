import { useTvDetail } from "../../../hooks/TvHooks/useTvDetail";
import { DetailMain } from "../DetailMain";

type TvMainDetailProps = {
  tvId: number;
};

export function TvMainDetail({ tvId }: TvMainDetailProps) {
  return <DetailMain id={tvId} useDetail={useTvDetail} detailType="tv" />;
}
