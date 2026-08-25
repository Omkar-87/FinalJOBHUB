import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { recommendations as mockRecommendations } from '@/data/mockData';
import type { Recommendation } from '@/types';

export const recommendationService = {
  // GET /api/recommendations — placeholder for the AI/ML recommendation service
  async getRecommendations(): Promise<Recommendation[]> {
    if (USE_MOCK_DATA) return mockDelay([...mockRecommendations], 600);
    return http.get<Recommendation[]>('/recommendations');
  },
};
