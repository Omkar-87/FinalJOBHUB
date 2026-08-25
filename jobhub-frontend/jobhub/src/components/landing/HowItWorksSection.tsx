import { UserPlus, Search, MousePointerClick, LineChart } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'Create your profile', description: 'Add your skills, experience, and resume in minutes.' },
  { icon: Search, title: 'Discover suitable jobs', description: 'Get matched to roles that fit your background.' },
  { icon: MousePointerClick, title: 'Apply with one click', description: 'Reuse your profile and resume across applications.' },
  { icon: LineChart, title: 'Track your applications', description: 'Follow every application from applied to hired.' },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">How JOBHUB Works</h2>
        <p className="mt-3 text-slate-500">Four simple steps between you and your next role.</p>
      </div>

      <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-slate-100 lg:block" aria-hidden="true" />
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-slate-100">
              <step.icon size={24} className="text-brand-600" />
              <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-5 font-display text-base font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-1.5 max-w-[220px] text-sm text-slate-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
