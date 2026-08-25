import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { useAsync } from '@/hooks/useAsync';
import { recruiterService } from '@/api/recruiterService';
import { applicationService } from '@/api/applicationService';
import { LoadingState } from '@/components/ui/States';

const PIPELINE_COLORS = ['#94A3B8', '#D97706', '#2563EB', '#5B45EA', '#16A34A'];

export default function AnalyticsPage() {
  const { data: series, isLoading: seriesLoading } = useAsync(() => recruiterService.getApplicationsOverTime(), []);
  const { data: applications, isLoading: appsLoading } = useAsync(
    () => applicationService.getAllRecruiterApplications(),
    []
  );

  const pipelineData = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'].map((status) => ({
    name: status,
    value: applications?.filter((a) => a.status === status).length ?? 0,
  }));

  const byJobMap = new Map<string, number>();
  applications?.forEach((a) => byJobMap.set(a.job.title, (byJobMap.get(a.job.title) ?? 0) + 1));
  const byJobData = Array.from(byJobMap.entries()).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">How your postings and hiring pipeline are trending.</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
        <h2 className="font-display text-sm font-semibold text-slate-900">Applications Over Time</h2>
        {seriesLoading ? (
          <LoadingState />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={series ?? []}>
              <defs>
                <linearGradient id="areaFillAnalytics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B45EA" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#5B45EA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#F1F0FB" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip />
              <Area type="monotone" dataKey="applications" stroke="#5B45EA" strokeWidth={2} fill="url(#areaFillAnalytics)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <h2 className="font-display text-sm font-semibold text-slate-900">Candidate Pipeline</h2>
          {appsLoading ? (
            <LoadingState />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={pipelineData}>
                <CartesianGrid vertical={false} stroke="#F1F0FB" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={24} />
                <Tooltip cursor={{ fill: '#F4F3FF' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={36}>
                  {pipelineData.map((_, i) => (
                    <Cell key={i} fill={PIPELINE_COLORS[i % PIPELINE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <h2 className="font-display text-sm font-semibold text-slate-900">Applications by Job</h2>
          {appsLoading ? (
            <LoadingState />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={byJobData} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid horizontal={false} stroke="#F1F0FB" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} width={130} />
                <Tooltip cursor={{ fill: '#F4F3FF' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#A855F7" maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
