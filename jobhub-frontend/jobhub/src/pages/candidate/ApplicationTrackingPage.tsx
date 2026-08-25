import { useState } from 'react';
import { FileCheck2 } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { applicationService } from '@/api/applicationService';
import { ApplicationCard } from '@/components/applications/ApplicationCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import type { ApplicationStatus } from '@/types';

const FILTERS: (ApplicationStatus | 'All')[] = [
  'All',
  'Applied',
  'Under Review',
  'Shortlisted',
  'Interview',
  'Selected',
  'Rejected',
];

export default function ApplicationTrackingPage() {
  const { data: applications, isLoading } = useAsync(() => applicationService.getMyApplications(), []);
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | 'All'>('All');

  const filtered = applications?.filter((a) => activeFilter === 'All' || a.status === activeFilter) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">My Applications</h1>
        <p className="mt-1 text-sm text-slate-500">Track every application from applied to hired.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === f ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingState label="Loading your applications…" />
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileCheck2 size={20} />}
          title="No applications here yet"
          description="Once you apply to jobs, they'll show up in this list."
        />
      )}
    </div>
  );
}
