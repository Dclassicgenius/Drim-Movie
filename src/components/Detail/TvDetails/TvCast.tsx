import { useTvDetail } from "../../../hooks/VideoHooks/useTvDetail";
import { Cast } from "../../Cast/Cast";

export type TvCastProps = {
  tvId: number;
  API_IMG: string;
};
export function TvCast({ tvId, API_IMG }: TvCastProps) {
  return (
    <Cast
      id={tvId}
      API_IMG={API_IMG}
      useDetail={useTvDetail}
      detailType={"tv"}
    />
  );
}
