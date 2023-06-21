import React from "react";
import { MovieMain } from "../../Movies/MovieMain/MovieMain";
import { FilterStateProvider } from "../../Movies/Hook/useFilterState";

export const PopularTv = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pl-10 [@media(min-width:600px)]:pl-5 my-7">
        Popular TV Shows
      </h1>
      <FilterStateProvider
        initialFilterState={{
          checkedAvailabilityAll: false,
        }}
        mediaType="tv"
      >
        <MovieMain mediaType="tv" />
      </FilterStateProvider>
    </>
  );
};
