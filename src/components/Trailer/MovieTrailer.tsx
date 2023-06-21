import YouTube from "react-youtube";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { IVideo } from "../../types";

interface TrailerProps {
  handleCloseClick: (event: React.MouseEvent) => void;
  showPlayer: boolean;
  trailer: IVideo | undefined;
}

export function MovieTrailer({
  showPlayer,
  handleCloseClick,
  trailer,
}: TrailerProps) {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  return (
    <div>
      {showPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl p-4 mx-4 my-8 bg-white rounded shadow-lg">
            <div
              className="relative"
              style={{
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
              }}
            >
              {trailer?.key !== "" && (
                <YouTube
                  className="absolute top-0 left-0 w-full h-full"
                  videoId={trailer?.key}
                  opts={opts}
                />
              )}
            </div>
            <button
              className="absolute top-2 right-2 p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={handleCloseClick}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
