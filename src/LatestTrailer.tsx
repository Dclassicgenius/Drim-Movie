import { useEffect, useState } from "react";
import axios from "axios";
import { Tab } from "./Tab";
import { IMovie, TabType, IResponse, IVideo, IResponseVideo } from "./types";
import movieTrailer from "movie-trailer";
import { Trailer } from "./Trailer";

const tabs = [
  {
    id: 1,
    title: "Movies",
    apiUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en&region=US&sort_by=popularity.desc&page=1&watch_region=US&primary_release_date.gte=2023-01-01`,
  },
  {
    id: 2,
    title: "TV Shows",
    apiUrl: `https://api.themoviedb.org/3/tv/top_rated?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`,
  },
];

export function LatestTrailer() {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);
  const [moviesList, setMoviesList] = useState<IMovie[]>([]);
  const [tvShowsList, setTvShowsList] = useState<IMovie[]>([]);
  const [moviesVideos, setMoviesVideos] = useState<IVideo[][]>([]);
  const [tvShowsVideos, setTvShowsVideos] = useState<IVideo[][]>([]);
  const [selectedVideoKey, setSelectedVideoKey] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const API_IMG = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get<IResponse>(activeTab.apiUrl);
        if (activeTab.id === 1) {
          setMoviesList(response.data.results);
        } else {
          setTvShowsList(response.data.results);
        }

        // Fetch videos for each movie/TV show
        const fetchVideos = async (item: IMovie, type: string) => {
          try {
            const response = await axios.get<IResponseVideo>(
              `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=${
                import.meta.env.VITE_TMDB_API_KEY
              }&language=en`
            );
            const videosWithMovieId = response.data.results.map((video) => ({
              ...video,
              movieId: item.id,
            }));

            return videosWithMovieId;
          } catch (error) {
            console.log(error);
            return [];
          }
        };

        const videosPromises = response.data.results.map((item) =>
          fetchVideos(item, activeTab.id === 1 ? "movie" : "tv")
        );
        const videos = await Promise.all(videosPromises);

        if (activeTab.id === 1) {
          setMoviesVideos(videos);
        } else {
          setTvShowsVideos(videos);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (activeTab.id === 1 && moviesList.length === 0) {
      fetchContent();
    } else if (activeTab.id === 2 && tvShowsList.length === 0) {
      fetchContent();
    }
  }, [activeTab]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleTrailerClick = (trailerId: number) => {
    // Find the videos array corresponding to the trailerId
    const trailerVideos = (
      activeTab.id === 1 ? moviesVideos : tvShowsVideos
    ).find((videoArr) => videoArr.some((video) => video.movieId === trailerId));

    // Find the trailer video
    const video = trailerVideos?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    // Set the selected video key
    if (video) {
      setSelectedVideoKey(video.key);
      setShowPlayer(true);
    }
  };

  function handleCloseClick() {
    setShowPlayer(false);
  }

  return (
    <>
      <Tab
        tabs={tabs}
        handleTabClick={handleTabClick}
        header="Latest Trailers"
        activeTab={activeTab}
      />

      <Trailer
        videos={activeTab.id === 1 ? moviesVideos : tvShowsVideos}
        trailers={activeTab.id === 1 ? moviesList : tvShowsList}
        API_IMG={API_IMG}
        handleTrailerClick={handleTrailerClick}
        handleCloseClick={handleCloseClick}
        showPlayer={showPlayer}
        selectedVideoKey={selectedVideoKey}
      />
    </>
  );
}
