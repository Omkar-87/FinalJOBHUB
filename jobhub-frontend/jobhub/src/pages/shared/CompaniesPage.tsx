import { companies } from '@/data/mockData';
import { CompanyCard } from '@/components/company/CompanyCard';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Footer } from '@/components/layout/Footer';

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">Companies hiring on JOBHUB</h1>
        <p className="mt-1 text-sm text-slate-500">Explore culture, roles, and teams before you apply.</p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {companies.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
