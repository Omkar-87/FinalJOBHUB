import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 font-display text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-brand-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-accent-500/20" />
        <Link to="/" className="relative font-display text-lg font-bold text-white">
          JOBHUB
        </Link>
        <div className="relative">
          <p className="font-display text-2xl font-semibold leading-snug text-white">
            "JOBHUB helped us fill three backend roles in under a month — the match quality was the
            difference."
          </p>
          <p className="mt-4 text-sm text-brand-100">Hiring Lead, growth-stage tech company</p>
        </div>
        <div />
      </div>
    </div>
  );
}
