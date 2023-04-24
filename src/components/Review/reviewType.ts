export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface IReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface IReviewResponse {
  id: number;
  page: number;
  results: IReview[];
  total_pages: number;
  total_results: number;
}
