import { MovieMain } from "../MovieMain/MovieMain";
import moment from "moment";

export const NowPlaying = () => {
  const now = moment();
  const sixWeeksAgo = now.subtract(6, "weeks");
  const sixWeeksAndtwoDays = sixWeeksAgo.add(2, "days");
  const startDate = sixWeeksAndtwoDays.format("YYYY-MM-DD");

  const newNow = moment();
  const twoDaysAhead = newNow.add(2, "days");
  const endDate = twoDaysAhead.format("YYYY-MM-DD");
  return (
    <>
      <MovieMain
        releasesAll={false}
        releasesTypes={[3, 2]}
        releaseDateStart={startDate}
        releaseDateEnd={endDate}
        pageCount={16}
      />
    </>
  );
};
