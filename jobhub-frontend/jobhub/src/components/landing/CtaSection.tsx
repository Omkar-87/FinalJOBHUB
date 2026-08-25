import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CtaSection() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-16 text-center shadow-soft-lg sm:px-16">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent-500/20" />
        <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your next opportunity is waiting.
        </h2>
        <p className="relative mx-auto mt-3 max-w-lg text-brand-100">
          Create your JOBHUB profile in minutes and start applying to roles that actually fit.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="bg-white text-brand-700 hover:bg-brand-50"
            onClick={() => navigate('/register')}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
