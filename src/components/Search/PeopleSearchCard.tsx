import { Link } from "react-router-dom";
import { Person } from "./SearchType/SearchType";
import malePlaceholder from "../../assets/defaultMale.svg";
import femalePlaceholder from "../../assets/defaultFemale.svg";
import classNames from "classnames";

type PeopleSearchCardProps = {
  persons: Person[] | undefined;
};

export function PeopleSearchCard({ persons }: PeopleSearchCardProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <article className="sm:pl-10 sm:col-span-4 sm:mr-14 pt-6 p-3">
        <ol className="grid gap-4">
          {persons &&
            persons.map((person) => (
              <li
                className="rounded-lg overflow-hidden list-none flex gap-3 items-center"
                key={person.id}
              >
                <Link to={`/people/${person.id}`}>
                  <figure
                    className={classNames("w-[75px] h-[100px] min-w-[75px]")}
                  >
                    <img
                      src={
                        person.profile_path
                          ? API_IMG + person.profile_path
                          : person.gender === 1
                          ? femalePlaceholder
                          : malePlaceholder
                      }
                      alt=""
                      className="w-full h-full  rounded-md overflow-hidden object-cover"
                    />
                  </figure>
                </Link>

                <div>
                  <Link to={`/people/${person.id}`}>
                    <h2 className="font-bold text-sm">{person.name}</h2>
                  </Link>
                  <div className="flex gap-4">
                    <p className="text-xs pr-1">
                      {person.known_for_department}
                    </p>
                    <ul className="list-disc">
                      <li className="text-xs">
                        {person.known_for
                          .sort((a, b) => b.popularity - a.popularity)
                          .slice(0, 3)
                          .map((media, index, arr) => (
                            <span key={media.id}>
                              <Link
                                to={
                                  media.media_type === "tv"
                                    ? `/tv/${media.id}`
                                    : `/movie/${media.id}`
                                }
                              >
                                {media.media_type === "tv"
                                  ? media.name
                                  : media.title}
                              </Link>
                              {index < arr.length - 1 && ", "}
                            </span>
                          ))}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </article>
    </>
  );
}
