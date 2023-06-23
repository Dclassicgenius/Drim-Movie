import { useState } from "react";
import { TrailerTabs } from "./TrailerTabs";
import useMediaTrailers from "./Hook/useMediaTrailers";
import { RenderTrailerCards } from "./RenderTrailerCards";
import { MovieTrailer } from "../../Trailer/MovieTrailer";
import { IVideo } from "../../../types";

const tabs = [
  {
    id: 1,
    label: "In Theaters",
  },

  {
    id: 2,
    label: "Up Coming",
  },

  {
    id: 3,
    label: "On Air Tv",
  },
];

export const LatestTrailers = () => {
  const [activeTab, setActiveTab] = useState<TrailerTabs>(tabs[0]);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [activeTrailer, setActiveTrailer] = useState<IVideo | undefined>(
    undefined
  );
  function togglePlayer(trailer: IVideo) {
    setActiveTrailer(trailer);
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  function handleCloseClick(event: React.MouseEvent) {
    event.stopPropagation();
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  const { data, isLoading, error } = useMediaTrailers(activeTab);

  const filteredMedia = data?.filter(
    (item) => item.backdrop_path !== null && item.trailer !== undefined
  );
  return (
    <div className="bg-[#1b74d2] w-11/12 mx-auto pt-6 text-white">
      <TrailerTabs
        tabs={tabs}
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />
      <section className="overflow-x-auto flex  space-x-5 pt-6 pl-11">
        <RenderTrailerCards
          trailers={filteredMedia ?? []}
          activeTab={activeTab}
          togglePlayer={togglePlayer}
        />
      </section>

      {showPlayer && (
        <MovieTrailer
          handleCloseClick={handleCloseClick}
          showPlayer={showPlayer}
          trailer={activeTrailer}
        />
      )}
    </div>
  );
};
