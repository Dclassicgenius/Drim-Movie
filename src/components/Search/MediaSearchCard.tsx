import { Link } from "react-router-dom";
import { IMovie } from "../../types";
import placeholderImage from "../../assets/placeholderImage.png";

type MediaSearchCardProps = {
  media: IMovie[] | undefined;
};

export function MediaSearchCard({ media }: MediaSearchCardProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <article className="pl-10 col-span-4 mr-14">
        {media &&
          media.map((item) => (
            <li className="shadow-lg rounded-lg flex gap-4 items-center mb-6">
              <Link
                to={
                  item.media_type === "tv"
                    ? `/tv/${item.id}`
                    : `/movie/${item.id}`
                }
              >
                <figure className="h-[140px] w-[100px] min-w-[95px] overflow-hidden cursor-pointer">
                  <img
                    src={
                      item.poster_path
                        ? API_IMG + item.poster_path
                        : placeholderImage
                    }
                    alt=""
                    className="rounded-tl-lg rounded-bl-lg overflow-hidden w-full h-full object-cover"
                  />
                </figure>
              </Link>

              <div className="mr-5 text-justify">
                <div>
                  <Link
                    to={
                      item.media_type === "tv"
                        ? `/tv/${item.id}`
                        : `/movie/${item.id}`
                    }
                  >
                    <h2 className="font-bold">
                      {item.media_type === "tv" ? item.name : item.title}
                    </h2>
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
                <p className="mt-4 text-sm overflow-hidden line-clamp-2">
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
