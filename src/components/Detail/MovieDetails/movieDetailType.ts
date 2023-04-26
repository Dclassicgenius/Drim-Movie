import { ICredits } from "../../Cast/castType";
import { IRecommendationResponse } from "../../Recommendation/recommendationType";
import { IReviewResponse } from "../../Review/reviewType";
import { IVideoResponse } from "../../Trailer/videoType";

export type Genres = {
  id: number;
  name: string;
};

export type ProductionCompanies = {
  id: number;
  logo_path: string | null;
  name: string;
  original_country: string;
};

export type ProductionCountries = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export interface IReleases {
  countries: ICountryRelease[];
}

export interface ICountryRelease {
  iso_3166_1: string;
  certification: string;
  release_date: string;
}

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Genres[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  credits: ICredits;
  releases: IReleases;
  recommendations: IRecommendationResponse;
  reviews: IReviewResponse;
  videos: IVideoResponse;
}
