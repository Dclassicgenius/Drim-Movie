// import { useQuery, UseQueryResult } from "@tanstack/react-query";
// import { IMovieDetails } from "../../components/Detail/MovieDetails/movieDetailType";
// import axiosInstance from "../axiosInstance";
// import { getCertification } from "../../components/utility/getMovieCertification";
// import {
//   IUniqueCrew,
//   getUniqueImportantCrew,
// } from "../../components/utility/getUniqueImportantCrew";
// import { IVideo } from "../../types";

// function convertMinutesToHoursAndMinutes(minutes: number) {
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;

//   return { hours, minutes: remainingMinutes };
// }

// const processMovieData = (data: IMovieDetails) => {
//   const { hours, minutes } = convertMinutesToHoursAndMinutes(data.runtime);

//   const title = data.title || data.original_title;
//   const releaseDate = data.release_date;

//   const certification = getCertification(data, "movie");
//   const uniqueImportantCrew: IUniqueCrew[] = getUniqueImportantCrew(
//     data.credits
//   );
//   let trailer: IVideo | undefined;

//   if (data) {
//     const videos: IVideo[] = data.videos.results || [];

//     trailer = videos.find(
//       (video) => video.type === "Trailer" && video.site === "YouTube"
//     );

//     if (!trailer) {
//       trailer = videos.find(
//         (video) =>
//           video.type === "Teaser" ||
//           video.type === "Clip" ||
//           (video.type === "Opening Credits" && video.site === "YouTube")
//       );
//     }
//   }

//   return {
//     data,
//     hours,
//     minutes,
//     title,
//     releaseDate,
//     certification,
//     uniqueImportantCrew,
//     trailer,
//   };
// };

// const fetchMovieData = (movieId: number) => {
//   const apiKey = import.meta.env.VITE_TMDB_API_KEY;
//   return axiosInstance
//     .get<IMovieDetails>(
//       `movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,releases,recommendations,reviews,videos,external_ids,keywords`
//     )
//     .then((response) => processMovieData(response.data));
// };

// export const useMovieDetail = (movieId: number) => {
//   return useQuery(["movieDatails", movieId], () => fetchMovieData(movieId));
// };

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IMovieDetails } from "../../components/Detail/MovieDetails/movieDetailType";

const fetchMovieData = async (movieId: number): Promise<IMovieDetails> => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get<IMovieDetails>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits,releases,recommendations,reviews,videos,external_ids,keywords`
  );
  return response.data;
};

export const useMovieDetail = (
  movieId: number
): UseQueryResult<IMovieDetails, Error> => {
  return useQuery(["movieDatails", movieId], () => fetchMovieData(movieId));
};
