import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { candidateService } from '@/api/candidateService';
import { jobService } from '@/api/jobService';
import { JobCard } from '@/components/jobs/JobCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import type { Job } from '@/types';

export default function SavedJobsPage() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const { data: savedJobs, isLoading, refetch } = useAsync(async () => {
    const saved = await candidateService.getSavedJobs();
    setSavedIds(new Set(saved.map((s) => s.jobId)));
    const jobs = await Promise.all(saved.map((s) => jobService.getJobById(s.jobId)));
    return jobs.filter(Boolean) as Job[];
  }, []);

  const toggleSave = async (jobId: string) => {
    await candidateService.unsaveJob(jobId);
    refetch();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Saved Jobs</h1>
        <p className="mt-1 text-sm text-slate-500">Jobs you've bookmarked to revisit later.</p>
      </div>

      {isLoading ? (
        <LoadingState label="Loading saved jobs…" />
      ) : savedJobs && savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} isSaved={savedIds.has(job.id)} onToggleSave={toggleSave} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Bookmark size={20} />} title="No saved jobs yet" description="Tap the bookmark icon on any job to save it here." />
      )}
    </div>
  );
}
