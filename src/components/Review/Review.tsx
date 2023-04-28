import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IReview } from "./reviewType";
import malePlaceholder from "../../assets/defaultMale.svg";

export function Review({
  id,
  displayCount = -1,
  API_IMG,
  useDetail,
  detailType,
}: {
  id: number;
  showAll?: boolean;
  API_IMG: string;
  displayCount: number;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
}) {
  const { data, isLoading, error } = useDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const reviews: IReview[] = data?.reviews.results || [];

  const displayedReviews =
    displayCount === -1
      ? reviews
      : reviews.length > 0
      ? [reviews[Math.floor(Math.random() * reviews.length)]]
      : [];

  return (
    <>
      {reviews.length > 0 && (
        <section className="px-10 pb-6">
          <hr />
          <h2 className="font-bold text-lg pt-6 pb-4">
            Reviews{" "}
            <span className="text-[#c0baba] text-sm">{reviews.length}</span>
          </h2>
          {displayedReviews.map((review) => {
            if (!review.author_details) {
              return null;
            }
            return (
              <article
                key={review.id}
                className="shadow rounded-xl overflow-hidden p-6 border flex gap-4 items-start mb-8"
              >
                <figure className="min-w-[50px] w-[70px]">
                  <a href="#">
                    <img
                      src={
                        review.author_details.avatar_path === null
                          ? malePlaceholder
                          : review.author_details.avatar_path?.startsWith(
                              "/http"
                            )
                          ? review.author_details.avatar_path.replace(
                              /^\/+/,
                              ""
                            )
                          : `${API_IMG}${
                              review.author_details.avatar_path ?? ""
                            }`
                      }
                      alt=""
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </a>
                </figure>
                <div className="pt-3">
                  <div className="flex gap-4 items-center">
                    <h2 className="text-lg font-bold">
                      A review by {review.author}
                    </h2>
                    {review.author_details.rating && (
                      <div className="flex gap-1 items-center text-xs rounded-lg bg-black text-white px-2 py-1 w-12">
                        <FaStar /> {review.author_details.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-light mb-10">
                    written by{" "}
                    <span className="font-semibold">{review.author}</span> on{" "}
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-normal">{review.content}</p>
                </div>
              </article>
            );
          })}
          {displayCount !== -1 && (
            <p className="font-bold text-lg pt-4">
              <Link to={`/${detailType}/${id}/reviews`}>Read All Reviews</Link>
            </p>
          )}
        </section>
      )}
    </>
  );
}
