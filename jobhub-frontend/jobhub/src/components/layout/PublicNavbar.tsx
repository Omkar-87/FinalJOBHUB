import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';

const links = [
  { label: 'Find Jobs', to: '/candidate/jobs' },
  { label: 'Companies', to: '/companies' },
  { label: 'For Recruiters', to: '/register?role=recruiter' },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm font-medium text-slate-600 hover:text-brand-700">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Log in
          </Button>
          <Button size="sm" onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </div>

        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col gap-1 bg-white p-5 shadow-soft-lg animate-fade-up">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/register')}>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
