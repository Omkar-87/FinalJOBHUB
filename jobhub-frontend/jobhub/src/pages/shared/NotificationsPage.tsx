import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';

export default function NotificationsPage() {
  const { notifications, isLoading, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>

      {isLoading ? (
        <LoadingState label="Loading notifications…" />
      ) : notifications.length > 0 ? (
        <div className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-white p-2 shadow-soft">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Bell size={20} />} title="No notifications" description="You're all caught up for now." />
      )}
    </div>
  );
}
