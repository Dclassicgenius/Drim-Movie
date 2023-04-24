import { FaListUl, FaPlay, FaStar, FaBookmark, FaHeart } from "react-icons/fa";
import { CircularProgressBar } from "../utility/CircularProgressBar";
import { useState } from "react";
import { MovieTrailer } from "../Trailer/MovieTrailer";
import { useMovieDetail } from "../../hooks/MovieHooks/useMovieDetail";
import { getMovieCertification } from "../utility/getMovieCertification";
import {
  IUniqueCrew,
  getUniqueImportantCrew,
} from "../utility/getUniqueImportantCrew";
import { IVideo } from "../Trailer/videoType";

type MovieMainProps = {
  movieId: number;
  API_IMG: string;
};

function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
}

export function MovieMainDetail({ movieId, API_IMG }: MovieMainProps) {
  const { data, isLoading, error } = useMovieDetail(movieId);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { hours, minutes } = convertMinutesToHoursAndMinutes(data.runtime);

  function togglePlayer() {
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  function handleCloseClick(event: React.MouseEvent) {
    event.stopPropagation();
    setShowPlayer((prevShowPlayer) => !prevShowPlayer);
  }

  const certification = getMovieCertification(data);
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
              {data.title || data.original_title}{" "}
              <span className="font-normal text-[#c0baba]">
                ({new Date(data.release_date).getFullYear()})
              </span>
            </h2>
            <div className="space-x-3 text-sm flex gap-2">
              <span className="border border-current p-0.5">
                {certification}
              </span>
              <span>
                {new Date(data.release_date).toLocaleDateString()} (US)
              </span>
              <ul className="list-disc flex gap-4 space-x-2">
                <li>{data.genres.map((genre) => genre.name).join(", ")} </li>
                <li>
                  {hours === 0 && minutes === 0
                    ? "No runtime value"
                    : hours === 0
                    ? `${minutes}m`
                    : `${hours}h ${minutes}m`}
                </li>
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
          </div>
          <p className="italic text-sm text-[#c0baba] ">{data.tagline}</p>
          <div className="py-6 ">
            <h3 className="font-bold text-lg">Overview</h3>
            <p className="text-sm mt-2 text-[#c0baba]">{data.overview}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {uniqueImportantCrew.map((crew) => (
              <ul className="list-none" key={crew.credit_id}>
                <li className="font-bold text-sm">{crew.name}</li>
                <li className="text-[#c0baba] text-xs">
                  {crew.jobs.join(", ")}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
