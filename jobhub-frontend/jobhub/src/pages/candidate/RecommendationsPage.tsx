import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { recommendationService } from '@/api/recommendationService';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { formatSalary } from '@/lib/utils';
import { cn } from '@/lib/utils';

function matchColor(pct: number) {
  if (pct >= 85) return 'text-emerald-600 bg-emerald-50';
  if (pct >= 70) return 'text-brand-600 bg-brand-50';
  return 'text-amber-600 bg-amber-50';
}

export default function RecommendationsPage() {
  const { data: recommendations, isLoading } = useAsync(() => recommendationService.getRecommendations(), []);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-purple-50 p-6">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-brand-600" />
          <h1 className="font-display text-xl font-bold text-slate-900">Recommended For You</h1>
        </div>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          JOBHUB analyzes your profile, skills, experience and interests to find opportunities that match you.
        </p>
      </div>

      {isLoading ? (
        <LoadingState label="Finding your best matches…" />
      ) : recommendations && recommendations.length > 0 ? (
        <div className="flex flex-col gap-4">
          {recommendations.map((rec) => (
            <div key={rec.job.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-base font-bold text-brand-700">
                    {rec.job.companyName[0]}
                  </span>
                  <div>
                    <Link to={`/candidate/jobs/${rec.job.id}`} className="font-display text-base font-semibold text-slate-900 hover:text-brand-700">
                      {rec.job.title}
                    </Link>
                    <p className="text-sm text-slate-500">{rec.job.companyName}</p>
                    <p className="mt-0.5 font-mono text-xs font-medium text-slate-600">{formatSalary(rec.job)}</p>
                  </div>
                </div>
                <span className={cn('shrink-0 rounded-xl px-3 py-1.5 text-center font-mono text-lg font-bold', matchColor(rec.matchPercent))}>
                  {rec.matchPercent}%
                </span>
              </div>

              <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{rec.reason}</p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <CheckCircle2 size={12} /> Matching skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.matchingSkills.map((s) => (
                      <Tag key={s} variant="brand">{s}</Tag>
                    ))}
                  </div>
                </div>
                {rec.missingSkills.length > 0 && (
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-amber-600">
                      <XCircle size={12} /> Missing
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.missingSkills.map((s) => (
                        <Tag key={s} variant="missing">{s}</Tag>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end border-t border-slate-50 pt-3.5">
                <Link to={`/candidate/jobs/${rec.job.id}`}>
                  <Button size="sm">View Job</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={<Sparkles size={20} />} title="No recommendations yet" description="Complete your profile to get personalized matches." />
      )}
    </div>
  );
}
