import { Link } from "react-router-dom";
import { IMovie } from "../../types";

type MediaSearchCardProps = {
  media: IMovie[];
};

export function MediaSearchCard({ media }: MediaSearchCardProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <article className="pl-10 py-6 col-span-4 mr-14">
        {media &&
          media.map((item) => (
            <li className="shadow-lg rounded-lg flex gap-4 items-center mb-6">
              <Link to={""}>
                <figure className="h-[140px] w-[100px] min-w-[95px] overflow-hidden cursor-pointer">
                  <img
                    src={API_IMG + item.poster_path}
                    alt=""
                    className="rounded-tl-lg rounded-bl-lg overflow-hidden w-full h-full"
                  />
                </figure>
              </Link>

              <div>
                <div>
                  <Link to={""}>
                    <h2>{item.media_type === "tv" ? item.name : item.title}</h2>
                  </Link>

                  {(() => {
                    const dateValue = item.release_date || item.first_air_date;
                    if (dateValue) {
                      return (
                        <p className="text-[10px] text-gray-700 dark:text-gray-400 font-light">
                          {new Date(dateValue).toLocaleDateString()}
                        </p>
                      );
                    }
                  })()}
                </div>
                <p className="mt-4">
                  {item.overview ? (
                    item.overview
                  ) : (
                    <p>No translated overview for this {item.media_type}</p>
                  )}
                </p>
              </div>
            </li>
          ))}
      </article>
    </>
  );
}
