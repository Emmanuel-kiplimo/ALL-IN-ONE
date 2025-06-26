
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ImpactStats from '@/components/ImpactStats';
import UrgentCauses from '@/components/UrgentCauses';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ImpactStats />
      <UrgentCauses />
      <Footer />
    </div>
  );
};

export default Index;
