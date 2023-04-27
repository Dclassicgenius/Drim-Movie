import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import ISO6391 from "iso-639-1";
import { useMovieDetail } from "../../../hooks/MovieHooks/useMovieDetail";
import { KeyWord } from "../Keyword";

type SideBarProps = {
  movieId: number;
};

function currencyFormat(num: number, currencySymbol = "$") {
  return (
    currencySymbol + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export function MovieSideBar({ movieId }: SideBarProps) {
  const { data, isLoading, error } = useMovieDetail(movieId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const facebookUrl = data.external_ids.facebook_id
    ? `https://www.facebook.com/${data.external_ids.facebook_id}`
    : null;
  const twitterUrl = data.external_ids.twitter_id
    ? `https://www.twitter.com/${data.external_ids.twitter_id}`
    : null;
  const instagramUrl = data.external_ids.instagram_id
    ? `https://www.instagram.com/${data.external_ids.instagram_id}`
    : null;

  return (
    <>
      <aside className="space-y-5 p-4 pt-10 col-span-1">
        <ol className="flex gap-5 text-xl pb-6">
          {facebookUrl && (
            <li>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </li>
          )}
          {twitterUrl && (
            <li>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </li>
          )}

          {instagramUrl && (
            <li>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </li>
          )}

          {data.homepage && (
            <li>
              <a href={data.homepage} target="_blank" rel="noopener noreferrer">
                <FaLink />
              </a>
            </li>
          )}
        </ol>
        <div>
          <p className="font-bold text-base">Status</p>
          <p className="text-sm">{data && data.status}</p>
        </div>
        <div>
          <p className="font-bold text-base">Original Language</p>
          <p className="text-sm">
            {data && ISO6391.getName(data.original_language)}
          </p>
        </div>
        <div>
          <p className="font-bold text-base">Budget</p>
          <p className="text-sm">
            {data && data.budget !== 0
              ? currencyFormat(data.budget)
              : "Unknown"}
          </p>
        </div>
        <div>
          <p className="font-bold text-base">Revenue</p>
          <p className="text-sm">
            {" "}
            {data && data.revenue !== 0
              ? currencyFormat(data.revenue)
              : "Unknown"}
          </p>
        </div>
        <div>
          <p className="font-bold text-base">Keywords</p>
          {!data.keywords.keywords ? (
            <p className="text-sm">No keyword available</p>
          ) : (
            <KeyWord id={movieId} useDetail={useMovieDetail} />
          )}
        </div>
      </aside>
    </>
  );
}
