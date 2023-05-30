import moment from "moment";
import { MovieMain } from "../../Movies/MovieMain/MovieMain";

export const AiringOnTv = () => {
  const now = moment();
  const startDate = now.format("YYYY-MM-DD");

  const weekAhead = now.clone().add(1, "weeks");
  const endDate = weekAhead.format("YYYY-MM-DD");
  return (
    <>
      <h1 className="font-bold text-2xl pl-5 my-7">
        Currently Airing TV Shows
      </h1>
      <MovieMain
        checkedAvailabilityAll={false}
        releaseDateStart={startDate}
        releaseDateEnd={endDate}
        pageCount={15}
        mediaType="tv"
      />
    </>
  );
};
