import { Review } from "./Review";
import { PageHeader } from "../Layout/PageHeader";

export type ReviewAllProps = {
  id: number;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

export function ReviewAll({ id, useDetail, detailType }: ReviewAllProps) {
  return (
    <>
      <div className="">
        <PageHeader useDetail={useDetail} detailType={detailType} />
        <Review
          id={id}
          displayCount={-1}
          useDetail={useDetail}
          detailType={detailType}
        />
      </div>
    </>
  );
}
