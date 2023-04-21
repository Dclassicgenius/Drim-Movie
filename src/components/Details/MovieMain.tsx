import { FaListUl, FaPlay, FaStar, FaBookmark, FaHeart } from "react-icons/fa";
import { IMovieDetail, ICrewMember } from "../../types";
import { useMovieData } from "../../hooks/useMovieData";
type MovieMainProps = {
  movie: IMovieDetail | null;
  API_IMG: string;
};

function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

export function MovieMain({ movie, API_IMG }: MovieMainProps) {
  if (!movie) {
    return <div>Loading...</div>;
  }

  const { data, isLoading, error } = useMovieData(movie.id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const { hours, minutes } = convertMinutesToHoursAndMinutes(movie.runtime);

  const importantJobs = [
    "Director",
    "Screenplay",
    "Writer",
    "Characters",
    "Novel",
    "Creator",
  ];

  const importantCrew: ICrewMember[] = (data?.crew || []).filter(
    (person: ICrewMember) => importantJobs.includes(person.job)
  );

  return (
    <>
      <section
        className="grid grid-cols-4 gap-8 pt-10 px-10 pb-8 bg-cover "
        style={{
          backgroundImage: `url(${API_IMG + movie.backdrop_path})`,
          position: "relative",
        }}
      >
        <div
          className="overlay"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(31.5, 10.5, 10.5, 1), rgba(31.5, 10.5, 10.5, 0.84))",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        ></div>
        <figure className="col-span-1 z-10">
          <img
            src={API_IMG + movie.poster_path}
            alt=""
            className="rounded-lg"
          />
        </figure>

        <div className="col-span-3 text-white z-10 pt-8 pb-14">
          <div className="text-[#c0baba]">
            <h2 className="font-bold text-2xl text-white">
              {movie.original_title}{" "}
              <span className="font-normal text-[#c0baba]">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            </h2>
            <div className="space-x-3 text-sm flex gap-2">
              <span className="border border-current p-0.5">PG-13</span>
              <span>
                {new Date(movie.release_date).toLocaleDateString()} (US)
              </span>
              <ul className="list-disc flex gap-4 space-x-2">
                <li>Action, Comedy, Fantasy</li>
                <li>
                  {hours}h {minutes}m
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-8 py-6 items-center">
            <p>{movie.vote_average.toFixed(1)} User score</p>
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

            <a href="#" className="flex gap-4 items-center ">
              <FaPlay
                style={{
                  color: "white",
                }}
              />{" "}
              Play Trailer
            </a>
          </div>
          <p className="italic text-sm text-[#c0baba]">{movie.tagline}</p>
          <div className="py-6 ">
            <h3 className="font-bold text-lg">Overview</h3>
            <p className="text-sm mt-2 text-[#c0baba]">{movie.overview}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {importantCrew.map((crew) => (
              <ul className="list-none" key={crew.credit_id}>
                <li className="font-bold text-sm">{crew.name}</li>
                <li className="text-[#c0baba] text-xs">{crew.job}</li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
