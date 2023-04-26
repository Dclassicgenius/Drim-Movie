import { useTvDetail } from "../../../hooks/VideoHooks/useTvDetail";
import { DetailMain } from "../DetailMain";

type TvMainDetailProps = {
  tvId: number;
  API_IMG: string;
};

export function TvMainDetail({ tvId, API_IMG }: TvMainDetailProps) {
  return (
    <DetailMain
      id={tvId}
      API_IMG={API_IMG}
      useDetail={useTvDetail}
      detailType="tv"
    />
  );
}
