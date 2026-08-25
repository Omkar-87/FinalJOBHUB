import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { recruiterService } from '@/api/recruiterService';
import { applicationService } from '@/api/applicationService';
import { CandidateCard } from '@/components/candidates/CandidateCard';
import { Select } from '@/components/ui/Select';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { cn } from '@/lib/utils';
import type { Application, ApplicationStatus } from '@/types';

const PIPELINE: { status: ApplicationStatus; label: string }[] = [
  { status: 'Applied', label: 'Applied' },
  { status: 'Under Review', label: 'Screening' },
  { status: 'Shortlisted', label: 'Shortlisted' },
  { status: 'Interview', label: 'Interview' },
  { status: 'Selected', label: 'Selected' },
];

export default function RecruiterApplicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const jobIdParam = searchParams.get('jobId') ?? '';
  const { data: jobs } = useAsync(() => recruiterService.getMyJobs(), []);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus | 'All' | 'Rejected'>('All');

  useEffect(() => {
    setIsLoading(true);
    const loader = jobIdParam
      ? applicationService.getApplicationsForJob(jobIdParam)
      : applicationService.getAllRecruiterApplications();
    loader.then((data) => {
      setApplications(data);
      setIsLoading(false);
    });
  }, [jobIdParam]);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    await applicationService.updateStatus(id, status);
  };

  const counts = PIPELINE.map((p) => ({ ...p, count: applications.filter((a) => a.status === p.status).length }));
  const filtered = applications.filter((a) => activeStatus === 'All' || a.status === activeStatus);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Applications</h1>
          <p className="mt-1 text-sm text-slate-500">Review and move candidates through your hiring pipeline.</p>
        </div>
        <Select
          value={jobIdParam}
          onChange={(e) => setSearchParams(e.target.value ? { jobId: e.target.value } : {})}
          containerClassName="sm:w-64"
        >
          <option value="">All jobs</option>
          {jobs?.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </Select>
      </div>

      {/* Visual pipeline */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {counts.map((p) => (
          <button
            key={p.status}
            onClick={() => setActiveStatus(p.status)}
            className={cn(
              'rounded-2xl border p-4 text-left transition-colors',
              activeStatus === p.status ? 'border-brand-300 bg-brand-50' : 'border-slate-100 bg-white hover:border-brand-200'
            )}
          >
            <p className="font-mono text-2xl font-bold text-slate-900">{p.count}</p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">{p.label}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['All', 'Rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setActiveStatus(f)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
              activeStatus === f ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingState label="Loading applications…" />
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((a) => (
            <CandidateCard
              key={a.id}
              application={a}
              onShortlist={(id) => updateStatus(id, 'Shortlisted')}
              onReject={(id) => updateStatus(id, 'Rejected')}
              onScheduleInterview={(id) => updateStatus(id, 'Interview')}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Users size={20} />} title="No candidates in this stage" description="Try a different filter or job." />
      )}
    </div>
  );
}
