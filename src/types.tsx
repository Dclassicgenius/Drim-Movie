// export type Genres = {
//   id: number;
//   name: string;
// };

// export type ProductionCompanies = {
//   id: number;
//   logo_path: string | null;
//   name: string;
//   original_country: string;
// };

// export type ProductionCountries = {
//   iso_3166_1: string;
//   name: string;
// };

// export type SpokenLanguages = {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// };

// export interface IMovie {
//   adult: boolean;
//   backdrop_path: string;
//   budget: number;
//   genres: Genres[];
//   homepage: string;
//   id: number;
//   imdb_id: string;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   production_companies: ProductionCompanies[];
//   production_countries: ProductionCountries[];
//   release_date: string;
//   revenue: number;
//   runtime: number;
//   spoken_languages: SpokenLanguages[];
//   status: string;
//   tagline: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

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
