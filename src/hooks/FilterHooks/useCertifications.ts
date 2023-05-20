import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Certification {
  certification: string;
  meaning: string;
  order: number;
}

interface CertificationsByCountry {
  [countryCode: string]: Certification[];
}

interface MovieCertificationListResponse {
  certifications: CertificationsByCountry;
}

const fetchCertifications = async (mediaType: "movie" | "tv") => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/certification/${mediaType}/list?api_key=${apiKey}&certification_country=US`;
  const response = await axios.get<MovieCertificationListResponse>(apiUrl);
  return response.data.certifications;
};

export const useCertifications = (mediaType: "movie" | "tv") => {
  return useQuery(["certifications", mediaType], () =>
    fetchCertifications(mediaType)
  );
};
