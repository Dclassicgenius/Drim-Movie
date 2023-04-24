export interface IRecommendation {
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

export interface IRecommendationResponse {
  page: number;
  results: IRecommendation[];
  total_pages: number;
  total_results: number;
}
