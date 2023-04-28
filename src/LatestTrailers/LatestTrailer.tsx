import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IVideo, TabType } from "../types";
import useMediaTrailer from "./useMediaTrailer";
import { MovieTrailer } from "../components/Trailer/MovieTrailer";
import { Tabs } from "../components/Layout/Tabs";
import { Link } from "react-router-dom";

const tabs = [
  {
    id: 1,
    title: "Movies",
    apiUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`,
  },
  {
    id: 2,
    title: "TV Shows",
    apiUrl: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`,
  },
];

export function LatestTrailer() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [activeTrailer, setActiveTrailer] = useState<IVideo | undefined>(
    undefined
  );
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  const {
    isLoading,
    data: media,

    error,
  } = useMediaTrailer(activeTab.apiUrl, activeTab, 1000 * 60 * 5, 1000 * 60);

  function togglePlayer(trailer: IVideo) {
    setActiveTrailer(trailer);
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  function handleCloseClick(event: React.MouseEvent) {
    event.stopPropagation();
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  const mediaWithTrailers = media || [];

  const filteredTrailers = mediaWithTrailers?.filter(
    (trailer) => trailer.backdrop_path !== null && trailer.trailer !== undefined
  );

  const renderTrailerCards = () => {
    return filteredTrailers.map((trailer) => (
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
              activeTab.id === 1 ? `/movie/${trailer.id}` : `/tv/${trailer.id}`
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
    ));
  };
  return (
    <>
      <div className="bg-sky-800 w-11/12 mx-auto pt-6 text-white">
        <Tabs
          tabs={tabs}
          header="Latest Trailers"
          handleTabClick={setActiveTab}
          activeTab={activeTab}
        />
        <section className="overflow-x-auto flex  space-x-5 pt-6 pl-11">
          {renderTrailerCards()}
        </section>

        {showPlayer && (
          <MovieTrailer
            handleCloseClick={handleCloseClick}
            showPlayer={showPlayer}
            trailer={activeTrailer}
          />
        )}
      </div>
    </>
  );
}
