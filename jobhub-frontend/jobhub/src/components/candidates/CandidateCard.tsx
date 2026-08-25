import { GraduationCap, Briefcase, FileText, Calendar } from 'lucide-react';
import type { Application } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';

interface CandidateCardProps {
  application: Application;
  onViewProfile?: (id: string) => void;
  onViewResume?: (id: string) => void;
  onShortlist?: (id: string) => void;
  onReject?: (id: string) => void;
  onScheduleInterview?: (id: string) => void;
}

export function CandidateCard({
  application,
  onViewProfile,
  onViewResume,
  onShortlist,
  onReject,
  onScheduleInterview,
}: CandidateCardProps) {
  const a = application;
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <Avatar name={a.candidateName} size="lg" />
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-slate-900">{a.candidateName}</p>
            <p className="truncate text-xs text-slate-500">{a.candidateHeadline}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Briefcase size={11} /> {a.candidateExperience}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap size={11} /> {a.candidateEducation}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={11} /> Applied {formatDate(a.appliedDate)}
              </span>
            </div>
          </div>
        </div>
        {a.matchScore != null && (
          <div className="shrink-0 rounded-xl bg-brand-50 px-2.5 py-1.5 text-center">
            <p className="font-mono text-sm font-bold text-brand-700">{a.matchScore}%</p>
            <p className="text-[9px] font-medium uppercase tracking-wide text-brand-400">Match</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3.5">
        <StatusBadge status={a.status} />
        <button
          onClick={() => onViewResume?.(a.id)}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
        >
          <FileText size={12} /> Resume
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => onViewProfile?.(a.id)}>
          View Profile
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onShortlist?.(a.id)}>
          Shortlist
        </Button>
        <Button size="sm" variant="outline" onClick={() => onScheduleInterview?.(a.id)}>
          Schedule Interview
        </Button>
        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => onReject?.(a.id)}>
          Reject
        </Button>
      </div>
    </div>
  );
}
