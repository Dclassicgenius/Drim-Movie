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

export interface IMovieDetail {
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
}

// export interface ITrendingMovie {
//   results: [
//     adult: boolean,
//     backdrop_path: string,
//     id: string,
//     title: string,
//     original_language: string,
//     original_title: string,
//     overview: string,
//     poster_path: string,
//     media_type: string,
//     popularity: number,
//     release_date: string,
//     video: boolean,
//     vote_average: number,
//     vote_count: number
//   ];
// }

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

export interface ICrewResponse {
  id: number;
  original_title: string;
  release_date: string;
  cast: ICastMember[];
  crew: ICrewMember[];
  releases: IReleases;
}

export interface ICastMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface IReleases {
  countries: ICountryRelease[];
}

export interface ICountryRelease {
  iso_3166_1: string;
  certification: string;
  release_date: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface ReviewResult {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewResponse {
  id: number;
  page: number;
  results: ReviewResult[];
  total_pages: number;
  total_results: number;
}

export interface RecommendationResponse {
  page: number;
  results: MovieRecommendation[];
  total_pages: number;
  total_results: number;
}

export interface MovieRecommendation {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
