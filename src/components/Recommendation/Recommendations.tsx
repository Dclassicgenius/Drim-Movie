import { FaHeart, FaBookmark, FaStar, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IRecommendation } from "./recommendationType";

interface RecommendationProps {
  id: number;
  API_IMG: string;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
}

export function Recommendations({
  API_IMG,
  id,
  useDetail,
  detailType,
}: RecommendationProps) {
  const { data, isLoading, error } = useDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const recommendations: IRecommendation[] =
    data?.recommendations.results || [];

  // const title =
  //   detailType === "movie" ? data.title || data.original_title : data.name;
  // const releaseDate =
  //   detailType === "movie" ? data.release_date : data.first_air_date;

  return (
    <>
      <section className=" px-10 text-sm">
        <hr />
        <h2 className="font-bold text-lg py-5">Recommendations</h2>
        <ol className="flex gap-4 overflow-x-scroll overflow-y-hidden list-none list-inside pb-6 items-stretch">
          {recommendations &&
            recommendations
              .filter((item) => item.backdrop_path !== null)
              .map((item) => {
                const title =
                  detailType === "movie"
                    ? item.title || item.original_title
                    : item.name;
                const releaseDate =
                  detailType === "movie"
                    ? item.release_date
                    : item.first_air_date;
                return (
                  <Link to={`/${detailType}/${item.id}`} key={item.id}>
                    <li
                      className="shadow-md rounded-lg overflow-hidden min-w-[250px] w-[350px]"
                      key={item.id}
                    >
                      <a href="#">
                        <img
                          src={API_IMG + item.backdrop_path}
                          alt={item.title}
                          className="rounded-lg"
                        />
                      </a>
                      <div className="flex justify-between p-2">
                        <p>{title}</p>
                        <p>{Math.round(item.vote_average * 10)}%</p>
                      </div>
                      <div className="flex justify-between px-2 pb-3 items-center">
                        <div className="flex gap-2 items-center">
                          <FaCalendarAlt />
                          <p>{new Date(releaseDate).toLocaleDateString()}</p>
                        </div>

                        <div className="flex gap-2">
                          <FaHeart />
                          <FaBookmark />
                          <FaStar />
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
        </ol>
      </section>
    </>
  );
}
