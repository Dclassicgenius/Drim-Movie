import { FaListUl, FaPlay, FaStar, FaBookmark, FaHeart } from "react-icons/fa";
import { CircularProgressBar } from "../utility/CircularProgressBar";
import { useState } from "react";
import { MovieTrailer } from "../Trailer/MovieTrailer";
import { Link } from "react-router-dom";
import { CreatedBy } from "./TvDetails/TvDetailsType";
import { processMedia } from "../utility/processMedia";

type DetailMainProps = {
  id: number;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

export function DetailMain({ id, useDetail, detailType }: DetailMainProps) {
  const { data, isLoading, error } = useDetail(id);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function togglePlayer() {
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  function handleCloseClick(event: React.MouseEvent) {
    event.stopPropagation();
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  const result = processMedia(data, detailType);

  return (
    <>
      <section
        className="sm:grid sm:grid-cols-4 gap-8 pt-10 px-5 sm:px-10 pb-8 bg-cover items-center"
        style={{
          backgroundImage: `linear-gradient( to bottom right, rgba(3,37,65, 1) , rgba(3,37,65, 0.8) ), url(${
            API_IMG + data.backdrop_path
          })`,
        }}
      >
        <figure className="sm:col-span-1 pb-5 sm:pb-0 z-10">
          <img src={API_IMG + data.poster_path} alt="" className="rounded-lg" />
        </figure>

        <div className="sm:col-span-3 text-white z-10 flex flex-col justify-center">
          <div className="text-[#c0baba]">
            <h2 className="font-bold sm:text-2xl text-lg text-white pb-5 sm:pb-0">
              {result.title}{" "}
              {result.releaseDate && (
                <span className=" font-extralight sm:font-normal text-[#c0baba]">
                  ({new Date(result.releaseDate).getFullYear()})
                </span>
              )}
            </h2>
            <div className="space-x-3 text-xs sm:text-sm flex sm:gap-2">
              {result.certification !== "Not available" && (
                <span className="border border-current p-0.5 mr-3 flex items-center">
                  {result.certification}
                </span>
              )}
              {detailType === "movie" && (
                <span>
                  {new Date(result.releaseDate).toLocaleDateString()} (US)
                </span>
              )}

              <ul className="list-disc flex gap-4 space-x-3">
                <li>
                  {data.genres
                    .map((genre: { name: any }) => genre.name)
                    .join(", ")}{" "}
                </li>

                {(() => {
                  if (result.hours === 0 && result.minutes === 0) {
                    return null;
                  }

                  const timeString =
                    result.hours === 0
                      ? `${result.minutes}m`
                      : result.minutes === 0
                      ? `${result.hours}h`
                      : `${result.hours}h ${result.minutes}m`;

                  return <li>{timeString}</li>;
                })()}
              </ul>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-8 py-6 items-center font-bold text-xs sm:text-base ">
            <p className="flex items-center gap-2">
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

            {result.trailer && (
              <p
                className="flex gap-4 items-center cursor-pointer"
                onClick={togglePlayer}
              >
                <FaPlay
                  style={{
                    color: "white",
                  }}
                />{" "}
                Play {result.trailer?.type}
                <MovieTrailer
                  trailer={result.trailer}
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
              result.uniqueImportantCrew.map((crew) => (
                <ul className="list-none" key={crew.credit_id}>
                  <Link to={`/people/${crew.id}`}>
                    <li className="font-bold text-sm cursor-pointer">
                      {crew.name}
                    </li>
                  </Link>
                  <li className="text-[#c0baba] text-xs">
                    {crew.jobs.map((job) => job.job).join(", ")}
                  </li>
                </ul>
              ))}

            {detailType === "tv" &&
              data.created_by.map((creator: CreatedBy) => (
                <ul className="list-none" key={creator.credit_id}>
                  <Link to={`/people/${creator.id}`}>
                    <li className="font-bold text-sm cursor-pointer">
                      {creator.name}
                    </li>
                  </Link>
                  <li className="text-[#c0baba] text-xs">Creator</li>
                </ul>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
