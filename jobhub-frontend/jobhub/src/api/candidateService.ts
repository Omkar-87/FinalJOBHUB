import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { demoCandidate, applications as mockApplications } from '@/data/mockData';
import type { CandidateProfile, SavedJob } from '@/types';

let savedJobsStore: SavedJob[] = [
  { jobId: 'j3', savedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { jobId: 'j6', savedAt: new Date(Date.now() - 5 * 86400000).toISOString() },
];

let profileStore: CandidateProfile = { ...demoCandidate };

export const candidateService = {
  // GET /api/profile
  async getProfile(): Promise<CandidateProfile> {
    if (USE_MOCK_DATA) return mockDelay({ ...profileStore });
    return http.get<CandidateProfile>('/profile');
  },

  // PUT /api/profile
  async updateProfile(payload: Partial<CandidateProfile>): Promise<CandidateProfile> {
    if (USE_MOCK_DATA) {
      profileStore = { ...profileStore, ...payload };
      return mockDelay({ ...profileStore });
    }
    return http.put<CandidateProfile>('/profile', payload);
  },

  // GET /api/candidates/saved-jobs
  async getSavedJobs(): Promise<SavedJob[]> {
    if (USE_MOCK_DATA) return mockDelay([...savedJobsStore]);
    return http.get<SavedJob[]>('/candidates/saved-jobs');
  },

  // POST /api/candidates/saved-jobs
  async saveJob(jobId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      if (!savedJobsStore.some((s) => s.jobId === jobId)) {
        savedJobsStore.push({ jobId, savedAt: new Date().toISOString() });
      }
      return mockDelay(undefined, 200);
    }
    return http.post('/candidates/saved-jobs', { jobId });
  },

  // DELETE /api/candidates/saved-jobs/{jobId}
  async unsaveJob(jobId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      savedJobsStore = savedJobsStore.filter((s) => s.jobId !== jobId);
      return mockDelay(undefined, 200);
    }
    return http.delete(`/candidates/saved-jobs/${jobId}`);
  },

  async getRecentlyViewed(): Promise<string[]> {
    if (USE_MOCK_DATA) return mockDelay(['j1', 'j5', 'j2']);
    return http.get<string[]>('/candidates/recently-viewed');
  },

  async getMyApplicationCount(): Promise<number> {
    if (USE_MOCK_DATA) return mockDelay(mockApplications.length);
    return http.get<number>('/applications/count');
  },
};
