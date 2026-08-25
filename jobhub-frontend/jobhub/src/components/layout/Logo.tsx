import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2 shrink-0', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
        <span className="relative flex h-3.5 w-3.5">
          <span className="absolute left-0 h-3.5 w-3.5 rounded-full bg-white" />
          <span className="absolute left-1.5 h-3.5 w-3.5 rounded-full bg-accent-400 opacity-90" />
        </span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-slate-900">JOBHUB</span>
    </Link>
  );
}
