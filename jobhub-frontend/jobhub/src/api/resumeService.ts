import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { resumes as mockResumes } from '@/data/mockData';
import type { Resume } from '@/types';

let resumeStore: Resume[] = [...mockResumes];

export const resumeService = {
  // GET /api/resume
  async getResumes(): Promise<Resume[]> {
    if (USE_MOCK_DATA) return mockDelay([...resumeStore]);
    return http.get<Resume[]>('/resume');
  },

  // POST /api/resume  (multipart/form-data)
  async uploadResume(file: File): Promise<Resume> {
    if (USE_MOCK_DATA) {
      const newResume: Resume = {
        id: `res-${Date.now()}`,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        fileType: file.name.split('.').pop()?.toUpperCase() ?? 'PDF',
        fileSizeKb: Math.max(1, Math.round(file.size / 1024)),
        isPrimary: resumeStore.length === 0,
      };
      resumeStore.unshift(newResume);
      return mockDelay(newResume, 1200);
    }
    const formData = new FormData();
    formData.append('file', file);
    return http.upload<Resume>('/resume', formData);
  },

  // DELETE /api/resume/{id}
  async deleteResume(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      resumeStore = resumeStore.filter((r) => r.id !== id);
      return mockDelay(undefined, 200);
    }
    return http.delete(`/resume/${id}`);
  },

  // PATCH /api/resume/{id}/primary
  async setPrimary(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      resumeStore = resumeStore.map((r) => ({ ...r, isPrimary: r.id === id }));
      return mockDelay(undefined, 200);
    }
    return http.patch(`/resume/${id}/primary`);
  },

  // GET /api/resume/{id}/analysis — placeholder for the AI/ML resume-improvement service
  async getResumeAnalysis(id: string): Promise<{ score: number; suggestions: string[] }> {
    if (USE_MOCK_DATA) {
      return mockDelay({
        score: 78,
        suggestions: [
          'Add measurable impact to your JobHub AI project (e.g. query performance, test coverage)',
          'List Docker and REST API design explicitly in your skills section — both appear in your projects but not your skills list',
          'Add a certifications section once you complete any in-progress courses',
        ],
      });
    }
    return http.get(`/resume/${id}/analysis`);
  },
};
