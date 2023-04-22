import { FaArrowLeft } from "react-icons/fa";
import { useMovieData } from "../../hooks/useMovieData";
import { useParams } from "react-router-dom";
import { ICrewMember } from "../../types";

const API_IMG = "https://image.tmdb.org/t/p/w500";

export function FullCastsAndCrew() {
  const { id } = useParams<{ id?: string }>();

  const { data } = useMovieData(parseInt(id ?? "0"));

  // const casts: ICrewMember[] = data?.cast || []
  // const movie = data?

  //   const groupedCrew = data?.crew.reduce((acc, crewMember) => {
  //     const department: string = crewMember.known_for_department;
  //     if (!acc[department]) {
  //       acc[department] = [];
  //     }
  //     acc[department].push(crewMember);
  //     return acc;
  //   }, {});
  //

  // import React from 'react';

  // interface CrewMember {
  //   adult: boolean;
  //   gender: number;
  //   id: number;
  //   known_for_department: string;
  //   name: string;
  //   original_name: string;
  //   popularity: number;
  //   profile_path: string;
  //   credit_id: string;
  //   department: string;
  //   job: string;
  // }

  // interface GroupedCrew {
  //   [department: string]: CrewMember[];
  // }

  // const CrewList: React.FC<{ crewData: CrewMember[] }> = ({ crewData }) => {
  //   // Group the crew members by their known_for_department
  //   const groupedCrew = crewData.reduce<GroupedCrew>((acc, crewMember) => {
  //     const department = crewMember.known_for_department;
  //     if (!acc[department]) {
  //       acc[department] = [];
  //     }
  //     acc[department].push(crewMember);
  //     return acc;
  //   }, {});

  // ...rest of the component
  // };

  // export default CrewList;

  // Sort the department names alphabetically
  //   const sortedDepartments = Object.keys(groupedCrew).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <section className="pb-10">
        <div className="bg-slate-800">
          <div className="pl-20 text-white flex gap-8 items-center justify-start py-6">
            <figure className="w-[60px] h-[90px]">
              <img
                src="https://www.themoviedb.org/t/p/w116_and_h174_face/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
                alt=""
                className="w-full rounded-md"
              />
            </figure>
            <div>
              <h1 className="font-bold text-3xl">
                {data?.original_title}{" "}
                <span className="text-[#c0baba] font-normal">
                  ({data?.release_date})
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
              <span className="text-[#c0baba] font-normal">
                {data?.cast.length}
              </span>
            </h2>
            <ol className="grid gap-4">
              {data?.cast.map((cast) => (
                <li
                  className=" flex justify-start items-center gap-6"
                  key={cast.id}
                >
                  <figure className="w-[80px] h-[120px]">
                    <img
                      src={API_IMG + cast.profile_path}
                      alt=""
                      className="w-full h-full  rounded-md overflow-hidden"
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
              <span className="text-[#c0baba] font-normal">
                {data?.crew.length}
              </span>
            </h2>
            <ol>
              <h3 className="font-bold text-base pb-5">Art</h3>
              <li className=" flex justify-start items-center gap-6">
                <figure className="w-[70px] h-[70px]">
                  <img
                    src="https://www.themoviedb.org/t/p/w132_and_h132_face/mflBcox36s9ZPbsZPVOuhf6axaJ.jpg"
                    alt=""
                    className="w-full rounded-md"
                  />
                </figure>
                <div>
                  <p className="font-bold">Sam Worthington</p>
                  <p className="text text-sm">Jake Sully</p>
                </div>
              </li>
            </ol>
          </article>
        </div>
      </section>
    </>
  );
}
