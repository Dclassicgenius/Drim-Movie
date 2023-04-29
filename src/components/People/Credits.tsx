import { FaCircle } from "react-icons/fa";
import { useCastProfile } from "../../hooks/People/useCastProfile";
type CreditProps = {
  id: number;
};

export function Credits({ id }: CreditProps) {
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  const { data, isLoading, error } = useCastProfile(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  function getYearOrUnderscore(dateString: string) {
    if (!dateString) {
      return "-----";
    }
    return new Date(dateString).getFullYear();
  }

  const sortedData = data.combined_credits.cast.sort((a, b) => {
    const yearA = getYearOrUnderscore(
      a.media_type === "tv" ? a.first_air_date : a.release_date
    );
    const yearB = getYearOrUnderscore(
      b.media_type === "tv" ? b.first_air_date : b.release_date
    );

    if (yearA === "-----" && yearB === "-----") {
      return 0;
    }
    if (yearA === "-----") {
      return -1;
    }
    if (yearB === "-----") {
      return 1;
    }
    return yearB - yearA;
  });

  let currentYear: string | number | null = null;
  const mappedData = sortedData.map((credit) => {
    const year = getYearOrUnderscore(
      credit.media_type === "tv" ? credit.first_air_date : credit.release_date
    );

    const hrElement = year !== currentYear ? <hr /> : null;
    currentYear = year;

    return (
      <>
        {hrElement}
        <div className="flex gap-4 p-4 items-center " key={credit.id}>
          <p>{year}</p>
          <div className="text-xs rounded-full border border-black group cursor-pointer">
            <FaCircle
              className="text-white group-hover:text-blue-800 p-0.5"
              size={8}
            />
          </div>
          <p className="font-light text-[#7f7f7f]">
            {" "}
            <span className="text-black font-bold hover:text-blue-400 cursor-pointer">
              {credit.media_type === "tv"
                ? credit.original_name
                : credit.original_title}
            </span>{" "}
            {credit.media_type === "tv" && (
              <span className="hover:text-blue-400 cursor-pointer">
                ( {credit.episode_count}{" "}
                {credit.episode_count === 1 ? "episode" : "episodes"} )
              </span>
            )}
            <span> as</span>{" "}
            <span className="text-black">{credit.character}</span>
          </p>
        </div>
      </>
    );
  });

  return (
    <>
      <section className="space-y-5 p-4 pt-10 col-span-6 w-11/12 ">
        <h1 className="text-3xl font-bold pb-7">{data.name}</h1>
        <h2 className="font-bold text-lg">Biography</h2>
        {data.biography ? (
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {data.biography}
          </p>
        ) : (
          <p>We don't have a biography for {data.name}.</p>
        )}

        <h3 className="font-bold pt-4">Known For</h3>
        <div className="overflow-x-auto flex  space-x-5">
          {data.combined_credits &&
            data.combined_credits.cast
              .filter(
                (credit) =>
                  credit.poster_path &&
                  (credit.media_type === "movie" ||
                    (credit.media_type === "tv" && credit.episode_count > 5))
              )
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 20)
              .map((credit) => (
                <div className=" text-center text-sm pb-3" key={credit.id}>
                  <figure className="w-[130px] h-[195px] rounded-lg overflow-hidden">
                    <img src={API_IMG + credit.poster_path} alt="" />
                  </figure>
                  <p className="pt-2">
                    {credit.media_type === "movie"
                      ? credit.original_title
                      : credit.original_name}
                  </p>
                </div>
              ))}
        </div>
        <div className="">
          <h3 className="font-bold py-3">Acting</h3>
          <hr />
          <div className="shadow">
            {data.combined_credits && mappedData}
            <hr />
          </div>
          <hr />
        </div>
      </section>
    </>
  );
}
