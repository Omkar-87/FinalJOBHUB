import { useParams, Link } from 'react-router-dom';
import { Check, X, Building2, FileText } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { applicationService } from '@/api/applicationService';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { cn, formatDate, formatSalary } from '@/lib/utils';
import type { ApplicationStatus } from '@/types';

const PIPELINE: ApplicationStatus[] = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'];

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: application, isLoading } = useAsync(() => applicationService.getApplicationById(id!), [id]);

  if (isLoading) return <LoadingState label="Loading application…" />;
  if (!application) return <EmptyState title="Application not found" />;

  const isRejected = application.status === 'Rejected';
  const currentIndex = isRejected ? -1 : PIPELINE.indexOf(application.status);

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-bold text-brand-700">
              {application.job.companyName[0]}
            </span>
            <div>
              <Link to={`/candidate/jobs/${application.jobId}`} className="font-display text-lg font-bold text-slate-900 hover:text-brand-700">
                {application.job.title}
              </Link>
              <p className="flex items-center gap-1 text-sm text-slate-500">
                <Building2 size={13} /> {application.job.companyName}
              </p>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-50 pt-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-400">Applied</p>
            <p className="mt-0.5 font-medium text-slate-700">{formatDate(application.appliedDate)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Last updated</p>
            <p className="mt-0.5 font-medium text-slate-700">{formatDate(application.lastUpdated)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Salary</p>
            <p className="mt-0.5 font-medium text-slate-700">{formatSalary(application.job)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Application ID</p>
            <p className="mt-0.5 font-mono text-xs font-medium text-slate-700">{application.id}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <h2 className="font-display text-base font-semibold text-slate-900">Application Timeline</h2>

        {isRejected && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
              <X size={16} />
            </span>
            <p className="text-sm text-red-700">This application was not selected to move forward.</p>
          </div>
        )}

        <div className="mt-5 flex flex-col">
          {PIPELINE.map((stage, i) => {
            const done = !isRejected && i <= currentIndex;
            const isCurrent = !isRejected && i === currentIndex;
            return (
              <div key={stage} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                      done ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400',
                      isCurrent && 'ring-4 ring-brand-100'
                    )}
                  >
                    {done ? <Check size={14} /> : i + 1}
                  </span>
                  {i < PIPELINE.length - 1 && <span className={cn('h-10 w-0.5', done ? 'bg-brand-600' : 'bg-slate-100')} />}
                </div>
                <div className="pb-8">
                  <p className={cn('text-sm font-medium', done ? 'text-slate-900' : 'text-slate-400')}>{stage}</p>
                  {isCurrent && <p className="text-xs text-brand-500">Current stage</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Link to={`/candidate/jobs/${application.jobId}`}>
          <Button variant="outline">View Job</Button>
        </Link>
        <Button variant="outline" icon={<FileText size={15} />}>
          View Resume
        </Button>
      </div>
    </div>
  );
}
