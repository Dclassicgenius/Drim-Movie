import { useState } from "react";
import { TabType } from "../../../types";
import { Movie } from "../../Movie/Movie";
import { Tabs } from "../../Layout/Tabs";
import useFreetoWatchMedia from "./Hook/useFreeToWatch";

const tabs = [
  {
    id: 1,
    title: "Movies",
    type: "",
  },
  {
    id: 2,
    title: "TV Shows",
    type: "",
  },
];

export function FreeToWatch() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const {
    isLoading,
    data: freeMedia,
    error,
  } = useFreetoWatchMedia(activeTab.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <Tabs
        tabs={tabs}
        header="Free To Watch"
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />

      <Movie movies={freeMedia ?? []} />
    </>
  );
}
