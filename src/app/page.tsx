import HeroSection from '@/components/layout/HeroSection';
import IntroSection from '@/components/layout/IntroSection';
import Gallery from '@/components/gallery/Gallery';
import Spread from '@/components/layout/Spread';
import FeaturesSection from '@/components/layout/FeaturesSection';
import AccommodationSection from '@/components/layout/AccommodationSection';
import ReserveStaySection from '@/components/layout/ReserveStaySection';
import FAQSection from '@/components/layout/FAQSection';
import OccasionsSection from '@/components/layout/OccasionsSection';
import GuestBookSection from '@/components/layout/GuestBookSection';
import LocationSection from '@/components/layout/LocationSection';
import ClosingCta from '@/components/layout/ClosingCta';
import CheckDatesBar from '@/components/layout/CheckDatesBar';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <IntroSection />
        <Gallery />
        <Spread
          id="about"
          image="/images/Swimming%20pool/Swimming%20pool%201.jpg"
          alt="The heated pool with its roller cover, the paved terrace and the back of the house"
          eyebrow="The pool and villa"
          title="Warm water,"
          titleItalic="whatever the weather."
          paragraphs={[
            'The outdoor pool is heated, so a Yorkshire spring or autumn is no reason to stay dry. Loungers line the terrace, and the lawn gives the children room to run between swims.',
            'Across the terrace, the poolside villa has its own kitchen, lounge, dining table and shower. It is where long lunches happen, and where everyone dries off without trailing water through the house.',
          ]}
          cta
        />
        <Spread
          image="/images/Dining%20area/Dining%20area%201.jpg"
          alt="The dining room, with a long dark table, cream chairs and white orchids, and garden views through the window"
          eyebrow="Kitchen, dining and living"
          title="Cook together,"
          titleItalic="then sit down at one table."
          paragraphs={[
            'The kitchen is built around a large island with a range cooker behind it, so whoever is cooking stays part of the conversation. The dining room sits apart from it for long dinners.',
            'There are two living rooms, each with a wood-burning stove, so the film night and the quiet catch-up do not have to share a room.',
          ]}
          flip
          tone="paper"
        />
        <Spread
          image="/images/Firepit/Fire%20pit%204.jpg"
          alt="A fire table burning on the terrace at the back of the house"
          eyebrow="Evenings"
          title="When the sun goes,"
          titleItalic="the fire comes on."
          paragraphs={[
            'Built-in cushioned benches wrap around the firepit terrace, sheltered by a tall hedge. The fire tables keep everyone warm long after dark, and the house is a few steps away.',
          ]}
        />
        <Spread
          image="/images/Master%20bedroom/Master%20bedroom%202.jpg"
          alt="The master bedroom, with a large upholstered bed and soft grey linen"
          eyebrow="Bedrooms"
          title="Room for fourteen,"
          titleItalic="and somewhere quiet for each."
          paragraphs={[
            'A master suite with its own en suite, king-size rooms at the front and back of the house, a double, a bunk room, and a children’s room with its own en suite. The playroom has a sofa bed for the overflow.',
          ]}
          flip
          tone="paper"
        />
        <FeaturesSection />
        <OccasionsSection />
        <GuestBookSection />
        <AccommodationSection />
        <ReserveStaySection />
        <FAQSection />
        <LocationSection />
        <ClosingCta />
      </main>
      <CheckDatesBar />
      <ScrollReveal />
    </div>
  );
}
