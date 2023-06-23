import { Link } from "react-router-dom";
import { Keyword } from "../../../types";

type KeywordProps = {
  id: number;
  useDetail: (id: number) => any;
};

export function KeyWord({ id, useDetail }: KeywordProps) {
  const { data, isLoading, error } = useDetail(id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const keywords: Keyword[] =
    data?.keywords.results || data?.keywords.keywords || [];
  return (
    <>
      <ul className="flex flex-wrap justify-start list-none py-3">
        {keywords.map((keyword) => (
          <Link to={`/keyword/${keyword.id}/${keyword.name}`} key={keyword.id}>
            <li
              className="mr-2 mb-4 leading-6 whitespace-nowrap text-xs list-item bg-[#e5e5e5] px-3 py-1 rounded-lg"
              key={keyword.id}
            >
              {keyword.name}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
