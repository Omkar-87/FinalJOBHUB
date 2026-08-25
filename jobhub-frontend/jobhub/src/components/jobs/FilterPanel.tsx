import { useState } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import type { JobFilters, JobType, WorkMode } from '@/types';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';

const JOB_TYPES: JobType[] = ['Full Time', 'Part Time', 'Internship', 'Contract'];
const WORK_MODES: WorkMode[] = ['Remote', 'Hybrid', 'On-site'];
const EXPERIENCE_LEVELS = ['0–1 years', '0–2 years', '1–3 years', '2–4 years', '3–6 years'];
const DATE_OPTIONS: { value: JobFilters['datePosted']; label: string }[] = [
  { value: 'ANY', label: 'Any time' },
  { value: '24H', label: 'Past 24 hours' },
  { value: '7D', label: 'Past week' },
  { value: '30D', label: 'Past month' },
];
const COMMON_SKILLS = ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Python'];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 py-4 first:pt-0 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        <ChevronDown size={15} className={cn('text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-3 flex flex-col gap-2.5">{children}</div>}
    </div>
  );
}

interface FilterPanelProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const toggleArrayValue = <K extends 'jobType' | 'workMode' | 'experience' | 'skills'>(key: K, value: string) => {
    const current = (filters[key] as string[] | undefined) ?? [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [key]: next, page: 1 });
  };

  const reset = () =>
    onChange({ query: filters.query, location: filters.location, page: 1, pageSize: filters.pageSize });

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between pb-1">
        <h3 className="font-display text-sm font-semibold text-slate-900">Filters</h3>
        <button onClick={reset} className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-brand-600">
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <FilterSection title="Job type">
        {JOB_TYPES.map((t) => (
          <Checkbox
            key={t}
            label={t}
            checked={filters.jobType?.includes(t) ?? false}
            onChange={() => toggleArrayValue('jobType', t)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Remote / Hybrid / On-site">
        {WORK_MODES.map((m) => (
          <Checkbox
            key={m}
            label={m}
            checked={filters.workMode?.includes(m) ?? false}
            onChange={() => toggleArrayValue('workMode', m)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Experience" defaultOpen={false}>
        {EXPERIENCE_LEVELS.map((e) => (
          <Checkbox
            key={e}
            label={e}
            checked={filters.experience?.includes(e) ?? false}
            onChange={() => toggleArrayValue('experience', e)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Skills" defaultOpen={false}>
        {COMMON_SKILLS.map((s) => (
          <Checkbox
            key={s}
            label={s}
            checked={filters.skills?.includes(s) ?? false}
            onChange={() => toggleArrayValue('skills', s)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Date posted" defaultOpen={false}>
        {DATE_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
            <input
              type="radio"
              name="datePosted"
              checked={(filters.datePosted ?? 'ANY') === opt.value}
              onChange={() => onChange({ ...filters, datePosted: opt.value, page: 1 })}
              className="h-3.5 w-3.5 accent-brand-600"
            />
            {opt.label}
          </label>
        ))}
      </FilterSection>
    </div>
  );
}
