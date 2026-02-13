'use server';
/**
 * @fileOverview An AI agent that ranks candidate resumes against a job description.
 *
 * - rankCandidates - A function that handles the candidate ranking process.
 * - RankCandidatesInput - The input type for the rankCandidates function.
 * - RankCandidatesOutput - The return type for the rankCandidates function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RankCandidatesInputSchema = z.object({
  jobDescription: z.string().describe('The job description for the role.'),
  candidateResumes: z.array(z.string()).describe('An array of candidate resumes, each as a string.'),
});
export type RankCandidatesInput = z.infer<typeof RankCandidatesInputSchema>;

const RankedCandidateSchema = z.object({
  resumeContent: z.string().describe('The content of the candidate\'s resume.'),
  score: z.number().describe('A suitability score for the candidate (0-100).'),
  reasoning: z.string().describe('Explanation for the given score.'),
});

const RankCandidatesOutputSchema = z.object({
  rankedCandidates: z.array(RankedCandidateSchema).describe('An array of candidates ranked by suitability score in descending order.'),
});
export type RankCandidatesOutput = z.infer<typeof RankCandidatesOutputSchema>;

export async function rankCandidates(input: RankCandidatesInput): Promise<RankCandidatesOutput> {
  return rankCandidatesFlow(input);
}

const rankCandidatePrompt = ai.definePrompt({
  name: 'rankCandidatePrompt',
  input: {
    schema: z.object({
      jobDescription: z.string(),
      resumeContent: z.string(),
    }),
  },
  output: {
    schema: z.object({
      score: z.number().min(0).max(100),
      reasoning: z.string(),
    }),
  },
  prompt: `You are an expert ATS (Applicant Tracking System) that ranks candidates based on their resume content against a given job description.

Your goal is to provide a suitability score (0-100) and a concise reasoning for that score. Higher scores indicate a better match.

Job Description:
{{{jobDescription}}}

Candidate Resume:
{{{resumeContent}}}

Provide the score and reasoning in JSON format.`,
});

const rankCandidatesFlow = ai.defineFlow(
  {
    name: 'rankCandidatesFlow',
    inputSchema: RankCandidatesInputSchema,
    outputSchema: RankCandidatesOutputSchema,
  },
  async (input) => {
    const candidateScores: Array<z.infer<typeof RankedCandidateSchema>> = [];

    for (const resumeContent of input.candidateResumes) {
      const { output } = await rankCandidatePrompt({
        jobDescription: input.jobDescription,
        resumeContent,
      });

      if (output) {
        candidateScores.push({
          resumeContent,
          score: output.score,
          reasoning: output.reasoning,
        });
      }
    }

    // Sort candidates by score in descending order
    candidateScores.sort((a, b) => b.score - a.score);

    return {
      rankedCandidates: candidateScores,
    };
  },
);
