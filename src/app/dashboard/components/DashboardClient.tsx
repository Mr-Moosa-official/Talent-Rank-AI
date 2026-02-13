'use client';

import { useState } from 'react';
import type { Candidate, RankedCandidateResult } from '@/lib/types';
import { getBreakdown, performRanking } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CandidateDetailSheet } from './CandidateDetailSheet';
import { v4 as uuidv4 } from 'uuid';
import { AlertTriangle, ArrowRight, Bot, BrainCircuit, FilePlus, Loader2, Sparkles, Trash2, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';

export default function DashboardClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateResume, setNewCandidateResume] = useState('');
  const [rankedCandidates, setRankedCandidates] = useState<RankedCandidateResult[] | null>(null);
  const [isRanking, setIsRanking] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<RankedCandidateResult | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleAddCandidate = () => {
    if (!newCandidateName.trim() || !newCandidateResume.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both a name and a resume for the candidate.',
        variant: 'destructive',
      });
      return;
    }
    setCandidates([...candidates, { id: uuidv4(), name: newCandidateName, resume: newCandidateResume }]);
    setNewCandidateName('');
    setNewCandidateResume('');
    toast({
      title: 'Candidate Added',
      description: `${newCandidateName} has been added to the list.`,
    });
  };
  
  const handleRemoveCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  }

  const handleRank = async () => {
    setIsRanking(true);
    setRankedCandidates(null);
    const result = await performRanking(jobDescription, candidates);
    if (result.error) {
      toast({
        title: 'Ranking Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      setRankedCandidates(result.data || []);
    }
    setIsRanking(false);
  };

  const handleViewBreakdown = (candidate: RankedCandidateResult) => {
    setSelectedCandidate(candidate);
    setIsSheetOpen(true);
  };
  
  const canRank = jobDescription.trim() !== '' && candidates.length > 0;

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg">TalentRank AI</span>
            </Link>
            <Button size="sm" onClick={handleRank} disabled={!canRank || isRanking}>
              {isRanking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ranking...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Rank Candidates
                </>
              )}
            </Button>
          </div>
        </header>

        <main className="container grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
          {/* Left Column */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FilePlus className="text-primary"/> 1. Job Description</CardTitle>
                <CardDescription>Paste the job description below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g., Seeking a Senior Software Engineer with 5+ years of React experience..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] text-sm"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserPlus className="text-primary"/> 2. Add Candidates</CardTitle>
                <CardDescription>Add candidates you want to rank.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate-name">Candidate Name</Label>
                  <Input
                    id="candidate-name"
                    placeholder="e.g., Jane Doe"
                    value={newCandidateName}
                    onChange={(e) => setNewCandidateName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="candidate-resume">Resume Text</Label>
                  <Textarea
                    id="candidate-resume"
                    placeholder="Paste the candidate's full resume text here..."
                    value={newCandidateResume}
                    onChange={(e) => setNewCandidateResume(e.target.value)}
                    className="min-h-[150px] text-sm"
                  />
                </div>
                <Button onClick={handleAddCandidate} className="w-full">Add Candidate</Button>
              </CardContent>
            </Card>
            
            {candidates.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Candidate Pool</CardTitle>
                        <CardDescription>{candidates.length} candidate(s) added.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {candidates.map(c => (
                                <li key={c.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-secondary/50">
                                    <span>{c.name}</span>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveCandidate(c.id)}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Card className="min-h-[calc(100vh-10rem)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot className="text-primary"/> 3. AI Ranking Results</CardTitle>
                 <CardDescription>
                  {isRanking 
                    ? "Our AI is analyzing your candidates... this may take a moment."
                    : rankedCandidates 
                    ? `Showing ${rankedCandidates.length} ranked candidate(s).`
                    : "Click 'Rank Candidates' to see AI-powered results here."
                  }
                 </CardDescription>
              </CardHeader>
              <CardContent>
                {isRanking ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-1/3" />
                          <Skeleton className="h-6 w-1/4" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <div className="flex justify-end">
                          <Skeleton className="h-9 w-28" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : rankedCandidates ? (
                  rankedCandidates.length > 0 ? (
                    <div className="space-y-4">
                      {rankedCandidates.map((candidate, index) => (
                        <Card key={index} className="bg-card">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl font-headline">{candidate.name}</CardTitle>
                              <Badge className={`text-lg font-bold border-2 ${candidate.score > 80 ? 'border-accent text-accent' : candidate.score > 60 ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'}`} variant="outline">
                                {candidate.score}/100
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground italic">
                              <strong>AI Reasoning:</strong> {candidate.reasoning}
                            </p>
                            <Button size="sm" variant="outline" onClick={() => handleViewBreakdown(candidate)}>
                              View Detailed Breakdown <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                     <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>No Results</AlertTitle>
                        <AlertDescription>
                            The AI could not rank the candidates. Please check your inputs and try again.
                        </AlertDescription>
                    </Alert>
                  )
                ) : (
                  <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium text-muted-foreground">Results will appear here</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Add a job description and candidates to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {selectedCandidate && (
        <CandidateDetailSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          candidate={selectedCandidate}
          jobDescription={jobDescription}
        />
      )}
    </>
  );
}
