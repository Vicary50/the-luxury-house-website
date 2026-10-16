import HeroSection from '@/components/layout/HeroSection';
import TestimonialsSlider from '@/components/testimonials/TestimonialsSlider';
import LuxurySection from '@/components/layout/LuxurySection';
import FeaturesSection from '@/components/layout/FeaturesSection';
import AccommodationSection from '@/components/layout/AccommodationSection';
import ReserveStaySection from '@/components/layout/ReserveStaySection';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import FAQSection from '@/components/layout/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <LuxurySection />
        <FeaturesSection />
        <TestimonialsSlider />
        <AccommodationSection />
        <MasonryGallery />
        <ReserveStaySection />
        <FAQSection />
      </main>
    </div>
  );
}
