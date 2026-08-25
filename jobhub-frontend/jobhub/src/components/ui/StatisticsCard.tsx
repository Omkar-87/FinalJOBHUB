import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatisticsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: string; positive?: boolean };
  accent?: 'brand' | 'accent' | 'emerald' | 'amber';
}

const accentClasses = {
  brand: 'bg-brand-50 text-brand-600',
  accent: 'bg-purple-50 text-accent-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
};

export function StatisticsCard({ label, value, icon, trend, accent = 'brand' }: StatisticsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        {icon && (
          <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', accentClasses[accent])}>
            {icon}
          </span>
        )}
      </div>
      <p className="font-mono mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {trend && (
        <p className={cn('mt-1.5 text-xs font-medium', trend.positive ? 'text-emerald-600' : 'text-slate-400')}>
          {trend.value}
        </p>
      )}
    </div>
  );
}
