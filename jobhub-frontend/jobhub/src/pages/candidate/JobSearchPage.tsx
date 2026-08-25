import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { jobService } from '@/api/jobService';
import { candidateService } from '@/api/candidateService';
import { JobCard } from '@/components/jobs/JobCard';
import { FilterPanel } from '@/components/jobs/FilterPanel';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { JobFilters } from '@/types';

export default function JobSearchPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<JobFilters>({
    query: searchParams.get('q') ?? '',
    location: '',
    page: 1,
    pageSize: 6,
  });
  const [locationInput, setLocationInput] = useState('');
  const [queryInput, setQueryInput] = useState(filters.query ?? '');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    candidateService.getSavedJobs().then((saved) => setSavedIds(new Set(saved.map((s) => s.jobId))));
  }, []);

  const { data: result, isLoading } = useAsync(() => jobService.getJobs(filters), [JSON.stringify(filters)]);

  const toggleSave = async (jobId: string) => {
    const next = new Set(savedIds);
    if (next.has(jobId)) {
      next.delete(jobId);
      await candidateService.unsaveJob(jobId);
    } else {
      next.add(jobId);
      await candidateService.saveJob(jobId);
    }
    setSavedIds(next);
  };

  const handleSearch = () => setFilters((f) => ({ ...f, query: queryInput, location: locationInput, page: 1 }));

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5">
            <Search size={16} className="text-slate-400" />
            <input
              placeholder="Search job title, skills, or company"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 sm:w-56">
            <MapPin size={16} className="text-slate-400" />
            <input
              placeholder="Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <Button onClick={handleSearch} size="lg">
            Search
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="lg:hidden"
            icon={<SlidersHorizontal size={16} />}
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FilterPanel filters={filters} onChange={setFilters} />
        </div>

        <Modal isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} title="Filters">
          <FilterPanel filters={filters} onChange={setFilters} />
        </Modal>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {result ? `${result.totalItems} jobs found` : 'Searching…'}
            </p>
          </div>

          {isLoading ? (
            <LoadingState label="Finding the best matches…" />
          ) : result && result.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {result.items.map((job) => (
                  <JobCard key={job.id} job={job} isSaved={savedIds.has(job.id)} onToggleSave={toggleSave} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination
                  page={result.page}
                  totalPages={result.totalPages}
                  onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
                />
              </div>
            </>
          ) : (
            <EmptyState
              icon={<Search size={20} />}
              title="No jobs match your filters"
              description="Try widening your search or clearing a few filters."
            />
          )}
        </div>
      </div>
    </div>
  );
}
