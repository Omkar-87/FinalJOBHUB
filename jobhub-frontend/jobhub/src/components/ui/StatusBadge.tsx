import type { ApplicationStatus } from '@/types';
import { cn } from '@/lib/utils';

const styles: Record<ApplicationStatus, string> = {
  Applied: 'bg-slate-100 text-slate-600',
  'Under Review': 'bg-amber-50 text-amber-700',
  Shortlisted: 'bg-blue-50 text-blue-700',
  Interview: 'bg-brand-50 text-brand-700',
  Selected: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-600',
};

const dotStyles: Record<ApplicationStatus, string> = {
  Applied: 'bg-slate-400',
  'Under Review': 'bg-amber-500',
  Shortlisted: 'bg-blue-500',
  Interview: 'bg-brand-500',
  Selected: 'bg-emerald-500',
  Rejected: 'bg-red-500',
};

export function StatusBadge({ status, className }: { status: ApplicationStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        styles[status],
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[status])} />
      {status}
    </span>
  );
}
