'use server';

import { getScoreBreakdown } from '@/ai/flows/get-score-breakdown';
import { rankCandidates } from '@/ai/flows/rank-candidates';
import type { ScoreBreakdownResult, RankedCandidateResult } from '@/lib/types';
import type { Candidate } from '@/lib/types';

export async function performRanking(
  jobDescription: string,
  candidates: Candidate[]
): Promise<{ data?: RankedCandidateResult[]; error?: string }> {
  if (!jobDescription || candidates.length === 0) {
    return { error: "Job description and at least one candidate are required." };
  }

  try {
    const resumeTexts = candidates.map(c => c.resume);
    const result = await rankCandidates({
      jobDescription,
      candidateResumes: resumeTexts,
    });

    const rankedCandidatesWithNames: RankedCandidateResult[] = result.rankedCandidates.map(ranked => {
      const originalCandidate = candidates.find(c => c.resume === ranked.resumeContent);
      return {
        ...ranked,
        name: originalCandidate ? originalCandidate.name : 'Unknown Candidate',
      };
    });

    return { data: rankedCandidatesWithNames };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to rank candidates due to an AI processing error.' };
  }
}

export async function getBreakdown(
  jobDescription: string,
  resumeText: string
): Promise<{ data?: ScoreBreakdownResult; error?: string }> {
  if (!jobDescription || !resumeText) {
    return { error: "Job description and resume text are required." };
  }

  try {
    const result = await getScoreBreakdown({
      jobDescription,
      resumeText,
    });
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate score breakdown due to an AI processing error.' };
  }
}
