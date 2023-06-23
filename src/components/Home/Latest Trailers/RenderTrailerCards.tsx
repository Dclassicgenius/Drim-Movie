import React, { useState } from "react";
import { IMovie, IVideo } from "../../../types";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TrailerTabs } from "./TrailerTabs";
import { MovieTrailer } from "../../Trailer/MovieTrailer";

interface renderTrailerCardsProps {
  trailers: IMovie[];
  activeTab: TrailerTabs;
  togglePlayer: (trailer: IVideo) => void;
}

const API_IMG = "https://image.tmdb.org/t/p/w500";

export const RenderTrailerCards = ({
  trailers,
  activeTab,
  togglePlayer,
}: renderTrailerCardsProps) => {
  return (
    <>
      {trailers.map((trailer) => (
        <div className="rounded-lg mb-4 dark:bg-gray-800" key={trailer.id}>
          <div
            className="relative"
            onClick={() => trailer.trailer && togglePlayer(trailer.trailer)}
          >
            <img
              className="cursor-pointer max-h[200px] min-w-[300px] sm:max-h[200px] object-contain transform[450ms] rounded-lg hover:scale-105 ease-in duration-[450ms]"
              src={API_IMG + trailer.backdrop_path}
              alt={trailer.title || trailer.name}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl cursor-pointer">
              <FaPlay />
            </div>
          </div>

          <div className="py-2 px-1 ">
            <Link
              to={
                activeTab.id === 1
                  ? `/movie/${trailer.id}`
                  : activeTab.id === 2
                  ? `/movie/${trailer.id}`
                  : `/tv/${trailer.id}`
              }
              key={trailer.id}
            >
              <h5 className="text-sm font-bold tracking-tight text-white dark:text-white text-center">
                {trailer.title || trailer.name}
              </h5>
            </Link>
            <p className="font-light text-sm pt-1 text-white dark:text-gray-400 text-center">
              {trailer.trailer?.name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
