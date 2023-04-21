import { useEffect, useState } from "react";
import axios from "axios";
import { Tab } from "./Tab";
import { IMovie, TabType, IResponse } from "./types";
import { Movie } from "./Movie";

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
        header="Free To Watch"
        activeTab={activeTab}
      />
      <Movie movies={movies} API_IMG={API_IMG} />
    </>
  );
}