import { Link } from "react-router-dom";
import { useMovieDetail } from "../../hooks/MovieHooks/useMovieDetail";
import { ICast } from "./castType";

type CastProps = {
  id: number;
  API_IMG: string;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

export function Cast({ id, API_IMG, useDetail, detailType }: CastProps) {
  const { data, isLoading, error } = useDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const casts: ICast[] = (
    detailType === "movie"
      ? data?.credits.cast || []
      : data.aggregate_credits.cast || []
  ).filter(
    (cast: { known_for_department: string }) =>
      cast.known_for_department === "Acting"
  );

  return (
    <>
      <section className=" pl-10 py-6 col-span-4">
        <h2 className="font-bold py-6 text-lg">
          {detailType === "movie" ? "Top Billed Cast" : "Series Cast"}
        </h2>

        <ol className="flex gap-4 overflow-x-scroll overflow-y-hidden list-none list-inside pb-6">
          {casts.map(
            (cast) =>
              cast.profile_path && (
                <li
                  className="shadow-md rounded-lg overflow-hidden min-w-[140px] w-[140px]"
                  key={cast.id}
                >
                  <figure className="">
                    <a href="#">
                      <img
                        src={API_IMG + cast.profile_path}
                        alt=""
                        className="w-full h-full"
                      />
                    </a>
                  </figure>
                  <p className="font-bold text-sm pl-3 pt-3">
                    {cast.original_name}
                  </p>
                  <p className="text-xs pl-3 pb-2">
                    {detailType === "tv"
                      ? cast.roles?.map((role) => role.character).join(", ")
                      : cast.character}
                  </p>
                  {detailType === "tv" && (
                    <p className="text-xs pl-3 pb-2 text-[#c0baba] ">
                      {cast.total_episode_count} Episodes
                    </p>
                  )}
                </li>
              )
          )}
        </ol>

        <Link
          to={`/${detailType}/${id}/cast`}
          className="font-bold pt-6 text-lg"
        >
          Full Cast & Crew
        </Link>
      </section>
    </>
  );
}
