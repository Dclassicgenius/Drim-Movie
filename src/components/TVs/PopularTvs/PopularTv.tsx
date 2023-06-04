import React from "react";
import { MovieMain } from "../../Movies/MovieMain/MovieMain";

export const PopularTv = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Popular TV Shows
      </h1>
      <MovieMain mediaType="tv" checkedAvailabilityAll={false} />
    </>
  );
};
