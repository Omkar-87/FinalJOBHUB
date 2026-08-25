import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import type { Company } from '@/types';

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link
      to={`/company/${company.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft-lg"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-bold text-brand-700">
        {company.name[0]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-slate-900 group-hover:text-brand-700">
          {company.name}
        </p>
        <p className="truncate text-xs text-slate-500">{company.industry}</p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {company.location}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} /> {company.employeeCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
