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
import { MovieFilters } from "./components/Movies/SideBar/MovieFilters";
import { PopularMovies } from "./components/Movies/PopularMovies/PopularMovies";

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
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;
