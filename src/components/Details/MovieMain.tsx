import { FaListUl, FaPlay, FaStar, FaBookmark, FaHeart } from "react-icons/fa";
import { IMovieDetail, ICrewMember } from "../../types";
import { useMovieData } from "../../hooks/useMovieData";
import { CircularProgressBar } from "../utility/CircularProgressBar";
type MovieMainProps = {
  movie: IMovieDetail | null;
  API_IMG: string;
};

interface IUniqueCrew extends ICrewMember {
  jobs: string[];
}

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
    "Story",
  ];

  const importantCrew: ICrewMember[] = (data?.crew || []).filter(
    (person: ICrewMember) => importantJobs.includes(person.job)
  );

  const availableCertification = data?.releases?.countries.find(
    (country) => country.certification !== ""
  );

  const usCertification = data?.releases?.countries.find(
    (country) => country.iso_3166_1 === "US"
  )?.certification;

  const certification =
    usCertification || availableCertification?.certification || "Not available";

  const uniqueImportantCrew = importantCrew.reduce<IUniqueCrew[]>(
    (acc, crew) => {
      const existingCrew = acc.find((item) => item.name === crew.name);
      if (existingCrew) {
        existingCrew.jobs.push(crew.job);
      } else {
        acc.push({ ...crew, jobs: [crew.job] });
      }
      return acc;
    },
    []
  );

  return (
    <>
      <section
        className="grid grid-cols-4 gap-8 pt-10 px-10 pb-8 bg-cover "
        style={{
          backgroundImage: `linear-gradient( to bottom right, rgba(3,37,65, 1) , rgba(3,37,65, 0.8) ), url(${
            API_IMG + movie.backdrop_path
          })`,
        }}
      >
        <figure className="col-span-1 z-10">
          <img
            src={API_IMG + movie.poster_path}
            alt=""
            className="rounded-lg"
          />
        </figure>

        <div className="col-span-3 text-white z-10 flex flex-col justify-center">
          <div className="text-[#c0baba]">
            <h2 className="font-bold text-2xl text-white">
              {movie.original_title}{" "}
              <span className="font-normal text-[#c0baba]">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            </h2>
            <div className="space-x-3 text-sm flex gap-2">
              <span className="border border-current p-0.5">
                {certification}
              </span>
              <span>
                {new Date(movie.release_date).toLocaleDateString()} (US)
              </span>
              <ul className="list-disc flex gap-4 space-x-2">
                <li>{movie.genres.map((genre) => genre.name).join(", ")} </li>
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
              <CircularProgressBar score={movie.vote_average} /> User Score
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

            <a href="#" className="flex gap-4 items-center ">
              <FaPlay
                style={{
                  color: "white",
                }}
              />{" "}
              Play Trailer
            </a>
          </div>
          <p className="italic text-sm text-[#c0baba] ">{movie.tagline}</p>
          <div className="py-6 ">
            <h3 className="font-bold text-lg">Overview</h3>
            <p className="text-sm mt-2 text-[#c0baba]">{movie.overview}</p>
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
