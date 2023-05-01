import { FaBookmark, FaHeart, FaStar } from "react-icons/fa";
import { useCastProfile } from "../../hooks/People/useCastProfile";
import { Cast, Crew } from "./PeopleType";
import { useMovieDetail } from "../../hooks/MovieHooks/useMovieDetail";

type DetailPopUpProps = {
  // id: number;
  credit: Cast | Crew;
  showPopup: boolean;
};

export function DetailPopUp({ credit, showPopup }: DetailPopUpProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  const words = credit.overview.split(" ");
  const truncated = words.slice(0, 20).join(" ");

  const truncatedWithEllipsis =
    words.length > 20 ? truncated + " ..." : truncated;

  return (
    <>
      {credit && showPopup && (
        <div className="w-[535px] h-[170px] bg-[#032541] rounded-md text-white">
          <div className="px-3 pt-3 pb-6 flex gap-4 items-start">
            <figure className="h-[140px] w-[100px] min-w-[95px] rounded-lg overflow-hidden cursor-pointer">
              <img
                src={API_IMG + credit.poster_path}
                alt=""
                className="w-full h-full"
              />
            </figure>
            <div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-xl">
                    {credit.media_type === "tv" ? credit.name : credit.title}
                  </h2>
                  <div className=" bg-blue-500 rounded-md flex gap-2 py-1 px-2 items-center">
                    <FaStar className="" /> {credit.vote_average.toFixed(1)}
                  </div>
                </div>
                <p className="py-5">{truncatedWithEllipsis}</p>
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
