import { IMovie, IVideo } from "./types";
import YouTube from "react-youtube";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface TrailerProps {
  trailers: IMovie[];
  videos: IVideo[][];
  API_IMG: string;
  handleTrailerClick: (id: number) => void;
  selectedVideoKey: string;
  handleCloseClick: () => void;
  showPlayer: boolean;
}

export function Trailer({
  trailers,
  API_IMG,
  handleTrailerClick,
  selectedVideoKey,
  handleCloseClick,
  showPlayer,
}: TrailerProps) {
  const filteredTrailers = trailers?.filter(
    (trailer) => trailer.backdrop_path !== null
  );

  const renderTrailerCards = () => {
    if (!filteredTrailers || filteredTrailers.length === 0) {
      return <p className="text-white">No trailers available.</p>;
    }

    return filteredTrailers.map((trailer) => (
      <div
        className="relative rounded-lg mb-4 bg-white dark:bg-gray-800"
        key={trailer.id}
      >
        <img
          className="cursor-pointer max-h[200px] min-w-[350px] sm:max-h[200px] object-contain transform[450ms] rounded-lg"
          src={API_IMG + trailer.backdrop_path}
          alt={trailer.title || trailer.name}
          onClick={() => {
            handleTrailerClick(trailer.id);
          }}
        />
        <div className="absolute top-0 right-0 m-2 bg-red-600 text-white rounded-full p-1 text-xs">
          {trailer.vote_average.toFixed(1)}
        </div>
        <div className="py-4 px-1">
          <h5 className="text-xs font-bold tracking-tight text-gray-900 dark:text-white">
            {trailer.title || trailer.name}
          </h5>
          <p className="font-normal text-sm pt-2 text-gray-700 dark:text-gray-400">
            {new Date(
              trailer.release_date || trailer.first_air_date
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    ));
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  return (
    <>
      <section className="overflow-x-auto flex w-11/12 mx-auto pt-6 space-x-5">
        {Array.isArray(trailers) && renderTrailerCards()}
      </section>
      {showPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl p-4 mx-4 my-8 bg-white rounded shadow-lg">
            {selectedVideoKey !== "" && (
              <YouTube
                className="rounded"
                videoId={selectedVideoKey}
                opts={opts}
              />
            )}
            <button
              className="absolute top-2 right-2 p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={handleCloseClick}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
