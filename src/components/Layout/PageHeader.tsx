import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetail } from "../../hooks/MovieHooks/useMovieDetail";
import { FaArrowLeft } from "react-icons/fa";

export function PageHeader() {
  const { id } = useParams<{ id?: string }>();
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const movieId = parseInt(id ?? "0");
  const { data, isLoading, error } = useMovieDetail(movieId);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="bg-slate-800">
        <div className="pl-20 text-white flex gap-8 items-center justify-start py-6">
          <figure className="w-[60px] h-[90px]">
            <img
              src={API_IMG + data.poster_path}
              alt=""
              className="w-full h-full rounded-md overflow-clip object-cover"
            />
          </figure>
          <div>
            <h1 className="font-bold text-3xl">
              {data?.original_title}{" "}
              <span className="text-[#c0baba] font-normal">
                ({new Date(data.release_date).getFullYear()})
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
