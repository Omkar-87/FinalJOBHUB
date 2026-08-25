import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { applications as mockApplications, recruiterCandidateApplications, jobs } from '@/data/mockData';
import type { Application, ApplicationStats, ApplicationStatus } from '@/types';

export interface SubmitApplicationPayload {
  jobId: string;
  resumeId: string;
  coverLetter?: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export const applicationService = {
  // GET /api/applications (candidate's own applications)
  async getMyApplications(): Promise<Application[]> {
    if (USE_MOCK_DATA) return mockDelay([...mockApplications]);
    return http.get<Application[]>('/applications');
  },

  async getApplicationById(id: string): Promise<Application | undefined> {
    if (USE_MOCK_DATA) return mockDelay(mockApplications.find((a) => a.id === id));
    return http.get<Application>(`/applications/${id}`);
  },

  async getStats(): Promise<ApplicationStats> {
    if (USE_MOCK_DATA) {
      const stats: ApplicationStats = {
        applied: mockApplications.filter((a) => a.status === 'Applied').length,
        underReview: mockApplications.filter((a) => a.status === 'Under Review').length,
        shortlisted: mockApplications.filter((a) => a.status === 'Shortlisted').length,
        interview: mockApplications.filter((a) => a.status === 'Interview').length,
        rejected: mockApplications.filter((a) => a.status === 'Rejected').length,
        selected: mockApplications.filter((a) => a.status === 'Selected').length,
      };
      return mockDelay(stats);
    }
    return http.get<ApplicationStats>('/applications/stats');
  },

  // POST /api/applications
  async submitApplication(payload: SubmitApplicationPayload): Promise<Application> {
    if (USE_MOCK_DATA) {
      const job = jobs.find((j) => j.id === payload.jobId)!;
      const newApplication: Application = {
        id: `app-new-${Date.now()}`,
        jobId: payload.jobId,
        job,
        candidateId: 'cand-1',
        candidateName: payload.personalInfo.name,
        appliedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        status: 'Applied',
        resumeId: payload.resumeId,
        coverLetter: payload.coverLetter,
      };
      mockApplications.unshift(newApplication);
      return mockDelay(newApplication, 900);
    }
    return http.post<Application>('/applications', payload);
  },

  // Recruiter side — GET /api/applications?jobId={id}
  async getApplicationsForJob(jobId: string): Promise<Application[]> {
    if (USE_MOCK_DATA) {
      return mockDelay(recruiterCandidateApplications.filter((a) => a.jobId === jobId));
    }
    return http.get<Application[]>(`/applications?jobId=${jobId}`);
  },

  async getAllRecruiterApplications(): Promise<Application[]> {
    if (USE_MOCK_DATA) return mockDelay([...recruiterCandidateApplications]);
    return http.get<Application[]>('/applications/recruiter');
  },

  // PATCH /api/applications/{id}/status
  async updateStatus(id: string, status: ApplicationStatus): Promise<Application> {
    if (USE_MOCK_DATA) {
      const app =
        recruiterCandidateApplications.find((a) => a.id === id) ??
        mockApplications.find((a) => a.id === id);
      if (app) {
        app.status = status;
        app.lastUpdated = new Date().toISOString();
      }
      return mockDelay(app!);
    }
    return http.patch<Application>(`/applications/${id}/status`, { status });
  },
};
