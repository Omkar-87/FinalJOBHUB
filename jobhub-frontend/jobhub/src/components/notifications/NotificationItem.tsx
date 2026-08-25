import { Bell, Calendar, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import type { AppNotification } from '@/types';
import { cn, timeAgo } from '@/lib/utils';

const iconMap = {
  STATUS: CheckCircle2,
  JOB_MATCH: Sparkles,
  INTERVIEW: Calendar,
  RESUME: FileText,
  SYSTEM: Bell,
};

const colorMap = {
  STATUS: 'bg-emerald-50 text-emerald-600',
  JOB_MATCH: 'bg-accent-500/10 text-accent-600',
  INTERVIEW: 'bg-brand-50 text-brand-600',
  RESUME: 'bg-blue-50 text-blue-600',
  SYSTEM: 'bg-slate-100 text-slate-500',
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  compact,
}: {
  notification: AppNotification;
  onMarkAsRead?: (id: string) => void;
  compact?: boolean;
}) {
  const Icon = iconMap[notification.type];
  return (
    <button
      onClick={() => !notification.read && onMarkAsRead?.(notification.id)}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-50',
        !notification.read && 'bg-brand-50/40'
      )}
    >
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', colorMap[notification.type])}>
        <Icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className={cn('text-sm', notification.read ? 'text-slate-600' : 'font-semibold text-slate-900')}>
            {notification.title}
          </span>
          {!notification.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />}
        </span>
        <span className={cn('mt-0.5 block text-xs text-slate-500', compact && 'line-clamp-2')}>
          {notification.message}
        </span>
        <span className="mt-1 block text-[11px] text-slate-400">{timeAgo(notification.createdAt)}</span>
      </span>
    </button>
  );
}
