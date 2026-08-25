import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/layout/Logo';

export interface SidebarItem {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SidebarLinks({ items, onNavigate }: { items: SidebarItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {items.map(({ label, to, icon: Icon, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={to.split('/').length <= 3}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            )
          }
        >
          <span className="flex items-center gap-3">
            <Icon size={18} strokeWidth={2} />
            {label}
          </span>
          {badge ? (
            <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {badge}
            </span>
          ) : null}
        </NavLink>
      ))}
    </nav>
  );
}

export function Sidebar({ items, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-slate-100 lg:bg-white lg:py-6">
        <div className="px-5 pb-6">
          <Logo />
        </div>
        <SidebarLinks items={items} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={onMobileClose} aria-hidden="true" />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white py-6 shadow-soft-lg animate-fade-up">
            <div className="flex items-center justify-between px-5 pb-6">
              <Logo />
              <button
                onClick={onMobileClose}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarLinks items={items} onNavigate={onMobileClose} />
          </aside>
        </div>
      )}
    </>
  );
}
