import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import ISO6391 from "iso-639-1";
import { useTvDetail } from "../../../hooks/TvHooks/useTvDetail";
import { KeyWord } from "../Keyword/Keyword";

type SideBarProps = {
  id: number;
};

export function TvSideBar({ id }: SideBarProps) {
  const { data, isLoading, error } = useTvDetail(id);
  const API_IMG = "https://image.tmdb.org/t/p/w500";

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
      <aside className="space-y-5 p-4 pt-14 col-span-1">
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
          <p className="font-bold text-base">Facts</p>
        </div>
        <div>
          <p className="font-bold text-base">Status</p>
          <p className="text-sm">{data && data.status}</p>
        </div>
        <div>
          <p className="font-bold text-base">Network</p>
          <ul className="flex flex-col gap-2 py-2">
            {data.networks.map((network) => (
              <li key={network.id}>
                <img
                  className="max-w-[100px] max-h-[50px]"
                  src={API_IMG + network.logo_path}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-base">Type</p>
          <p className="text-sm">{data && data.type}</p>
        </div>
        <div>
          <p className="font-bold text-base">Original Language</p>
          <p className="text-sm">
            {data && ISO6391.getName(data.original_language)}
          </p>
        </div>

        <div>
          <p className="font-bold text-base">Keywords</p>
          {!data.keywords.results ? (
            <p className="text-sm">No keyword available</p>
          ) : (
            <KeyWord id={id} useDetail={useTvDetail} />
          )}
        </div>
      </aside>
    </>
  );
}
