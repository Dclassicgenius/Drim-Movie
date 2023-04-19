import { Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { SearchBox } from "./SearchBox";
import { Trending } from "./Trending";
import { LatestTrailer } from "./LatestTrailer";
import { Popular } from "./Popular";
import { FreeToWatch } from "./FreeToWatch";
import { FooterNav } from "./FooterNav";
import { MovieDetail } from "./components/Details/MovieDetail";
import { Movie } from "./Movie";

function App() {
  return (
    <>
      <NavBar />
      <SearchBox />
      <Trending />
      <LatestTrailer />
      <Popular />
      <FreeToWatch />
      <FooterNav />

      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </>
    // <div className="my-4">
    //   <Routes>
    //     <Route path="/" element={<NavBar/>}/>

    //   </Routes>
    // </div>
  );
}

export default App;
