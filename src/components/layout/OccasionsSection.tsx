import Image from 'next/image';
import { havenImages } from '@/lib/images';

const photo = (id: string) => havenImages.find((img) => img.id === id)!;

const OCCASIONS = [
  {
    title: 'Celebrations',
    body: 'Birthdays, anniversaries and hen weekends, agreed with us when you book. Dinner in the dining room, then out to the firepit terrace.',
    image: photo('dining-3'),
  },
  {
    title: 'Families',
    body: 'Grandparents to babies under one roof. A playroom, a bunk room and a children’s room, and a heated pool for the afternoons.',
    image: photo('pool-6'),
  },
  {
    title: 'Friends’ weekends',
    body: 'Five bedrooms and five bathrooms for up to fourteen, two living rooms for when the group splits, and fire tables for late nights.',
    image: photo('firepit-1'),
  },
  {
    title: 'Corporate and team stays',
    body: 'WiFi throughout, a separate dining room for working sessions, and the poolside villa as a second space to break out into.',
    image: photo('poolside-dining-1'),
  },
];

export default function OccasionsSection() {
  return (
    <section className="bg-stone py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-olive">Occasions</p>
        <h2 data-reveal className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
          For the weekends
          <em className="block font-light">that need everyone there.</em>
        </h2>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {OCCASIONS.map(({ title, body, image }) => (
            <li key={title} data-reveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-hairline">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" data-reveal-image className="object-cover" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-normal leading-tight text-ink">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
