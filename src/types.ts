import { Key } from "react";

export interface IResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IResponseVideo {
  id: number;
  results: IVideo[];
}

export interface IMovie {
  id: number;
  name?: string;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  release_date: string;
  title?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_name: string;
  type: string;
}

export interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  movieId: number;
}

export type TabType = {
  id: string | number;
  title: string;
  apiUrl: string;
};

export type TabProps = {
  tabs: TabType[];
  handleTabClick: (tab: TabType) => void;
  header: string;
  activeTab: TabType;
};

export interface IReleases {
  countries: ICountryRelease[];
}

export interface ICountryRelease {
  iso_3166_1: string;
  certification: string;
  release_date: string;
}

export interface ContentRatings {
  results: ContentRating[];
}

export interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

export interface ExternalIDs {
  imdb_id: string;
  tvdb_id: number;
  freebase_mid: string;
  freebase_id: string;
  tvrage_id: number;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface EpisodeGroups {
  results: EpisodeGroup[];
}

export interface EpisodeGroup {
  id: string;
  name: string;
  order: number;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  episode_number: number;
  season_number: number;
}

export interface Keywords {
  results?: Keyword[];

  keywords?: Keyword[];
}

export interface Keyword {
  id: number;
  name: string;
}
