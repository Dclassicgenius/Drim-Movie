import { FaBookmark, FaHeart, FaStar } from "react-icons/fa";
import { Cast, Crew } from "./PeopleType";
import placeholderImage from "../../assets/placeholderImage.png";
import { Link } from "react-router-dom";

type DetailPopUpProps = {
  credit: Cast | Crew;
};

export function DetailPopUp({ credit }: DetailPopUpProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  const words = credit.overview.split(" ");
  const truncated = words.slice(0, 18).join(" ");

  const truncatedWithEllipsis =
    words.length > 18 ? truncated + " ..." : truncated;

  return (
    <>
      {credit && (
        <div className="sm:w-[535px] w-11/12 bg-[#032541] rounded-md text-white z-50">
          <div className="px-3 pt-3 pb-6 flex gap-4 items-start">
            <Link to={`/${credit.media_type}/${credit.id}`}>
              <figure className="w-[100px] min-w-[95px] rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={
                    credit.poster_path !== null
                      ? API_IMG + credit.poster_path
                      : placeholderImage
                  }
                  alt=""
                  className="w-full h-full"
                />
              </figure>
            </Link>
            <div>
              <div>
                <div className="sm:flex sm:items-center sm:gap-3">
                  <Link to={`/${credit.media_type}/${credit.id}`}>
                    <h2 className="font-bold text-sm sm:text-xl pb-2">
                      {credit.media_type === "tv" ? credit.name : credit.title}
                    </h2>
                  </Link>
                  <div className=" bg-blue-500 rounded-md flex gap-2 py-1 px-2 items-center w-16">
                    <FaStar className="" /> {credit.vote_average.toFixed(1)}
                  </div>
                </div>
                {/* <p className="py-5">{truncatedWithEllipsis}</p> */}
                <p className="my-4 text-xs sm:text-sm overflow-hidden line-clamp-2">
                  {credit.overview ? (
                    credit.overview
                  ) : (
                    <p>
                      We do not have a translated overview for this currently
                    </p>
                  )}
                </p>
                <ul className="flex gap-3 items-center text-base">
                  <li className=" bg-blue-500 p-4 rounded-md hover:bg-slate-600">
                    <a href="">
                      <FaHeart />
                    </a>
                  </li>
                  <li className=" bg-blue-500 p-4 rounded-md hover:bg-slate-600">
                    <a href="">
                      <FaBookmark />
                    </a>
                  </li>
                  <li className=" bg-blue-500 p-4 rounded-md hover:bg-slate-600">
                    <a href="">
                      <FaHeart />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
