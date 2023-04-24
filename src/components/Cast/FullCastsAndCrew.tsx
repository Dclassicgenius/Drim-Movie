import { FaArrowLeft } from "react-icons/fa";
import { useMovieDetail } from "../../hooks/MovieHooks/useMovieDetail";
import { ICast, ICrew } from "./castType";
import { useParams } from "react-router-dom";
import malePlaceholder from "../../assets/defaultMale.svg";
import femalePlaceholder from "../../assets/defaultFemale.svg";

interface GroupedCrew {
  [department: string]: ICrew[];
}

export function FullCastsAndCrew() {
  const { id } = useParams<{ id?: string }>();

  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const movieId = parseInt(id ?? "0");
  const { data, isLoading, error } = useMovieDetail(movieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const casts: ICast[] = data?.credits.cast || [];
  const crew: ICrew[] = data?.credits.crew || [];

  const groupedCrew = crew.reduce<GroupedCrew>((acc, crewMember) => {
    const department = crewMember.known_for_department;
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(crewMember);
    return acc;
  }, {});

  const sortedDepartments = Object.keys(groupedCrew).sort((a, b) =>
    a.localeCompare(b)
  );
  return (
    <>
      <section className="pb-10">
        <div className="bg-slate-800">
          <div className="pl-20 text-white flex gap-8 items-center justify-start py-6">
            <figure className="w-[60px] h-[90px]">
              <img
                src={API_IMG + data.poster_path}
                alt=""
                className="w-full h-full rounded-md overflow-clip object-cover"
              />
            </figure>
            <div>
              <h1 className="font-bold text-3xl">
                {data?.original_title}{" "}
                <span className="text-[#c0baba] font-normal">
                  ({new Date(data.release_date).getFullYear()})
                </span>
              </h1>
              <p className="text-[#c0baba] flex gap-2 mt-2 items-center">
                <FaArrowLeft /> Back to main
              </p>
            </div>
          </div>
        </div>
        <div className="pl-20 pt-10 grid grid-cols-2">
          <article>
            <h2 className="font-bold text-xl pb-7">
              Cast{" "}
              <span className="text-[#c0baba] font-normal">{casts.length}</span>
            </h2>
            <ol className="grid gap-4">
              {casts.map((cast) => (
                <li
                  className=" flex justify-start items-center gap-6"
                  key={cast.id}
                >
                  <figure className="w-[75px] h-[100px]">
                    <img
                      src={
                        cast.profile_path
                          ? API_IMG + cast.profile_path
                          : cast.gender === 2
                          ? malePlaceholder
                          : femalePlaceholder
                      }
                      alt=""
                      className="w-full h-full  rounded-md overflow-hidden object-cover"
                    />
                  </figure>
                  <div>
                    <p className="font-bold">{cast.original_name}</p>
                    <p className="text text-sm pb-4">{cast.character}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
          <article>
            <h2 className="font-bold text-xl pb-7">
              Crew{" "}
              <span className="text-[#c0baba] font-normal">{crew.length}</span>
            </h2>

            {sortedDepartments.map((department) => (
              <div key={department}>
                <h3 className="font-bold text-base pb-5">{department}</h3>

                <ol className="grid gap-8">
                  {groupedCrew[department].map((crewMember) => (
                    <li
                      className=" flex justify-start items-center gap-8"
                      key={crewMember.id}
                    >
                      <figure className="w-[75px] h-[100px]">
                        <img
                          src={
                            crewMember.profile_path
                              ? API_IMG + crewMember.profile_path
                              : crewMember.gender === 2
                              ? malePlaceholder
                              : femalePlaceholder
                          }
                          alt=""
                          className="w-full h-full  rounded-md object-cover"
                        />
                      </figure>
                      <div>
                        <p className="font-bold">
                          {crewMember.name || crewMember.original_name}
                        </p>
                        <p className="text text-sm">{crewMember.job}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
