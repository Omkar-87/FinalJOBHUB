import { cn } from '@/lib/utils';

export function Tag({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'muted' | 'missing';
  className?: string;
}) {
  const styles = {
    default: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-50 text-brand-700',
    muted: 'bg-slate-50 text-slate-400 border border-dashed border-slate-200',
    missing: 'bg-amber-50 text-amber-700',
  };
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', styles[variant], className)}>
      {children}
    </span>
  );
}
