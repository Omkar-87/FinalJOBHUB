import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import {
  recruiterJobs,
  recruiterCandidateApplications,
  companies,
  recruiterCompanyId,
} from '@/data/mockData';
import type { Company, RecruiterStats, Job } from '@/types';

export const recruiterService = {
  // GET /api/jobs?recruiter=me
  async getMyJobs(): Promise<Job[]> {
    if (USE_MOCK_DATA) return mockDelay([...recruiterJobs]);
    return http.get<Job[]>('/jobs?recruiter=me');
  },

  // GET /api/recruiter/stats
  async getStats(): Promise<RecruiterStats> {
    if (USE_MOCK_DATA) {
      const stats: RecruiterStats = {
        activeJobs: recruiterJobs.filter((j) => j.status === 'ACTIVE').length,
        totalApplications: recruiterCandidateApplications.length,
        shortlisted: recruiterCandidateApplications.filter((a) => a.status === 'Shortlisted').length,
        interviews: recruiterCandidateApplications.filter((a) => a.status === 'Interview').length,
        hires: recruiterCandidateApplications.filter((a) => a.status === 'Selected').length,
      };
      return mockDelay(stats);
    }
    return http.get<RecruiterStats>('/recruiter/stats');
  },

  // GET /api/recruiter/analytics/applications-over-time
  async getApplicationsOverTime(): Promise<{ date: string; applications: number }[]> {
    if (USE_MOCK_DATA) {
      const days = 14;
      const series = Array.from({ length: days }, (_, i) => {
        const d = new Date(Date.now() - (days - 1 - i) * 86400000);
        return {
          date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          applications: Math.max(1, Math.round(6 + 5 * Math.sin(i / 2) + (i % 3))),
        };
      });
      return mockDelay(series);
    }
    return http.get('/recruiter/analytics/applications-over-time');
  },

  // GET /api/company/{id}
  async getCompany(id: string = recruiterCompanyId): Promise<Company | undefined> {
    if (USE_MOCK_DATA) return mockDelay(companies.find((c) => c.id === id));
    return http.get<Company>(`/company/${id}`);
  },

  async updateCompany(id: string, payload: Partial<Company>): Promise<Company> {
    if (USE_MOCK_DATA) {
      const company = companies.find((c) => c.id === id)!;
      Object.assign(company, payload);
      return mockDelay({ ...company });
    }
    return http.put<Company>(`/company/${id}`, payload);
  },
};
