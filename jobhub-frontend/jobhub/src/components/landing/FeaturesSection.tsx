import { Sparkles, FileText, ListChecks, BrainCircuit, Building2, UserRound } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Smart Job Discovery', description: 'Search and filter across thousands of live roles by skill, salary, and location.' },
  { icon: FileText, title: 'Resume Management', description: 'Upload, organize, and update resumes without starting from scratch each time.' },
  { icon: ListChecks, title: 'Application Tracking', description: 'See exactly where every application stands, from applied to hired.' },
  { icon: BrainCircuit, title: 'AI-powered Recommendations', description: 'Get roles ranked by how closely your skills and experience match.' },
  { icon: Building2, title: 'Company Profiles', description: 'Explore culture, open roles, and details before you apply.' },
  { icon: UserRound, title: 'Candidate Profiles', description: 'A resume-style profile recruiters can review in seconds.' },
];

export function FeaturesSection() {
  return (
    <section className="bg-slate-50/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
            Everything you need to hire — or get hired
          </h2>
          <p className="mt-3 text-slate-500">One platform for candidates and recruiters, built around real hiring workflows.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
