import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileCheck2,
  Bookmark,
  FileText,
  UserRound,
  Sparkles,
  Settings,
} from 'lucide-react';
import { Sidebar, type SidebarItem } from '@/components/layout/Sidebar';
import { AppTopbar } from '@/components/layout/AppTopbar';

const items: SidebarItem[] = [
  { label: 'Dashboard', to: '/candidate/dashboard', icon: LayoutDashboard },
  { label: 'Find Jobs', to: '/candidate/jobs', icon: Search },
  { label: 'Applications', to: '/candidate/applications', icon: FileCheck2 },
  { label: 'Saved Jobs', to: '/candidate/saved-jobs', icon: Bookmark },
  { label: 'Resume', to: '/candidate/resume', icon: FileText },
  { label: 'Profile', to: '/candidate/profile', icon: UserRound },
  { label: 'Recommended', to: '/candidate/recommendations', icon: Sparkles },
  { label: 'Settings', to: '/candidate/settings', icon: Settings },
];

export function CandidateLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={items} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar
          onMenuClick={() => setMobileOpen(true)}
          searchPlaceholder="Search jobs, companies, skills…"
          onSearch={(q) => navigate(`/candidate/jobs?q=${encodeURIComponent(q)}`)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
