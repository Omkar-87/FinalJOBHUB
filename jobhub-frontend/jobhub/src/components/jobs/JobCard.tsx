import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Briefcase } from 'lucide-react';
import type { Job } from '@/types';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { cn, formatSalary, timeAgo } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  compact?: boolean;
}

export function JobCard({ job, isSaved, onToggleSave, onApply, compact }: JobCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-base font-bold text-brand-700">
            {job.companyName[0]}
          </span>
          <div className="min-w-0">
            <Link
              to={`/candidate/jobs/${job.id}`}
              className="block truncate font-display text-base font-semibold text-slate-900 group-hover:text-brand-700"
            >
              {job.title}
            </Link>
            <p className="truncate text-sm text-slate-500">{job.companyName}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleSave?.(job.id)}
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
            isSaved ? 'bg-brand-50 text-brand-600' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-500'
          )}
        >
          <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin size={13} /> {job.location} · {job.workMode}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase size={13} /> {job.jobType} · {job.experience}
        </span>
      </div>

      {!compact && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {job.skills.length > 4 && <Tag variant="muted">+{job.skills.length - 4}</Tag>}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3.5">
        <div>
          <p className="font-mono text-sm font-semibold text-slate-900">{formatSalary(job)}</p>
          <p className="text-[11px] text-slate-400">Posted {timeAgo(job.postedAt)}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/candidate/jobs/${job.id}`}>
            <Button variant="outline" size="sm">
              Details
            </Button>
          </Link>
          <Button size="sm" onClick={() => onApply?.(job.id)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
