import { FaListUl, FaPlay, FaStar, FaBookmark, FaHeart } from "react-icons/fa";
import { CircularProgressBar } from "../utility/CircularProgressBar";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import { MovieTrailer } from "../Trailer/MovieTrailer";
import { getCertification } from "../utility/getMovieCertification";
import {
  IUniqueCrew,
  getUniqueImportantCrew,
} from "../utility/getUniqueImportantCrew";
import { IVideo } from "../Trailer/videoType";

type DetailMainProps = {
  id: number;
  API_IMG: string;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
  // detailPath: (id: number) => string;
};

function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
}

export function DetailMain({
  id,
  API_IMG,
  useDetail,
  detailType,
}: // detailPath,
DetailMainProps) {
  const { data, isLoading, error } = useDetail(id);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { hours, minutes } = convertMinutesToHoursAndMinutes(
    detailType === "movie" ? data.runtime : data.episode_run_time[0] || 0
  );

  const title =
    detailType === "movie" ? data.title || data.original_title : data.name;
  const releaseDate =
    detailType === "movie" ? data.release_date : data.first_air_date;

  function togglePlayer() {
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  function handleCloseClick(event: React.MouseEvent) {
    event.stopPropagation();
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  const certification = getCertification(data, detailType);
  const uniqueImportantCrew: IUniqueCrew[] = getUniqueImportantCrew(
    data.credits
  );

  let trailer: IVideo | undefined;

  if (data) {
    const videos: IVideo[] = data.videos.results || [];

    trailer = videos.find(
      (video) =>
        video.type === "Trailer" ||
        video.type === "Teaser" ||
        (video.type === "Clip" && video.site === "YouTube")
    );
  }

  return (
    <>
      <section
        className="grid grid-cols-4 gap-8 pt-10 px-10 pb-8 bg-cover "
        style={{
          backgroundImage: `linear-gradient( to bottom right, rgba(3,37,65, 1) , rgba(3,37,65, 0.8) ), url(${
            API_IMG + data.backdrop_path
          })`,
        }}
      >
        <figure className="col-span-1 z-10">
          <img src={API_IMG + data.poster_path} alt="" className="rounded-lg" />
        </figure>

        <div className="col-span-3 text-white z-10 flex flex-col justify-center">
          <div className="text-[#c0baba]">
            <h2 className="font-bold text-2xl text-white">
              {title}{" "}
              <span className="font-normal text-[#c0baba]">
                ({new Date(releaseDate).getFullYear()})
              </span>
            </h2>
            <div className="space-x-3 text-sm flex gap-2">
              {certification !== "Not available" && (
                <span className="border border-current p-0.5 mr-3">
                  {certification}
                </span>
              )}
              {detailType === "movie" && (
                <span>{new Date(releaseDate).toLocaleDateString()} (US)</span>
              )}

              <ul className="list-disc flex gap-4 space-x-3">
                <li>
                  {data.genres
                    .map((genre: { name: any }) => genre.name)
                    .join(", ")}{" "}
                </li>

                {(() => {
                  if (hours === 0 && minutes === 0) {
                    return null;
                  }

                  const timeString =
                    hours === 0
                      ? `${minutes}m`
                      : minutes === 0
                      ? `${hours}h`
                      : `${hours}h ${minutes}m`;

                  return <li>{timeString}</li>;
                })()}
              </ul>
            </div>
          </div>
          <div className="flex gap-8 py-6 items-center font-bold text-base">
            <p>
              <CircularProgressBar score={data.vote_average} /> User Score
            </p>
            <a
              href="#"
              className="bg-[#032541] rounded-full p-4 text-white text-xs"
            >
              <FaListUl />
            </a>
            <a
              href="#"
              className="bg-[#032541] rounded-full p-4 text-white text-xs"
            >
              <FaHeart />
            </a>
            <a
              href="#"
              className="bg-[#032541] rounded-full p-4 text-white text-xs"
            >
              <FaBookmark />
            </a>
            <a
              href="#"
              className="bg-[#032541] rounded-full p-4 text-white text-xs"
            >
              <FaStar />
            </a>

            {trailer && (
              <p
                className="flex gap-4 items-center cursor-pointer"
                onClick={togglePlayer}
              >
                <FaPlay
                  style={{
                    color: "white",
                  }}
                />{" "}
                Play {trailer?.type}
                <MovieTrailer
                  trailer={trailer}
                  handleCloseClick={handleCloseClick}
                  showPlayer={showPlayer}
                />
              </p>
            )}
          </div>
          <p className="italic text-sm text-[#c0baba] ">{data.tagline}</p>
          <div className="py-6 ">
            <h3 className="font-bold text-lg">Overview</h3>
            <p className="text-sm mt-2 text-[#c0baba]">{data.overview}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {detailType === "movie" &&
              uniqueImportantCrew.map((crew) => (
                <ul className="list-none" key={crew.credit_id}>
                  <li className="font-bold text-sm">{crew.name}</li>
                  <li className="text-[#c0baba] text-xs">
                    {crew.jobs.join(", ")}
                  </li>
                </ul>
              ))}

            {detailType === "tv" &&
              data.created_by.map(
                (creator: {
                  credit_id: Key | null | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <ul className="list-none" key={creator.credit_id}>
                    <li className="font-bold text-sm">{creator.name}</li>
                    <li className="text-[#c0baba] text-xs">Creator</li>
                  </ul>
                )
              )}
          </div>
        </div>
      </section>
    </>
  );
}
