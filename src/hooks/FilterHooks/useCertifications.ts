import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
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

const fetchCertifications = (mediaType: "movie" | "tv") => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiUrl = `certification/${mediaType}/list?api_key=${apiKey}&certification_country=US`;
  return axiosInstance
    .get<MovieCertificationListResponse>(apiUrl)
    .then((response) => response.data.certifications);
};

export const useCertifications = (mediaType: "movie" | "tv") => {
  return useQuery(["certifications", mediaType], () =>
    fetchCertifications(mediaType)
  );
};
