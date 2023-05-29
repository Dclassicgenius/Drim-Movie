import moment from "moment";
import { MovieMain } from "../MovieMain/MovieMain";

export const Upcoming = () => {
  const now = moment();
  const twoDaysAhead = now.add(2, "days");
  const startDate = twoDaysAhead.format("YYYY-MM-DD");

  const newNow = moment();
  const threeWeeksAhead = newNow.add(3, "weeks");
  const threeWeeksAheadAndtwoDays = threeWeeksAhead.add(2, "days");
  const endDate = threeWeeksAheadAndtwoDays.format("YYYY-MM-DD");
  return (
    <>
      <MovieMain
        releasesAll={false}
        releasesTypes={[2, 3]}
        releaseDateStart={startDate}
        releaseDateEnd={endDate}
        pageCount={4}
      />
    </>
  );
};
