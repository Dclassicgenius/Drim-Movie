import { useEffect, useRef } from "react";
import { ICast, ICrew } from "./castType";
import malePlaceholder from "../../assets/defaultMale.svg";
import femalePlaceholder from "../../assets/defaultFemale.svg";
import { PageHeader } from "../Layout/PageHeader";
import { Link } from "react-router-dom";

interface GroupedCrew {
  [department: string]: ICrew[];
}

export type FullCastsAndCrewProps = {
  id: number;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

export function FullCastsAndCrew({
  id,
  useDetail,
  detailType,
}: FullCastsAndCrewProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const { data, isLoading, error } = useDetail(id);
  const topAnchor = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (topAnchor.current) {
      topAnchor.current.focus();
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const casts: ICast[] =
    detailType === "movie"
      ? data?.credits.cast || []
      : data?.aggregate_credits.cast || [];
  const crew: ICrew[] =
    detailType === "movie"
      ? data?.credits.crew || []
      : data?.aggregate_credits.crew || [];

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
        <a ref={topAnchor} tabIndex={-1} />
        <PageHeader useDetail={useDetail} detailType={detailType} />
        <div className="px-5 sm:px-20 pt-10 grid sm:grid-cols-2 gap-8">
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
                  <Link to={`/people/${cast.id}`}>
                    <figure className="w-[75px] h-[100px] min-w-[75px]">
                      <img
                        src={
                          cast.profile_path
                            ? API_IMG + cast.profile_path
                            : cast.gender === 1
                            ? femalePlaceholder
                            : malePlaceholder
                        }
                        alt=""
                        className="w-full h-full  rounded-md overflow-hidden object-cover"
                      />
                    </figure>
                  </Link>

                  <div>
                    <Link to={`/people/${cast.id}`}>
                      <p className="font-bold">{cast.original_name}</p>
                    </Link>

                    <p className="text text-sm pb-4">
                      {detailType === "tv"
                        ? cast.roles?.map((role) => role.character).join(", ")
                        : cast.character}{" "}
                      {detailType === "tv" && (
                        <span className="text-xs pl-1 pb-2 text-[#c0baba] ">
                          ({cast.total_episode_count} Episodes)
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
          <article>
            <h2 className="font-bold text-xl sm:pb-7">
              Crew{" "}
              <span className="text-[#c0baba] font-normal">{crew.length}</span>
            </h2>

            {sortedDepartments.map((department) => (
              <div key={department}>
                <h3 className="font-bold text-base py-5">{department}</h3>

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
                        <p className="text text-sm pb-4">
                          {detailType === "tv"
                            ? crewMember.jobs?.map((job) => job.job).join(", ")
                            : crewMember.job}{" "}
                          {detailType === "tv" && (
                            <span className="text-xs pl-1 pb-2 text-[#c0baba] ">
                              ({crewMember.total_episode_count} Episodes)
                            </span>
                          )}
                        </p>
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
