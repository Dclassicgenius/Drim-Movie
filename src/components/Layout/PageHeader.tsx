import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetail } from "../../hooks/MovieHooks/useMovieDetail";
import { FaArrowLeft } from "react-icons/fa";

export type PageHeaderProps = {
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

export function PageHeader({ useDetail, detailType }: PageHeaderProps) {
  const { id } = useParams<{ id?: string }>();
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const itemId = parseInt(id ?? "0");
  const { data, isLoading, error } = useDetail(itemId);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const title =
    detailType === "movie" ? data.title || data.original_title : data.name;
  const releaseDate =
    detailType === "movie" ? data.release_date : data.first_air_date;
  return (
    <>
      <div className="bg-slate-800">
        <div className=" px-5 sm:px-0 sm:pl-10 text-white flex gap-4 sm:gap-8 items-center justify-start py-6">
          <figure className="w-[60px] ">
            <img
              src={API_IMG + data.poster_path}
              alt=""
              className="w-full h-full rounded-md overflow-clip object-cover"
            />
          </figure>
          <div>
            <h1 className="font-bold text-lg sm:text-3xl">
              {title}{" "}
              <span className="text-[#c0baba] font-normal">
                ({new Date(releaseDate).getFullYear()})
              </span>
            </h1>
            <p
              className="text-[#c0baba] flex gap-2 mt-2 items-center cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft /> Back to main
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
