import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { notifications as mockNotifications } from '@/data/mockData';
import type { AppNotification } from '@/types';

let notificationStore: AppNotification[] = [...mockNotifications];

export const notificationService = {
  // GET /api/notifications
  async getNotifications(): Promise<AppNotification[]> {
    if (USE_MOCK_DATA) return mockDelay([...notificationStore]);
    return http.get<AppNotification[]>('/notifications');
  },

  // PATCH /api/notifications/{id}/read
  async markAsRead(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      notificationStore = notificationStore.map((n) => (n.id === id ? { ...n, read: true } : n));
      return mockDelay(undefined, 100);
    }
    return http.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    if (USE_MOCK_DATA) {
      notificationStore = notificationStore.map((n) => ({ ...n, read: true }));
      return mockDelay(undefined, 150);
    }
    return http.patch('/notifications/read-all');
  },
};
