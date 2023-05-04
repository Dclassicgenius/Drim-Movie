import { Link } from "react-router-dom";
import { Person } from "./SearchType/SearchType";

type PeopleSearchCardProps = {
  persons: Person[];
};

export function PeopleSearchCard({ persons }: PeopleSearchCardProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <article className="pl-10 py-6 col-span-4">
        {persons &&
          persons.map((person) => (
            <li
              className="shadow-md rounded-lg overflow-hidden min-w-[140px] w-[140px]"
              key={person.id}
            >
              <Link to={`/people/${person.id}`}>
                <figure>
                  <img
                    src={API_IMG + person.profile_path}
                    alt=""
                    className="w-full h-full"
                  />
                </figure>
              </Link>

              <div>
                <Link to={`/people/${person.id}`}>
                  <h2 className="font-bold text-sm pl-3 pt-3">{person.name}</h2>
                </Link>
                <div className="flex gap-2">
                  <p className="text-xs pl-3 pb-2">
                    {person.known_for_department}
                  </p>
                  <ul className="list-disc">
                    <li className="text-xs pl-3 pb-2">
                      {person.known_for
                        .sort((a, b) => b.popularity - a.popularity)
                        .slice(0, 2)
                        .map((media) => (
                          <Link to={""}>
                            {media.media_type === "tv"
                              ? media.name
                              : media.title}
                          </Link>
                        ))
                        .join(", ")}{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
      </article>
    </>
  );
}
