import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Briefcase, FileCheck2, Users, Award, PlusCircle } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { useAuth } from '@/context/AuthContext';
import { recruiterService } from '@/api/recruiterService';
import { applicationService } from '@/api/applicationService';
import { StatisticsCard } from '@/components/ui/StatisticsCard';
import { CandidateCard } from '@/components/candidates/CandidateCard';
import { LoadingState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';

export default function RecruiterDashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAsync(() => recruiterService.getStats(), []);
  const { data: series } = useAsync(() => recruiterService.getApplicationsOverTime(), []);
  const { data: applications, isLoading: appsLoading } = useAsync(
    () => applicationService.getAllRecruiterApplications(),
    []
  );

  const byJobMap = new Map<string, number>();
  applications?.forEach((a) => byJobMap.set(a.job.title, (byJobMap.get(a.job.title) ?? 0) + 1));
  const byJobData = Array.from(byJobMap.entries()).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back,</p>
          <h1 className="font-display text-2xl font-bold text-slate-900">{user?.name}</h1>
        </div>
        <Link to="/recruiter/post-job">
          <Button icon={<PlusCircle size={16} />}>Post a Job</Button>
        </Link>
      </div>

      {statsLoading || !stats ? (
        <LoadingState />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatisticsCard label="Active Jobs" value={stats.activeJobs} icon={<Briefcase size={16} />} />
          <StatisticsCard label="Total Applications" value={stats.totalApplications} icon={<FileCheck2 size={16} />} accent="accent" />
          <StatisticsCard label="Shortlisted" value={stats.shortlisted} icon={<Users size={16} />} accent="amber" />
          <StatisticsCard label="Interviews" value={stats.interviews} icon={<Users size={16} />} accent="brand" />
          <StatisticsCard label="Hires" value={stats.hires} icon={<Award size={16} />} accent="emerald" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <h2 className="font-display text-sm font-semibold text-slate-900">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={series ?? []}>
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B45EA" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#5B45EA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#F1F0FB" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={24} />
              <Tooltip />
              <Area type="monotone" dataKey="applications" stroke="#5B45EA" strokeWidth={2} fill="url(#areaFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <h2 className="font-display text-sm font-semibold text-slate-900">Applications by Job</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={byJobData} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid horizontal={false} stroke="#F1F0FB" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} width={110} />
              <Tooltip cursor={{ fill: '#F4F3FF' }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#A855F7" maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">Recent Candidates</h2>
          <Link to="/recruiter/candidates" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        {appsLoading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {applications?.slice(0, 4).map((a) => (
              <CandidateCard key={a.id} application={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
