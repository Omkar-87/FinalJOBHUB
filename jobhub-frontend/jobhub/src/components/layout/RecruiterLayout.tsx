import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  FileCheck2,
  Users,
  BarChart3,
  Building2,
  Settings,
} from 'lucide-react';
import { Sidebar, type SidebarItem } from '@/components/layout/Sidebar';
import { AppTopbar } from '@/components/layout/AppTopbar';

const items: SidebarItem[] = [
  { label: 'Dashboard', to: '/recruiter/dashboard', icon: LayoutDashboard },
  { label: 'Post Job', to: '/recruiter/post-job', icon: PlusCircle },
  { label: 'My Jobs', to: '/recruiter/jobs', icon: Briefcase },
  { label: 'Applications', to: '/recruiter/applications', icon: FileCheck2 },
  { label: 'Candidates', to: '/recruiter/candidates', icon: Users },
  { label: 'Analytics', to: '/recruiter/analytics', icon: BarChart3 },
  { label: 'Company Profile', to: '/recruiter/company', icon: Building2 },
  { label: 'Settings', to: '/recruiter/settings', icon: Settings },
];

export function RecruiterLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={items} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar onMenuClick={() => setMobileOpen(true)} searchPlaceholder="Search candidates, jobs…" />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
