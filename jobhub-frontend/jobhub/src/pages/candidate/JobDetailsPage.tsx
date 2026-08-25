import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Wallet,
  Calendar,
  Bookmark,
  Building2,
  Users,
} from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { jobService } from '@/api/jobService';
import { candidateService } from '@/api/candidateService';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { JobCard } from '@/components/jobs/JobCard';
import { formatSalary, timeAgo, daysUntil, formatDate } from '@/lib/utils';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading } = useAsync(() => jobService.getJobById(id!), [id]);
  const { data: similarJobs } = useAsync(() => jobService.getSimilarJobs(id!, 3), [id]);
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = async () => {
    if (!id) return;
    if (isSaved) await candidateService.unsaveJob(id);
    else await candidateService.saveJob(id);
    setIsSaved((v) => !v);
  };

  if (isLoading) return <LoadingState label="Loading job details…" />;
  if (!job) return <EmptyState title="Job not found" description="This listing may have been removed." />;

  const deadlineDays = daysUntil(job.applicationDeadline);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 font-display text-xl font-bold text-brand-700">
                {job.companyName[0]}
              </span>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">{job.title}</h1>
                <p className="mt-1 text-sm font-medium text-slate-600">{job.companyName}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {job.location} · {job.workMode}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet size={13} /> {formatSalary(job)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={13} /> {job.jobType} · {job.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> Posted {timeAgo(job.postedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <Tag key={s} variant="brand">
                {s}
              </Tag>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate(`/candidate/apply/${job.id}`)}>
              Apply Now
            </Button>
            <Button size="lg" variant="outline" icon={<Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />} onClick={toggleSave}>
              {isSaved ? 'Saved' : 'Save Job'}
            </Button>
          </div>
        </div>

        {[
          { title: 'Job Description', items: [job.description] },
          { title: 'Responsibilities', items: job.responsibilities },
          { title: 'Required Skills', items: job.requiredSkills },
          { title: 'Preferred Skills', items: job.preferredSkills },
          { title: 'Qualifications', items: job.qualifications },
        ].map((section) => (
          <div key={section.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <h2 className="font-display text-base font-semibold text-slate-900">{section.title}</h2>
            {section.title === 'Job Description' ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.items[0]}</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="font-display text-base font-semibold text-slate-900">About the Company</h2>
          <p className="mt-1 text-sm font-medium text-slate-700">{job.companyName}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Explore open roles and culture on the {job.companyName} company page.
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate(`/company/${job.companyId}`)}>
            View company profile
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <h3 className="font-display text-sm font-semibold text-slate-900">Company Information</h3>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 font-display font-bold text-brand-700">
              {job.companyName[0]}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-800">{job.companyName}</p>
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <Building2 size={11} /> {job.location}
              </p>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <Users size={12} /> {job.applicantCount} applicants so far
          </p>
        </div>

        {deadlineDays !== null && (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
            <h3 className="font-display text-sm font-semibold text-amber-800">Application Deadline</h3>
            <p className="mt-1 text-sm text-amber-700">
              {formatDate(job.applicationDeadline!)} · {deadlineDays} day{deadlineDays === 1 ? '' : 's'} left
            </p>
          </div>
        )}

        {similarJobs && similarJobs.length > 0 && (
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold text-slate-900">Similar Jobs</h3>
            <div className="flex flex-col gap-3">
              {similarJobs.map((j) => (
                <JobCard key={j.id} job={j} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
