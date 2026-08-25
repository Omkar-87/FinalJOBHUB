import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, Bookmark, Clock3, FileCheck2, Sparkles } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useAuth } from '@/context/AuthContext';
import { applicationService } from '@/api/applicationService';
import { recommendationService } from '@/api/recommendationService';
import { candidateService } from '@/api/candidateService';
import { jobService } from '@/api/jobService';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { JobCard } from '@/components/jobs/JobCard';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';
import type { Job } from '@/types';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAsync(() => applicationService.getStats(), []);
  const { data: recommendations, isLoading: recsLoading } = useAsync(
    () => recommendationService.getRecommendations(),
    []
  );
  const { data: recentlyViewedIds } = useAsync(() => candidateService.getRecentlyViewed(), []);
  const { data: recentlyViewedJobs, isLoading: rvLoading } = useAsync(async () => {
    if (!recentlyViewedIds) return [] as Job[];
    const jobs = await Promise.all(recentlyViewedIds.map((id) => jobService.getJobById(id)));
    return jobs.filter(Boolean) as Job[];
  }, [recentlyViewedIds]);
  const { data: savedJobs, isLoading: savedLoading } = useAsync(async () => {
    const saved = await candidateService.getSavedJobs();
    const jobs = await Promise.all(saved.map((s) => jobService.getJobById(s.jobId)));
    return jobs.filter(Boolean) as Job[];
  }, []);

  const chartData = stats
    ? [
        { name: 'Applied', value: stats.applied },
        { name: 'Review', value: stats.underReview },
        { name: 'Shortlist', value: stats.shortlisted },
        { name: 'Interview', value: stats.interview },
        { name: 'Rejected', value: stats.rejected },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <p className="text-sm text-slate-500">{getGreeting()},</p>
        <h1 className="font-display text-2xl font-bold text-slate-900">{user?.name ?? 'there'} 👋</h1>
        <p className="mt-1 text-sm text-slate-500">Here's what's happening with your job search today.</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link to="/candidate/jobs">
            <Button size="sm">Find Jobs</Button>
          </Link>
          <Link to="/candidate/recommendations">
            <Button size="sm" variant="outline" icon={<Sparkles size={14} />}>
              View Recommendations
            </Button>
          </Link>
        </div>
      </div>

      {/* Application statistics */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">Application Statistics</h2>
          <Link to="/candidate/applications" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        {statsLoading || !stats ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
            <StatisticsCard label="Applied" value={stats.applied} icon={<FileCheck2 size={16} />} />
            <StatisticsCard label="Under Review" value={stats.underReview} icon={<Clock3 size={16} />} accent="amber" />
            <StatisticsCard label="Shortlisted" value={stats.shortlisted} icon={<FileCheck2 size={16} />} accent="accent" />
            <StatisticsCard label="Interview" value={stats.interview} icon={<Sparkles size={16} />} accent="brand" />
            <StatisticsCard label="Rejected" value={stats.rejected} icon={<FileCheck2 size={16} />} />
            <div className="col-span-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft lg:col-span-2">
              <p className="mb-1 text-xs font-medium text-slate-400">Pipeline overview</p>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} stroke="#F1F0FB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F4F3FF' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#5B45EA" maxBarSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Recommended jobs */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">Recommended For You</h2>
          <Link to="/candidate/recommendations" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            See all <ArrowUpRight size={14} />
          </Link>
        </div>
        {recsLoading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations?.slice(0, 3).map((r) => <JobCard key={r.job.id} job={r.job} compact />)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recently viewed */}
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-slate-900">Recently Viewed Jobs</h2>
          {rvLoading ? (
            <LoadingState />
          ) : recentlyViewedJobs && recentlyViewedJobs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recentlyViewedJobs.map((j) => (
                <JobCard key={j.id} job={j} compact />
              ))}
            </div>
          ) : (
            <EmptyState icon={<Clock3 size={20} />} title="Nothing viewed yet" description="Jobs you open will show up here." />
          )}
        </div>

        {/* Saved jobs */}
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-slate-900">Saved Jobs</h2>
          {savedLoading ? (
            <LoadingState />
          ) : savedJobs && savedJobs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {savedJobs.map((j) => (
                <JobCard key={j.id} job={j} isSaved compact />
              ))}
            </div>
          ) : (
            <EmptyState icon={<Bookmark size={20} />} title="No saved jobs" description="Save jobs while browsing to find them here later." />
          )}
        </div>
      </div>
    </div>
  );
}
