import { IMovie } from "../../../types";

export type SearchResult = IMovie | Person | Collections;

export interface MultiSearchResult {
  page: number;
  results: SearchResult[];
  total_results: number;
  total_pages: number;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  known_for: IMovie[];
  known_for_department: string;
  gender: number;
}

export interface Collections {
  id: number;
  backdrop_path: string;
  name: string;
  poster_path: string;
}
