import { useState } from "react";
import { TabType } from "../../../types";
import { Movie } from "../../Movie/Movie";
import { Tabs } from "../../Layout/Tabs";
import usePopularMedia from "./Hook/usePopularMedia";

const tabs = [
  {
    id: 1,
    title: "Streaming",
    type: "",
  },
  {
    id: 2,
    title: "In Theaters",
    type: "",
  },
  {
    id: 3,
    title: "For Rent",
    type: "",
  },
  {
    id: 4,
    title: "On TV",
    type: "",
  },
];

export function Popular() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const { isLoading, data: media, error } = usePopularMedia(activeTab.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <Tabs
        tabs={tabs}
        header="What's Popular"
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />

      <Movie movies={media ?? []} />
    </>
  );
}
