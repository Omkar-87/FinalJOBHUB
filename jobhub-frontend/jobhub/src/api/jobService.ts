import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { jobs as mockJobs } from '@/data/mockData';
import type { Job, JobFilters, PaginatedResult } from '@/types';

function applyFilters(all: Job[], filters: JobFilters): Job[] {
  let result = [...all];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
    );
  }
  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((j) => j.location.toLowerCase().includes(loc));
  }
  if (filters.jobType?.length) {
    result = result.filter((j) => filters.jobType!.includes(j.jobType));
  }
  if (filters.workMode?.length) {
    result = result.filter((j) => filters.workMode!.includes(j.workMode));
  }
  if (filters.skills?.length) {
    result = result.filter((j) => filters.skills!.some((s) => j.skills.includes(s)));
  }
  if (filters.datePosted && filters.datePosted !== 'ANY') {
    const hoursMap = { '24H': 24, '7D': 24 * 7, '30D': 24 * 30 };
    const maxAgeMs = hoursMap[filters.datePosted] * 3600 * 1000;
    result = result.filter((j) => Date.now() - new Date(j.postedAt).getTime() <= maxAgeMs);
  }
  return result;
}

export const jobService = {
  // GET /api/jobs
  async getJobs(filters: JobFilters = {}): Promise<PaginatedResult<Job>> {
    if (USE_MOCK_DATA) {
      const filtered = applyFilters(mockJobs, filters).sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
      const page = filters.page ?? 1;
      const pageSize = filters.pageSize ?? 10;
      const start = (page - 1) * pageSize;
      const items = filtered.slice(start, start + pageSize);
      return mockDelay({
        items,
        page,
        pageSize,
        totalItems: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
      });
    }
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return http.get<PaginatedResult<Job>>(`/jobs?${params}`);
  },

  // GET /api/jobs/{id}
  async getJobById(id: string): Promise<Job | undefined> {
    if (USE_MOCK_DATA) return mockDelay(mockJobs.find((j) => j.id === id));
    return http.get<Job>(`/jobs/${id}`);
  },

  // GET /api/jobs?similarTo={id}
  async getSimilarJobs(id: string, limit = 4): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      const job = mockJobs.find((j) => j.id === id);
      if (!job) return mockDelay([]);
      const similar = mockJobs
        .filter((j) => j.id !== id && j.skills.some((s) => job.skills.includes(s)))
        .slice(0, limit);
      return mockDelay(similar);
    }
    return http.get<Job[]>(`/jobs/${id}/similar`);
  },

  // POST /api/jobs
  async createJob(payload: Partial<Job>): Promise<Job> {
    if (USE_MOCK_DATA) {
      const newJob: Job = {
        id: `j-new-${Date.now()}`,
        title: payload.title ?? 'Untitled role',
        companyId: payload.companyId ?? 'c1',
        companyName: payload.companyName ?? 'Nimbus Cloud',
        location: payload.location ?? '',
        workMode: payload.workMode ?? 'On-site',
        salaryMin: payload.salaryMin ?? 0,
        salaryMax: payload.salaryMax ?? 0,
        currency: payload.currency ?? 'INR',
        salaryPeriod: payload.salaryPeriod ?? 'LPA',
        jobType: payload.jobType ?? 'Full Time',
        experience: payload.experience ?? '0–2 years',
        skills: payload.skills ?? [],
        postedAt: new Date().toISOString(),
        applicationDeadline: payload.applicationDeadline,
        description: payload.description ?? '',
        responsibilities: payload.responsibilities ?? [],
        requiredSkills: payload.requiredSkills ?? [],
        preferredSkills: payload.preferredSkills ?? [],
        qualifications: payload.qualifications ?? [],
        status: payload.status ?? 'ACTIVE',
        applicantCount: 0,
      };
      return mockDelay(newJob);
    }
    return http.post<Job>('/jobs', payload);
  },

  async updateJob(id: string, payload: Partial<Job>): Promise<Job> {
    if (USE_MOCK_DATA) {
      const job = mockJobs.find((j) => j.id === id)!;
      return mockDelay({ ...job, ...payload });
    }
    return http.put<Job>(`/jobs/${id}`, payload);
  },
};
