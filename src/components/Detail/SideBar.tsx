import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import ISO6391 from "iso-639-1";

type SideBarProps = {
  id: number;
  useDetail: (id: number) => any;
  detailType: "movie" | "tv";
};

function currencyFormat(num: number, currencySymbol = "$") {
  return (
    currencySymbol + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export function SideBar({ id, useDetail, detailType }: SideBarProps) {
  const { data, isLoading, error } = useDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <aside className="space-y-5 p-4 pt-10 col-span-1">
        <ol className="flex gap-5 text-xl pb-6">
          <li>
            <a href="#">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="#">
              <FaLink />
            </a>
          </li>
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
      </aside>
    </>
  );
}
