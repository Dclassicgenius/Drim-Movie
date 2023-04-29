import { useState } from "react";
import { IMovie, TabType } from "../../types";
import { Movie } from "../Movie/Movie";
import useFetchMovies from "../../api/api";
import { Tabs } from "../Layout/Tabs";

const tabs = [
  {
    id: 1,
    title: "Movies",
    apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`,
  },
  {
    id: 2,
    title: "TV Shows",
    apiUrl: `https://api.themoviedb.org/3/tv/popular?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`,
  },
];

export function Popular() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const {
    isLoading,
    data: movies,
    error,
  } = useFetchMovies(activeTab.apiUrl, 1000 * 60 * 5, 1000 * 60);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const popular: IMovie[] = (movies || []).map((media) => ({
    ...media,
    type: activeTab.id === 1 ? "movie" : "tv",
  }));

  return (
    <>
      <Tabs
        tabs={tabs}
        header="What's Popular"
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />

      <Movie movies={popular} />
    </>
  );
}
