import {
  ContentRatings,
  ExternalIDs,
  EpisodeGroups,
  Keywords,
} from "../../../types";
import { ICredits } from "../../Cast/castType";
import { IRecommendationResponse } from "../../Recommendation/recommendationType";
import { IReviewResponse } from "../../Review/reviewType";
import { IVideoResponse } from "../../Trailer/videoType";

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export type Genres = {
  id: number;
  name: string;
};

export type LastEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export type Networks = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
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

export type Seasons = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type SpokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export interface ICountryContentRating {
  iso_3166_1: string;
  rating: string;
}

export interface ITvShowDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: CreatedBy[];
  genres: Genres[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air: number | null;
  networks: Networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  poster_path: string;
  popularity: number;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  seasons: Seasons[];
  spoken_languages: SpokenLanguages[];
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  last_air_date: string;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits: ICredits;
  content_ratings: ICountryContentRating;
  recommendations: IRecommendationResponse;
  reviews: IReviewResponse;
  videos: IVideoResponse;
  external_ids: ExternalIDs;
  episode_groups: EpisodeGroups;
  keywords: Keywords;
  aggregate_credits: ICredits;
}
