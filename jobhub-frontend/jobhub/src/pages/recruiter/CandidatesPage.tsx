import { useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { applicationService } from '@/api/applicationService';
import { CandidateCard } from '@/components/candidates/CandidateCard';
import { LoadingState, EmptyState } from '@/components/ui/States';

export default function CandidatesPage() {
  const { data: applications, isLoading } = useAsync(() => applicationService.getAllRecruiterApplications(), []);
  const [query, setQuery] = useState('');

  const candidates = useMemo(() => {
    if (!applications) return [];
    const seen = new Set<string>();
    return applications
      .filter((a) => {
        if (seen.has(a.candidateId)) return false;
        seen.add(a.candidateId);
        return true;
      })
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
      .filter(
        (a) =>
          !query ||
          a.candidateName.toLowerCase().includes(query.toLowerCase()) ||
          a.candidateHeadline?.toLowerCase().includes(query.toLowerCase())
      );
  }, [applications, query]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Candidates</h1>
        <p className="mt-1 text-sm text-slate-500">Everyone who has applied to your roles, ranked by match score.</p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 max-w-md">
        <Search size={16} className="text-slate-400" />
        <input
          placeholder="Search candidates by name or headline"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {isLoading ? (
        <LoadingState label="Loading candidates…" />
      ) : candidates.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {candidates.map((a) => (
            <CandidateCard key={a.candidateId} application={a} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Users size={20} />} title="No candidates found" description="Try a different search term." />
      )}
    </div>
  );
}
