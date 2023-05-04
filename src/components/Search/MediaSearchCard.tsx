import { Link } from "react-router-dom";
import { IMovie } from "../../types";

type MediaSearchCardProps = {
  media: IMovie[];
};

export function MediaSearchCard({ media }: MediaSearchCardProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      {/* {media &&
        media.map((item) => (
          
        ))} */}
      {
        <article className="pl-10 py-6 col-span-4">
          {media &&
            media.map((item) => (
              <li className="shadow-lg pb-5">
                <Link to={""}>
                  <figure>
                    <img
                      src={API_IMG + item.poster_path}
                      alt=""
                      className="rounded-tl-lg rounded-bl-lg overflow-hidden"
                    />
                  </figure>
                </Link>

                <div>
                  <div>
                    <Link to={""}>
                      <h2>
                        {item.media_type === "tv" ? item.name : item.title}
                      </h2>
                    </Link>

                    {(() => {
                      const dateValue =
                        item.release_date || item.first_air_date;
                      if (dateValue) {
                        return (
                          <p className="text-[10px] pt-2 text-gray-700 dark:text-gray-400 font-light">
                            {new Date(dateValue).toLocaleDateString()}
                          </p>
                        );
                      }
                    })()}
                  </div>
                  <p>
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
      }
    </>
  );
}
