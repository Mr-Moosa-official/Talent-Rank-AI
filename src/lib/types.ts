export interface Candidate {
  id: string;
  name: string;
  resume: string;
}

export interface RankedCandidateResult {
  name: string;
  score: number;
  reasoning: string;
  resumeContent: string;
}

export interface ScoreBreakdownResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  rationale: string;
}
