import Header from '@/components/layout/Header';
import HeroSection from '@/components/layout/HeroSection';
import TestimonialsSlider from '@/components/testimonials/TestimonialsSlider';
import LuxurySection from '@/components/layout/LuxurySection';
import FeaturesSection from '@/components/layout/FeaturesSection';
import AccommodationSection from '@/components/layout/AccommodationSection';
import ReserveStaySection from '@/components/layout/ReserveStaySection';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import FAQSection from '@/components/layout/FAQSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <TestimonialsSlider />
        <LuxurySection />
        <FeaturesSection />
        <AccommodationSection />
        <MasonryGallery />
        <ReserveStaySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
