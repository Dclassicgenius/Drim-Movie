import { useState } from "react";
import { ICastMember, IMovieDetail } from "../../types";
import { useMovieData } from "../../hooks/useMovieData";

type CastProps = {
  movie: IMovieDetail | null;
  API_IMG: string;
};

export function Cast({ movie, API_IMG }: CastProps) {
  if (!movie) {
    return <div>Loading...</div>;
  }
  const { data, isLoading, error } = useMovieData(movie.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const casts: ICastMember[] = (data?.cast || []).filter(
    (cast) => cast.known_for_department === "Acting"
  );

  return (
    <>
      <section className=" pl-10 py-6 col-span-4">
        <h2 className="font-bold py-6 text-lg">Top Billed Cast</h2>

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
                  <p className="text-xs pl-3 pb-2">{cast.character}</p>
                </li>
              )
          )}
        </ol>

        <p className="font-bold pt-6 text-lg">
          <a href="#">Full Cast & Crew</a>
        </p>
      </section>
    </>
  );
}
