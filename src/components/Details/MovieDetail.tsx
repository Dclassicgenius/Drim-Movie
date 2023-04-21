import { Cast } from "./Cast";
import { Review } from "./Review";
import { Recommendations } from "./Recommendations";
import { SideBar } from "./SideBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieMain } from "./MovieMain";
import { IMovieDetail } from "../../types";
import axios from "axios";

export function MovieDetail() {
  const { id } = useParams<{ id?: string }>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetail | null>(null);
  // const [movieRecommendations, setMovieRecommendations] = useState<
  //   MovieRecommendation[]
  // >([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const API_IMG = "https://image.tmdb.org/t/p/w500";

  async function fetchMovieDetails(movieId: number): Promise<IMovieDetail> {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&page=1`
    );
    console.log(response.data);

    return response.data;
  }

  // async function fetchMovieRecommendations(
  //   movieId: number
  // ): Promise<MovieRecommendation[]> {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  //   );
  //   console.log(data.results);

  //   return data.results;
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieId = parseInt(id ?? "0");
        const fetchMovieDetail = await fetchMovieDetails(movieId);
        setMovieDetails(fetchMovieDetail);
      } catch (error) {
        console.log("Error fetching Data");
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <MovieMain movie={movieDetails} API_IMG={API_IMG} />

      <section className="grid grid-cols-5 gap-4">
        <Cast movie={movieDetails} API_IMG={API_IMG} />
        <SideBar movie={movieDetails} />
      </section>

      <Review API_IMG={API_IMG} movieId={parseInt(id ?? "0")} />
      <Recommendations movieId={parseInt(id ?? "0")} API_IMG={API_IMG} />
    </>
  );
}
