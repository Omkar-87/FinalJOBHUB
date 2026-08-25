import { useCallback, useEffect, useState } from 'react';
import { notificationService } from '@/api/notificationService';
import type { AppNotification } from '@/types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const data = await notificationService.getNotifications();
    setNotifications(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await notificationService.markAsRead(id);
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await notificationService.markAllAsRead();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, isLoading, unreadCount, markAsRead, markAllAsRead, refresh };
}
