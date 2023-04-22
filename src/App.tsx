import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { FooterNav } from "./FooterNav";
import { MovieDetail } from "./components/Details/MovieDetail";
import { Home } from "./Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <FooterNav />
    </>
  );
}

export default App;
