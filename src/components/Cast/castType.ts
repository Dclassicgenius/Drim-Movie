export interface Roles {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface Jobs {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface ICast {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character?: string;
  credit_id: string;
  order: number;
  total_episode_count?: number;
  roles?: Roles[];
}

export interface ICrew {
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
  job?: string;
  total_episode_count: number;
  jobs?: Jobs[];
}

export interface ICredits {
  cast: ICast[];
  crew: ICrew[];
}
