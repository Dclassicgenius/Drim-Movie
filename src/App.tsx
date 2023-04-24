import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { FooterNav } from "./FooterNav";
import { MovieDetail } from "./components/Detail/MovieDetail";

import { Home } from "./Home";
import { FullCastsAndCrew } from "./components/Cast/FullCastsAndCrew";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/cast" element={<FullCastsAndCrew />} />
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;
