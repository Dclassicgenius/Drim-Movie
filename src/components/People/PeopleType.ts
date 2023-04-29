export interface ExternalIds {
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  twitter_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  youtube_id: string | null;
  id: number;
}

export interface Cast {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_name: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
  episode_count: number;
}

export interface Crew {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_title: string;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  first_air_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  episode_count: number;
  media_type: string;
}

export interface CombinedCredits {
  cast: Cast[];
  crew: Crew[];
}

export interface Person {
  birthday: string;
  known_for_department: string;
  deathday: string | null;
  id: number;
  name: string;
  also_known_as: string[] | [];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string | null;
  combined_credits: CombinedCredits;
  external_ids: ExternalIds;
}
