import { useEffect, useState } from "react";
import axios from "axios";
import { Tab } from "./Tab";
import { IMovie, TabType, IResponse } from "./types";
import { Movie } from "./Movie";

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
  const [movies, setMovies] = useState<IMovie[]>([]);
  const API_IMG = "https://image.tmdb.org/t/p/w500";
  //   const [image, setImage] = useState<string | any>("");

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get<IResponse>(activeTab.apiUrl);

      const responseWithTypes = response.data.results.map((movie) => ({
        ...movie,
        type: activeTab.title === "Movies" ? "movie" : "tv",
      }));
      setMovies(responseWithTypes);
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
        header="What's Popular"
        activeTab={activeTab}
      />
      <Movie movies={movies} API_IMG={API_IMG} />
    </>
  );
}
