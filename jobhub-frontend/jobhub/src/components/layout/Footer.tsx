import { Logo } from '@/components/layout/Logo';

const columns = [
  {
    title: 'Candidates',
    links: [
      { label: 'Find Jobs', to: '/candidate/jobs' },
      { label: 'Create Profile', to: '/register' },
      { label: 'Resume Tips', to: '/candidate/resume' },
    ],
  },
  {
    title: 'Recruiters',
    links: [
      { label: 'Post a Job', to: '/recruiter/post-job' },
      { label: 'Browse Candidates', to: '/register?role=recruiter' },
      { label: 'Company Profiles', to: '/companies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Privacy', to: '/' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-slate-500">
              A smarter, simpler way to connect talented candidates with the right opportunities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-semibold text-slate-900">{col.title}</p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.to} className="text-sm text-slate-500 hover:text-brand-700">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} JOBHUB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
