const stats = [
  { label: 'Active Jobs', value: '12,400+' },
  { label: 'Registered Candidates', value: '340,000+' },
  { label: 'Companies', value: '2,150+' },
  { label: 'Successful Placements', value: '58,900+' },
];

export function StatsSection() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-mono text-3xl font-bold text-slate-900 sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
