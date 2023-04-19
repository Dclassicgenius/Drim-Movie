import { Cast } from "./Cast";
import { Review } from "./Review";
import { Recommendations } from "./Recommendations";
import { SideBar } from "./SideBar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { MovieMain } from "./MovieMain";

export function MovieDetail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  return (
    <>
      <MovieMain />

      <section className="grid grid-cols-5 gap-4">
        <Cast />
        <SideBar />
      </section>

      <Review />
      <Recommendations />
    </>
  );
}
