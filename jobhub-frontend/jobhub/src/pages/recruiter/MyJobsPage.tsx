import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Users, Eye } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { recruiterService } from '@/api/recruiterService';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';
import { formatSalary, timeAgo } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  DRAFT: 'bg-slate-100 text-slate-500',
  CLOSED: 'bg-red-50 text-red-600',
};

export default function MyJobsPage() {
  const { data: jobs, isLoading } = useAsync(() => recruiterService.getMyJobs(), []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">My Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the roles you've posted on JOBHUB.</p>
        </div>
        <Link to="/recruiter/post-job">
          <Button>Post a Job</Button>
        </Link>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : jobs && jobs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <div key={job.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-base font-semibold text-slate-900">{job.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyles[job.status]}`}>{job.status}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} /> {job.jobType}
                  </span>
                  <span>{formatSalary(job)}</span>
                  <span>Posted {timeAgo(job.postedAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                  <Users size={14} /> {job.applicantCount} applicants
                </span>
                <Link to={`/recruiter/applications?jobId=${job.id}`}>
                  <Button size="sm" variant="outline" icon={<Eye size={14} />}>
                    View Applicants
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={<Briefcase size={20} />} title="No jobs posted yet" description="Post your first job to start receiving applications." />
      )}
    </div>
  );
}
