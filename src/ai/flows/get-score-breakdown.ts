'use server';
/**
 * @fileOverview A Genkit flow for generating a detailed AI-powered score breakdown for a candidate's resume
 * based on a given job description.
 *
 * - getScoreBreakdown - A function that handles the score breakdown process.
 * - GetScoreBreakdownInput - The input type for the getScoreBreakdown function.
 * - GetScoreBreakdownOutput - The return type for the getScoreBreakdown function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetScoreBreakdownInputSchema = z.object({
  jobDescription: z.string().describe('The full text of the job description.'),
  resumeText: z.string().describe('The full text of the candidate\'s resume.'),
});
export type GetScoreBreakdownInput = z.infer<typeof GetScoreBreakdownInputSchema>;

const GetScoreBreakdownOutputSchema = z.object({
  overallScore: z.number().describe('An overall compatibility score for the candidate, from 0 to 100.'),
  strengths: z.array(z.string()).describe('A list of key strengths of the candidate\'s resume in relation to the job description.'),
  weaknesses: z.array(z.string()).describe('A list of key weaknesses or areas for improvement in the candidate\'s resume in relation to the job description.'),
  rationale: z.string().describe('A detailed explanation of the overall score and the reasoning behind the identified strengths and weaknesses.'),
});
export type GetScoreBreakdownOutput = z.infer<typeof GetScoreBreakdownOutputSchema>;

export async function getScoreBreakdown(input: GetScoreBreakdownInput): Promise<GetScoreBreakdownOutput> {
  return getScoreBreakdownFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getScoreBreakdownPrompt',
  input: {schema: GetScoreBreakdownInputSchema},
  output: {schema: GetScoreBreakdownOutputSchema},
  prompt: `You are an expert ATS (Applicant Tracking System) AI assistant. Your task is to analyze a candidate's resume against a given job description and provide a detailed score breakdown.

First, provide an overall compatibility score from 0 to 100, where 100 is a perfect match.
Next, identify the candidate's key strengths that directly align with the job description requirements.
Then, identify any weaknesses or areas where the candidate\'s resume does not fully meet the job description criteria.
Finally, provide a comprehensive rationale explaining how you arrived at the overall score, detailing the specific aspects of the resume that contributed to the identified strengths and weaknesses, and how they relate to the job description.

Job Description:
{{{jobDescription}}}

Candidate Resume:
{{{resumeText}}}`,
});

const getScoreBreakdownFlow = ai.defineFlow(
  {
    name: 'getScoreBreakdownFlow',
    inputSchema: GetScoreBreakdownInputSchema,
    outputSchema: GetScoreBreakdownOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
