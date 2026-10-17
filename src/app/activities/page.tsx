import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import ClosingCta from '@/components/layout/ClosingCta';
import ScrollReveal from '@/components/layout/ScrollReveal';

export const metadata: Metadata = {
  title: "Things to Do in Hull & East Yorkshire | Activities Near The Luxury House",
  description: "Discover the best restaurants, attractions, and activities in Hull & East Yorkshire. From The Deep aquarium to award-winning restaurants, plan your perfect stay at The Luxury House.",
  keywords: [
    "Hull activities", 
    "East Yorkshire attractions", 
    "restaurants near Hull", 
    "things to do Hull", 
    "Yorkshire Wolds", 
    "Hull Old Town", 
    "The Deep aquarium",
    "holiday activities Yorkshire",
    "restaurants East Yorkshire",
    "attractions near The Luxury House"
  ],
  openGraph: {
    title: "Things to Do in Hull & East Yorkshire | The Luxury House",
    description: "Discover award-winning restaurants, historic attractions, and natural beauty in Hull & East Yorkshire during your stay at The Luxury House.",
    images: ['/images/Hero/Hero%20photo.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hull & East Yorkshire Activities Guide | The Luxury House",
    description: "Explore the best restaurants, attractions, and activities in Hull & East Yorkshire during your luxury holiday stay.",
    images: ['/images/Hero/Hero%20photo.jpg'],
  },
};

interface Place {
  name: string;
  kind: string;
  notes: string[];
  location: string;
  description: string;
  website: string | null;
}

const RESTAURANTS: Place[] = [
  {
    name: 'The White Hart',
    kind: 'Modern British',
    notes: ['Michelin Guide Listed', 'Seasonal Menu', 'Local Ingredients'],
    location: 'Hull City Centre',
    description: 'Award-winning restaurant offering contemporary British cuisine with a focus on Yorkshire produce.',
    website: null
  },
  {
    name: 'Ambiente Tapas',
    kind: 'Spanish',
    notes: ['Authentic Tapas', 'Wine Selection', 'Live Music'],
    location: 'Princes Avenue, Hull',
    description: 'Vibrant Spanish restaurant serving authentic tapas and paella in a lively atmosphere.',
    website: 'https://www.ambientetapas.co.uk'
  },
  {
    name: 'The Old House',
    kind: 'Traditional British',
    notes: ['Historic Pub', 'Real Ales', 'Sunday Roasts'],
    location: 'Scale Lane, Hull',
    description: 'Historic 17th-century pub offering traditional British fare and locally brewed ales.',
    website: 'https://www.theoldhousehull.com'
  },
  {
    name: 'Hitchcocks Vegetarian Restaurant',
    kind: 'Vegetarian/Vegan',
    notes: ['Plant-Based Menu', 'Organic Ingredients', 'Cosy Atmosphere'],
    location: 'Bishop Lane, Hull',
    description: 'Charming vegetarian restaurant known for creative plant-based dishes and welcoming atmosphere.',
    website: 'http://hitchcocksrestaurant.co.uk'
  },
  {
    name: 'The Granary',
    kind: 'British / Seafood',
    notes: ['Riverside Location', 'Fresh Seafood', 'Family-Friendly'],
    location: 'The Marina, Hull',
    description: 'Popular marina restaurant specialising in fresh seafood and traditional British cuisine.',
    website: 'https://www.granaryhull.co.uk'
  },
  {
    name: 'Thieving Harry’s',
    kind: 'Modern British',
    notes: ['Craft Cocktails', 'Live Music', 'Local Art'],
    location: 'Humber Street, Hull',
    description: 'Trendy bar-restaurant in the cultural quarter serving modern British dishes and craft cocktails.',
    website: 'https://www.thievingharrys.co.uk'
  }
];

const ATTRACTIONS: Place[] = [
  {
    name: 'The Deep',
    kind: 'Aquarium',
    notes: ['World’s Only Submarium', '3,500 Fish', 'Interactive Exhibits'],
    location: 'Tower Street, Hull',
    description: 'One of the UK’s most spectacular aquariums, home to sharks, rays, and diverse marine life.',
    website: 'https://www.thedeep.co.uk'
  },
  {
    name: 'Hull Old Town',
    kind: 'Historic District',
    notes: ['Medieval Streets', 'Historic Pubs', 'Cobblestone Lanes'],
    location: 'Hull City Centre',
    description: 'Charming historic quarter with medieval streets, traditional pubs, and centuries of maritime history.',
    website: 'https://www.visithull.org'
  },
  {
    name: 'Ferens Art Gallery',
    kind: 'Art Gallery',
    notes: ['Free Entry', 'Contemporary Art', 'Local Artists'],
    location: 'Queen Victoria Square, Hull',
    description: 'Premier art gallery featuring contemporary works, local artists, and rotating exhibitions.',
    website: 'https://www.hcandl.co.uk/ferens'
  },
  {
    name: 'Yorkshire Wolds',
    kind: 'Natural Landscape',
    notes: ['Rolling Hills', 'Walking Trails', 'Scenic Views'],
    location: '30 mins from Hull',
    description: 'Area of Outstanding Natural Beauty with rolling chalk hills, charming villages, and excellent walking.',
    website: 'https://www.visithullandeastyorkshire.com/yorkshire-wolds'
  },
  {
    name: 'Streetlife Museum',
    kind: 'Transport Museum',
    notes: ['Historic Vehicles', 'Interactive Displays', 'Victorian Street'],
    location: 'High Street, Hull',
    description: 'Fascinating transport museum with historic vehicles and a reconstructed Victorian street.',
    website: 'https://www.hcandl.co.uk/streetlife-museum'
  },
  {
    name: 'Spurn Point',
    kind: 'Nature Reserve',
    notes: ['Unique Peninsula', 'Bird Watching', 'Lighthouse'],
    location: 'Humber Estuary (1 hr from Hull)',
    description: 'Distinctive curved spit of land extending into the Humber Estuary, perfect for wildlife watching.',
    website: 'https://www.ywt.org.uk/nature-reserves/spurn'
  },
  {
    name: 'Hull Maritime Museum',
    kind: 'Maritime History',
    notes: ['Whaling Heritage', 'Ship Models', 'Interactive Exhibits'],
    location: 'Queen Victoria Square, Hull',
    description: 'Explore Hull’s rich maritime heritage including its whaling history and fishing industry.',
    website: 'https://maritimehull.co.uk'
  },
  {
    name: 'East Park',
    kind: 'Public Park',
    notes: ['Animal Enclosures', 'Playground', 'Boating Lake'],
    location: 'Holderness Road, Hull',
    description: 'Large Victorian park with animal enclosures, children’s playground, and beautiful gardens.',
    website: 'https://www.hcandl.co.uk/east-park'
  }
];

function PlaceList({ id, tone, eyebrow, title, titleItalic, intro, places }: {
  id: string;
  tone: 'paper' | 'stone';
  eyebrow: string;
  title: string;
  titleItalic: string;
  intro: string;
  places: Place[];
}) {
  return (
    <section id={id} className={`${tone === 'stone' ? 'bg-stone' : 'bg-paper'} py-24 sm:py-32`}>
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-olive">{eyebrow}</p>
            <h2 data-reveal className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
              {title}
              <em className="block font-light">{titleItalic}</em>
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-[1.75] text-muted">{intro}</p>
          </div>
        </div>

        <ul className="border-t border-hairline lg:col-span-7 lg:col-start-6">
          {places.map((place) => (
            <li key={place.name} data-reveal className="border-b border-hairline py-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{place.kind}</p>
              <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink">{place.name}</h3>
              <p className="mt-3 max-w-xl text-[1.0625rem] leading-[1.75] text-muted">{place.description}</p>
              <p className="mt-3 text-sm text-ink-soft">{place.notes.join(' · ')}</p>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-sm">
                <span className="text-muted">{place.location}</span>
                {place.website && (
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center border-b border-ink font-medium text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
                  >
                    Visit website<span className="sr-only"> for {place.name} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ActivitiesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Activities & experiences"
        title="Hull and East Yorkshire,"
        titleItalic="on your doorstep."
        intro={
          <p>
            Welcome to a region where maritime heritage meets modern culture, where historic cobblestone streets lead to world-class dining, and where the Yorkshire countryside offers endless adventures. <strong className="font-medium text-ink">Hull and East Yorkshire</strong> provide the perfect blend of <strong className="font-medium text-ink">urban sophistication and natural beauty</strong>, making your stay at The Luxury House truly unforgettable.
          </p>
        }
      />

      <PlaceList
        id="restaurants"
        tone="paper"
        eyebrow="Best restaurants in Hull & East Yorkshire"
        title="Savour the flavours,"
        titleItalic="near the house."
        intro="From award-winning fine dining to cosy traditional pubs, discover the region’s culinary treasures."
        places={RESTAURANTS}
      />

      <PlaceList
        id="attractions"
        tone="stone"
        eyebrow="Places to visit in Hull & East Yorkshire"
        title="Explore"
        titleItalic="and discover."
        intro="From world-class museums to stunning natural landscapes, uncover the region’s hidden gems and must-see destinations."
        places={ATTRACTIONS}
      />

      <section className="bg-paper py-24 sm:py-32">
        <div data-reveal className="mx-auto max-w-3xl space-y-6 px-5 text-[1.0625rem] leading-[1.75] text-muted sm:px-8">
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.05] text-ink">
            Your perfect Yorkshire adventure awaits.
          </h2>
          <p>
            Whether you’re savouring award-winning cuisine in Hull’s vibrant restaurant scene, exploring centuries of maritime heritage, or discovering the natural beauty of the Yorkshire Wolds, this remarkable region offers something special for every traveller.
          </p>
          <p>
            Make the most of your stay at The Luxury House and create unforgettable memories in Hull & East Yorkshire - where every corner tells a story and every experience enriches your journey.
          </p>
          <p className="border-t border-hairline pt-6 text-sm">
            Restaurant and attraction information compiled from official websites, Visit Hull & East Yorkshire, TripAdvisor reviews, and local tourism boards. All details accurate as of 2024 and subject to change. Please verify current opening hours, prices, and availability before visiting.
          </p>
        </div>
      </section>

      <ClosingCta />
      <ScrollReveal />
    </main>
  );
}
