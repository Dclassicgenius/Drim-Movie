import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { useCastProfile } from "../../hooks/People/useCastProfile";
import { calculateAge } from "../utility/CalculateAge";

type BioProps = {
  id: number;
};
export function Bio({ id }: BioProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const { data, isLoading, error } = useCastProfile(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const total_credit =
    data.combined_credits.cast.filter(
      (credit) =>
        !credit.character.includes("uncredited") &&
        (credit.release_date || credit.first_air_date)
    ).length +
    data.combined_credits.crew.filter(
      (credit) =>
        !credit.job.includes("uncredited") &&
        (credit.release_date || credit.first_air_date)
    ).length;

  const facebookUrl = data.external_ids.facebook_id
    ? `https://www.facebook.com/${data.external_ids.facebook_id}`
    : null;
  const twitterUrl = data.external_ids.twitter_id
    ? `https://www.twitter.com/${data.external_ids.twitter_id}`
    : null;
  const instagramUrl = data.external_ids.instagram_id
    ? `https://www.instagram.com/${data.external_ids.instagram_id}`
    : null;

  const tiktokUrl = data.external_ids.tiktok_id
    ? `https://www.tiktok.com/@${data.external_ids.tiktok_id}`
    : null;
  const youtubeUrl = data.external_ids.youtube_id
    ? `https://www.youtube.com/channel/${data.external_ids.youtube_id}`
    : null;

  return (
    <>
      <aside className="space-y-5 p-4 pt-10 col-span-2">
        <figure className=" w-[300px] h-[450px] rounded-xl overflow-hidden">
          <img src={API_IMG + data.profile_path} alt="" className="" />
        </figure>

        <div className="pt-5 pb-7">
          <ol className="flex items-center justify-start gap-4 ">
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={20} />
                </a>
              </li>
            )}
            {facebookUrl && (
              <li>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={20} />
                </a>
              </li>
            )}
            {twitterUrl && (
              <li>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={20} />
                </a>
              </li>
            )}

            {youtubeUrl && (
              <li>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={20} />
                </a>
              </li>
            )}
            {tiktokUrl && (
              <li>
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
                  <FaTiktok size={20} />
                </a>
              </li>
            )}

            {data.homepage && (
              <li>
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink size={20} />
                </a>
              </li>
            )}
          </ol>
        </div>
        <h2 className="font-bold text-xl">Personal Info</h2>
        <div>
          <p className="font-bold text-sm">Known Credits</p>
          <p className="font-light text-sm">{total_credit}</p>
        </div>
        <div>
          <p className="font-bold text-sm">Gender</p>
          <p className="font-light text-sm">
            {data.gender === 2 ? "Male" : "Female"}
          </p>
        </div>
        <div>
          <p className="font-bold text-sm">Birthdate</p>
          <p className="font-light text-sm">
            {new Date(data.birthday).toLocaleDateString()}{" "}
            {data.deathday === null && (
              <span>( {calculateAge(data.birthday)} years old)</span>
            )}
          </p>
        </div>
        {data.deathday && (
          <div>
            <p className="font-bold text-sm">Day of Death</p>
            <p className="font-light text-sm">
              {new Date(data.deathday).toLocaleDateString()}{" "}
              <span>
                ( {calculateAge(data.birthday, data.deathday)} years old)
              </span>{" "}
            </p>
          </div>
        )}
        <div>
          <p className="font-bold text-sm">Place of Birth</p>
          <p className="font-light text-sm">{data.place_of_birth}</p>
        </div>
        {data.also_known_as.length > 0 && (
          <div>
            <p className="font-bold text-sm">Also Known As</p>
            {data.also_known_as.map((name, index) => (
              <p className="font-light text-sm my-2" key={index}>
                {name}
              </p>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
