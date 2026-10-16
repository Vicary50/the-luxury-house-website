import { Waves, Sofa, Flame, CookingPot, BedDouble, Car, Puzzle, Wifi, type LucideIcon } from 'lucide-react';

const AMENITIES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Waves, title: 'Heated outdoor pool', body: 'Temperature controlled for swimming in any season, with a cover and an outdoor shower.' },
  { icon: Sofa, title: 'Poolside villa', body: 'A second living space by the water, with kitchen, lounge, dining and shower.' },
  { icon: Flame, title: 'Firepit terrace', body: 'Built-in seating around the fire for evenings that run late.' },
  { icon: CookingPot, title: 'Kitchen and dining', body: 'A fully equipped kitchen with an island, and a separate dining room for long dinners.' },
  { icon: BedDouble, title: 'Bedrooms', body: 'Furnished with good linen and comfortable mattresses, including a master suite with en suite.' },
  { icon: Puzzle, title: 'Playroom', body: 'Space for games and films, away from the grown-ups. Doubles as a room with a sofa bed.' },
  { icon: Car, title: 'Private parking', body: 'Room for several cars on the property itself.' },
  { icon: Wifi, title: 'WiFi throughout', body: 'For the film nights, the work emails, and the inevitable group playlist.' },
];

export default function FeaturesSection() {
  return (
    <section id="amenities" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 data-reveal className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink lg:col-span-6">
            What the house has
          </h2>
          <p className="max-w-md text-[1.0625rem] leading-[1.75] text-muted lg:col-span-5 lg:col-start-8">
            Everything a large group needs for a few days together, inside and out.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-5 bg-paper p-6 sm:block sm:p-8 lg:p-10">
              <Icon className="mt-1 h-7 w-7 shrink-0 text-olive sm:mt-0" strokeWidth={1.25} aria-hidden="true" />
              <div>
                <h3 className="font-display text-2xl font-normal leading-tight text-ink sm:mt-6">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted sm:mt-3">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
