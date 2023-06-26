import { useCastProfile } from "../../hooks/People/useCastProfile";
import { CreditList } from "./CreditList";
import { Crew } from "./PeopleType";
import { Link } from "react-router-dom";
type CreditProps = {
  id: number;
};

interface GroupedCrew {
  [department: string]: Crew[];
}

export function Credits({ id }: CreditProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const { data, isLoading, error } = useCastProfile(id);

  if (!data) return null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const groupedCrew = data.combined_credits.crew.reduce<GroupedCrew>(
    (acc, crewMember) => {
      const department = crewMember.department;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(crewMember);
      return acc;
    },
    {}
  );

  const sortedDepartments = Object.keys(groupedCrew).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <section className="space-y-3 sm:space-y-5 p-4 sm:pt-10 sm:col-span-6 w-11/12 ">
      <h1 className="text-3xl font-bold pb-4 sm:pb-7">{data.name}</h1>
      <h2 className="font-bold text-lg">Biography</h2>
      {data.biography ? (
        <p className="text-sm whitespace-pre-wrap leading-relaxed text-justify">
          {data.biography}
        </p>
      ) : (
        <p>We don't have a biography for {data.name}.</p>
      )}

      <h3 className="font-bold pt-4">Known For</h3>
      <div className="overflow-x-auto flex space-x-3  sm:space-x-5">
        {data.combined_credits &&
          data.combined_credits.cast
            .filter(
              (credit) =>
                credit.poster_path &&
                (credit.media_type === "movie" ||
                  (credit.media_type === "tv" && credit.episode_count > 5))
            )
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 20)
            .map((credit) => (
              <div className=" text-center text-sm pb-3" key={credit.id}>
                <Link to={`/${credit.media_type}/${credit.id}`}>
                  <figure className="w-[130px] rounded-lg overflow-hidden">
                    <img src={API_IMG + credit.poster_path} alt="" />
                  </figure>
                  <p className="pt-2 hover:text-blue-400 cursor-pointer">
                    {credit.media_type === "movie" ? credit.title : credit.name}
                  </p>
                </Link>
              </div>
            ))}
      </div>
      <div className="">
        <h3 className="font-bold py-3">Acting</h3>
        <hr />
        <div className="shadow-md">
          {data.combined_credits && (
            <CreditList credit={data.combined_credits.cast} />
          )}
          <hr />
        </div>
        <hr />
      </div>

      <div>
        {sortedDepartments.map((department) => (
          <>
            <h3 className="font-bold mb-6 mt-10 text-lg" key={department}>
              {department}
            </h3>
            <hr />
            <div className="shadow-md">
              {data.combined_credits && (
                <CreditList credit={data.combined_credits.crew} />
              )}
              <hr />
            </div>
          </>
        ))}
      </div>
      <hr />
    </section>
  );
}
