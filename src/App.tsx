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
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;
