import { Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { FooterNav } from "./FooterNav";
import { MovieDetail } from "./components/Detail/MovieDetails/MovieDetail";

import { Home } from "./Home";
import { MovieFullCastsAndCrew } from "./components/Detail/MovieDetails/MovieFullCastsAndCrew";
import { MovieReviewAll } from "./components/Detail/MovieDetails/MovieReviewAll";
import { TvDetail } from "./components/Detail/TvDetails/TvDetail";
import { TvFullCastsAndCrew } from "./components/Detail/TvDetails/TvFullCastsAndCrew";
import { TvReviewAll } from "./components/Detail/TvDetails/TvReviewAll";
import { Person } from "./components/People/Person";
import { SearchResults } from "./components/Search/SearchResults";
import { PopularMovies } from "./components/Movies/PopularMovies/PopularMovies";
import { NowPlaying } from "./components/Movies/NowPlaying/NowPlaying";
import { Upcoming } from "./components/Movies/Upcoming/Upcoming";
import { TopRated } from "./components/Movies/TopRated/TopRated";
import { PopularTv } from "./components/TVs/PopularTvs/PopularTv";
import { AiringToday } from "./components/TVs/Airing Today/AiringToday";
import { AiringOnTv } from "./components/TVs/On Tv/AiringOnTv";
import { TopRatedTv } from "./components/TVs/Top Rated/TopRatedTv";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/cast" element={<MovieFullCastsAndCrew />} />
        <Route path="/movie/:id/reviews" element={<MovieReviewAll />} />
        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/tv/:id/cast" element={<TvFullCastsAndCrew />} />
        <Route path="/tv/:id/reviews" element={<TvReviewAll />} />
        <Route path="/people/:id" element={<Person />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/movie/popular" element={<PopularMovies />} />
        <Route path="/movie/now-playing" element={<NowPlaying />} />
        <Route path="/movie/upcoming" element={<Upcoming />} />
        <Route path="/movie/top-rated" element={<TopRated />} />
        <Route path="/tv/popular" element={<PopularTv />} />
        <Route path="/tv/airing-today" element={<AiringToday />} />
        <Route path="/tv/on-tv" element={<AiringOnTv />} />
        <Route path="/tv/top-rated" element={<TopRatedTv />} />
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;
