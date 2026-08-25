import { Link } from 'react-router-dom';
import { Building2, Calendar, ExternalLink } from 'lucide-react';
import type { Application } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';

export function ApplicationCard({ application }: { application: Application }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3 min-w-0">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-base font-bold text-brand-700">
          {application.job.companyName[0]}
        </span>
        <div className="min-w-0">
          <Link
            to={`/candidate/jobs/${application.jobId}`}
            className="block truncate font-display text-sm font-semibold text-slate-900 hover:text-brand-700"
          >
            {application.job.title}
          </Link>
          <p className="flex items-center gap-1 truncate text-xs text-slate-500">
            <Building2 size={12} /> {application.job.companyName}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar size={11} /> Applied {formatDate(application.appliedDate)} · Updated{' '}
            {formatDate(application.lastUpdated)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
        <StatusBadge status={application.status} />
        <Link
          to={`/candidate/applications/${application.id}`}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
        >
          Track <ExternalLink size={11} />
        </Link>
      </div>
    </div>
  );
}
