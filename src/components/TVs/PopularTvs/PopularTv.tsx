import React from "react";
import { MovieMain } from "../../Movies/MovieMain/MovieMain";

export const PopularTv = () => {
  return (
    <>
      <MovieMain mediaType="tv" checkedAvailabilityAll={false} />
    </>
  );
};
