import { useState } from "react";
import { IMovie, TabType } from "../types";
import { Movie } from "../components/Movie/Movie";
import { Tabs } from "../components/Layout/Tabs";
import useFetchMovies from "../api/api";

const tabs = [
  {
    id: 1,
    title: "Movies",
    apiUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en&region=US&sort_by=popularity.desc&page=1&watch_region=US&with_watch_monetization_types=free`,
  },
  {
    id: 2,
    title: "TV Shows",
    apiUrl: `https://api.themoviedb.org/3/discover/tv?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en&region=US&sort_by=popularity.desc&page=1&watch_region=US&with_watch_monetization_types=free`,
  },
];

export function FreeToWatch() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const {
    isLoading,
    data: movies,
    error,
  } = useFetchMovies(activeTab.apiUrl, 1000 * 60 * 5, 1000 * 60);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const freeToWatch: IMovie[] = movies || [];
  return (
    <>
      <Tabs
        tabs={tabs}
        header="Free To Watch"
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />

      <Movie movies={freeToWatch} />
    </>
  );
}
