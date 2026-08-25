import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { StatsSection } from '@/components/landing/StatsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CtaSection } from '@/components/landing/CtaSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <main>
        <Hero />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
