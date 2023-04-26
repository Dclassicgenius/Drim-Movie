import { useParams } from "react-router-dom";
import { Review } from "./Review";
import { PageHeader } from "../Layout/PageHeader";

export type ReviewAllProps = {
  id: number;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

export function ReviewAll({ id, useDetail, detailType }: ReviewAllProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <div className="">
        <PageHeader useDetail={useDetail} detailType={detailType} />
        <Review
          id={id}
          API_IMG={API_IMG}
          displayCount={-1}
          useDetail={useDetail}
          detailType={detailType}
        />
      </div>
    </>
  );
}
