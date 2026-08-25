import { useParams } from 'react-router-dom';
import { Globe, MapPin, Users, Briefcase } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { recruiterService } from '@/api/recruiterService';
import { jobService } from '@/api/jobService';
import { JobCard } from '@/components/jobs/JobCard';
import { LoadingState, EmptyState } from '@/components/ui/States';

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: company, isLoading } = useAsync(() => recruiterService.getCompany(id), [id]);
  const { data: jobsResult } = useAsync(() => jobService.getJobs({ pageSize: 50 }), []);

  const openJobs = jobsResult?.items.filter((j) => j.companyId === id) ?? [];

  if (isLoading) return <LoadingState label="Loading company…" />;
  if (!company) return <EmptyState title="Company not found" />;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 font-display text-2xl font-bold text-brand-700">
            {company.name[0]}
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">{company.name}</h1>
            <p className="text-sm text-slate-500">{company.industry}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {company.location}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} /> {company.employeeCount} employees
              </span>
              <a href={company.website} className="flex items-center gap-1 text-brand-600 hover:underline">
                <Globe size={12} /> Website
              </a>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{company.about}</p>
      </div>

      <div>
        <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-slate-900">
          <Briefcase size={17} className="text-brand-600" /> Open Positions ({openJobs.length})
        </h2>
        {openJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {openJobs.map((job) => (
              <JobCard key={job.id} job={job} compact />
            ))}
          </div>
        ) : (
          <EmptyState title="No open roles right now" description="Check back soon for new openings." />
        )}
      </div>
    </div>
  );
}
