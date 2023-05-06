import { IMovie } from "../../../types";

export interface MultiSearchResult {
  page: number;
  results: (IMovie | Person | Collections)[];
  total_results: number;
  total_pages: number;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  known_for: IMovie[];
  media_type: string;
  known_for_department: string;
  gender: number;
}

export interface Collections {
  id: number;
  backdrop_path: string;
  name: string;
  poster_path: string;
}
