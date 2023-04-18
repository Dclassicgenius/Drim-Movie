import { useEffect, useState } from "react";
import axios from "axios";
import { Tab } from "./Tab";
import { IMovie, TabType, IResponse } from "./types";
import { Movie } from "./Movie";

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
  const [movies, setMovies] = useState<IMovie[]>([]);
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  //   const [image, setImage] = useState<string | any>("");

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get<IResponse>(activeTab.apiUrl);
      setMovies(response.data.results);
    };
    fetchMovie();
  }, [activeTab]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Tab
        tabs={tabs}
        handleTabClick={handleTabClick}
        header="Trending"
        activeTab={activeTab}
      />
      <Movie movies={movies} API_IMG={API_IMG} />
    </>
  );
}
