import Image from 'next/image';
import Link from 'next/link';
import { havenImages } from '@/lib/images';

const photo = (id: string) => havenImages.find((img) => img.id === id)!;

// href = the occasion's own landing page; cards without one stay plain.
const OCCASIONS: { title: string; body: string; image: ReturnType<typeof photo>; href?: string }[] = [
  {
    title: 'Hen weekends',
    body: 'Hen weekends for up to 13 adults, agreed with us when you book. Afternoons by the heated pool, evenings on the firepit terrace.',
    image: photo('pool-1'),
    href: '/hen-party-house',
  },
  {
    title: 'Birthdays',
    body: 'A 30th, 40th or 60th with everyone under one roof. Dinner in the dining room, then out to the fire tables.',
    image: photo('dining-3'),
    href: '/birthday-party-house',
  },
  {
    title: 'Beverley race days',
    body: 'Beverley Racecourse is about 25 minutes away. Back for a swim before dinner, with parking for five cars.',
    image: photo('firepit-1'),
    href: '/beverley-races-accommodation',
  },
  {
    title: 'Couples',
    body: 'The poolside villa sleeps 2 and can be booked on its own, steps from the heated pool.',
    image: photo('poolside-lounge-2'),
    href: '/couples-retreat',
  },
  {
    title: 'Families',
    body: 'Grandparents to babies under one roof. A playroom, a bunk room and a children’s room, and a heated pool for the afternoons.',
    image: photo('pool-6'),
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

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {OCCASIONS.map(({ title, body, image, href }) => (
            <li key={title} data-reveal className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-hairline">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" data-reveal-image className="object-cover" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-normal leading-tight text-ink">
                {href ? (
                  // Stretched link: the whole card is clickable, the heading is the accessible name.
                  <Link href={href} className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-olive">
                    {title} <span aria-hidden="true">→</span>
                  </Link>
                ) : title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
