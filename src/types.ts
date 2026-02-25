export interface Repo {
  id: string;
  owner: string;
  name: string;
  url: string;
  status: 'ACTIVE' | 'WATCHLIST' | 'ARCHIVED';
  score: number;
  language: string;
  license: string;
  stars: number;
  forks: number;
  issues: number;
  last_push: string;
  description: string;
  readme?: string;
  ai_analysis?: string; // JSON string
  updated_at: string;
}

export interface Snapshot {
  id: number;
  repo_id: string;
  score: number;
  stars: number;
  issues: number;
  timestamp: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  constraints: string; // JSON string
  created_at: string;
}

export interface PinnedRepo extends Repo {
  notes: string;
}

export interface ScoringWeights {
  popularity: number;
  activity: number;
  maintenance: number;
  documentation: number;
  quality: number;
  license: number;
}
