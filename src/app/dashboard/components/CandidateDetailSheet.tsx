'use client';

import { useEffect, useState } from 'react';
import type { RankedCandidateResult, ScoreBreakdownResult } from '@/lib/types';
import { getBreakdown } from '../actions';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, List, Rss, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface CandidateDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: RankedCandidateResult | null;
  jobDescription: string;
}

export function CandidateDetailSheet({
  open,
  onOpenChange,
  candidate,
  jobDescription,
}: CandidateDetailSheetProps) {
  const [breakdown, setBreakdown] = useState<ScoreBreakdownResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && candidate) {
      const fetchBreakdown = async () => {
        setIsLoading(true);
        setBreakdown(null);
        const result = await getBreakdown(jobDescription, candidate.resumeContent);
        if (result.error) {
          toast({
            title: 'Analysis Error',
            description: result.error,
            variant: 'destructive',
          });
        } else {
          setBreakdown(result.data || null);
        }
        setIsLoading(false);
      };
      fetchBreakdown();
    }
  }, [open, candidate, jobDescription, toast]);

  const scoreColor = breakdown?.overallScore ?? 0 > 80 ? 'bg-accent' : breakdown?.overallScore ?? 0 > 60 ? 'bg-primary' : 'bg-muted-foreground';


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-headline text-3xl">
            AI Score Breakdown
          </SheetTitle>
          <SheetDescription>
            Detailed analysis for <span className="font-bold text-primary">{candidate?.name}</span>
          </SheetDescription>
        </SheetHeader>
        
        {isLoading && (
            <div className="space-y-8">
                <div className="space-y-3">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                </div>
                 <Separator/>
                <div className="space-y-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                 <div className="space-y-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        )}

        {breakdown && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Overall Compatibility Score</h3>
                <Badge className="text-xl font-bold border-2 border-primary text-primary" variant="outline">
                    {breakdown.overallScore}/100
                </Badge>
              </div>
              <Progress value={breakdown.overallScore} className={`h-3 ${scoreColor}`} />
            </div>

            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><CheckCircle2 className="text-accent"/> Strengths</h3>
              <ul className="space-y-3">
                {breakdown.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><XCircle className="text-destructive"/> Weaknesses</h3>
              <ul className="space-y-3">
                {breakdown.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive/80 flex-shrink-0 mt-1" />
                     <span className="text-muted-foreground">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

             <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><List className="text-primary"/> AI Rationale</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{breakdown.rationale}</p>
            </div>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
