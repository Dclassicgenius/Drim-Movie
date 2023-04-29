import { useState } from "react";
import { IMovie, TabType } from "../../types";
import useFetchMovies from "../../api/api";
import { Movie } from "../Movie/Movie";
import { Tabs } from "../Layout/Tabs";

const tabs = [
  {
    id: 1,
    title: "Today",
    apiUrl: `https://api.themoviedb.org/3/trending/all/day?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`,
  },
  {
    id: 2,
    title: "This Week",
    apiUrl: `https://api.themoviedb.org/3/trending/all/week?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`,
  },
];

export function Trending() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const {
    isLoading,
    data: movies,
    error,
  } = useFetchMovies(activeTab.apiUrl, 1000 * 60 * 5, 1000 * 60);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const trending: IMovie[] = (movies || []).map((movie) => ({
    ...movie,
    type: movie.first_air_date ? "tv" : "movie",
  }));
  return (
    <>
      <Tabs
        tabs={tabs}
        header="Trending"
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />

      <Movie movies={trending} />
    </>
  );
}
