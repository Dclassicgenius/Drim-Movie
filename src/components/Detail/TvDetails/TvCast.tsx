import { useTvDetail } from "../../../hooks/TvHooks/useTvDetail";
import { Cast } from "../../Cast/Cast";

export type TvCastProps = {
  tvId: number;
};
export function TvCast({ tvId }: TvCastProps) {
  return <Cast id={tvId} useDetail={useTvDetail} detailType={"tv"} />;
}
