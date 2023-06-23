import { useState } from "react";
import { IMovie, TabType } from "../../../types";
import { Movie } from "../../Movie/Movie";
import { Tabs } from "../../Layout/Tabs";
import useFetchTrendingMovies from "../../../api/api";

const tabs = [
  {
    id: 1,
    title: "Today",
    type: "day",
  },
  {
    id: 2,
    title: "This Week",
    type: "week",
  },
];

export function Trending() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const {
    isLoading,
    data: trending,
    error,
  } = useFetchTrendingMovies(activeTab.type);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Tabs
        tabs={tabs}
        header="Trending"
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />

      <Movie movies={trending ?? []} />
    </>
  );
}
