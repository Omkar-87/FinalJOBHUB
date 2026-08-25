import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroIllustration } from '@/components/landing/HeroIllustration';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden dot-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Smarter recruitment, built for real careers
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Find the right opportunity.
            <br />
            Build your future.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            JOBHUB connects talented candidates with the right jobs through a smarter, simpler
            recruitment experience.
          </p>

          <div
            role="search"
            className="mt-8 flex max-w-lg flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-soft sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input
                placeholder="Job title, skills, or company"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                onKeyDown={(e) => e.key === 'Enter' && navigate('/candidate/jobs')}
              />
            </div>
            <Button onClick={() => navigate('/candidate/jobs')}>Search Jobs</Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="outline" size="lg" onClick={() => navigate('/register')} icon={<ArrowRight size={16} />} iconPosition="right">
              Get Started
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/candidate/jobs')}>
              Browse Jobs
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
