import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, MessageSquare, Search, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/hooks/useNotifications';
import { Avatar } from '@/components/ui/Avatar';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { cn } from '@/lib/utils';

interface AppTopbarProps {
  onMenuClick: () => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export function AppTopbar({ onMenuClick, searchPlaceholder = 'Search…', onSearch }: AppTopbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const profileHref = user?.role === 'RECRUITER' ? '/recruiter/company' : '/candidate/profile';
  const settingsHref = user?.role === 'RECRUITER' ? '/recruiter/settings' : '/candidate/settings';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-100 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onKeyDown={(e) => e.key === 'Enter' && onSearch?.((e.target as HTMLInputElement).value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
        <button
          className="hidden h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 sm:flex"
          aria-label="Messages"
        >
          <MessageSquare size={19} />
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-soft-lg animate-fade-up sm:w-96">
              <div className="flex items-center justify-between px-2 py-1.5">
                <p className="font-display text-sm font-semibold text-slate-900">Notifications</p>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-medium text-brand-600 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto thin-scroll">
                {notifications.slice(0, 6).map((n) => (
                  <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} compact />
                ))}
              </div>
              <Link
                to="/notifications"
                onClick={() => setNotifOpen(false)}
                className="mt-1 block rounded-xl px-3 py-2 text-center text-xs font-medium text-brand-600 hover:bg-brand-50"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full p-1 pr-1 hover:bg-slate-100"
          >
            <Avatar name={user?.name ?? 'User'} size="sm" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-soft-lg animate-fade-up">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="truncate text-xs text-slate-400">{user?.email}</p>
              </div>
              <div className="my-1 h-px bg-slate-100" />
              <Link
                to={profileHref}
                onClick={() => setProfileOpen(false)}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50'
                )}
              >
                <User size={16} /> {user?.role === 'RECRUITER' ? 'Company profile' : 'View profile'}
              </Link>
              <Link
                to={settingsHref}
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <Settings size={16} /> Settings
              </Link>
              <div className="my-1 h-px bg-slate-100" />
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
