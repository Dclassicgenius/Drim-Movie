import { MovieMain } from "../../Movies/MovieMain/MovieMain";
import moment from "moment";

export const AiringToday = () => {
  const now = moment();
  const currentDate = now.format("YYYY-MM-DD");

  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        TV Shows Airing Today
      </h1>
      <MovieMain
        checkedAvailabilityAll={false}
        releaseDateStart={currentDate}
        releaseDateEnd={currentDate}
        pageCount={5}
        mediaType="tv"
      />
    </>
  );
};
