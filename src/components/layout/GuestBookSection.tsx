import Image from 'next/image';

// Transcribed from the handwritten guest review book in the house (scans in public/images/testimonials).
// Wording as written; only capitals and sentence breaks at the writer's line breaks were added.
const ENTRIES = [
  {
    quote: 'What a great find! Such a hidden gem, lovely and spacious, just what we needed as a family. The boys enjoyed splashing around and using the pool villa which gave me and husband some time to relax and talk. Highly recommended.',
    name: null,
    date: 'May 2024',
    scan: '/images/testimonials/review-9.jpg',
  },
  {
    quote: 'Thank you. The whole of the Newton family from 5 months to 75 years old had a wonderful stay in your lovely house.',
    name: 'Newton',
    date: 'August 2025',
    scan: '/images/testimonials/review-1.jpg',
  },
  {
    quote: 'The sauna is superb! Such a treat to be able to relax by the pool, dip in and out, and enjoy the BBQ. Luxurious, thoughtful touches throughout. Will definitely be back. Perfect for special occasions and celebrations with the family.',
    name: null,
    date: 'May 2024',
    scan: '/images/testimonials/review-10.jpg',
  },
  {
    quote: 'Thank you for having us in your lovely home to celebrate our hens! We can’t wait to stay again!',
    name: 'Merrick hen party',
    date: 'August 2025',
    scan: '/images/testimonials/review-2.jpg',
  },
  {
    quote: 'Wow! We had a lovely stay in this beautiful home. Will be coming back soon. Thank-you for sharing your lovely home.',
    name: 'Millie & Sid',
    date: 'August 2025',
    scan: '/images/testimonials/review-4.jpg',
  },
  {
    quote: '5 star! Beautiful home, had everything you could want… amazing experience!',
    name: 'Francine & Zia',
    date: 'August 2025',
    scan: '/images/testimonials/review-3.jpg',
  },
  {
    quote: 'Amazing house, clear communication, perfect for our event!',
    name: 'Bethan',
    date: 'June 2025',
    scan: '/images/testimonials/review-8.jpg',
  },
  {
    quote: 'So spectacular!',
    name: 'Ali family',
    date: null,
    scan: '/images/testimonials/review-7.jpg',
  },
];

export default function GuestBookSection() {
  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <Image
        src="/images/Sitting%20room/Sitting%20room%201.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-30"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">From our guest book</p>
        <h2 data-reveal className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05]">
          In our guests’ words,
          <em className="block font-light">written in the house.</em>
        </h2>

        {/* CSS columns: long and short entries pack without a fixed row height */}
        <ul className="mt-14 gap-6 sm:columns-2 lg:columns-3">
          {ENTRIES.map(({ quote, name, date, scan }) => (
            <li key={scan} data-reveal className="mb-6 break-inside-avoid border border-white/15 bg-ink/60 p-7 sm:p-8">
              <blockquote className="font-display text-[1.375rem] font-light italic leading-snug text-white">
                “{quote}”
              </blockquote>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 text-sm">
                <p className="text-white/75">
                  {[name ?? 'Guest', date].filter(Boolean).join(', ')}
                </p>
                <a href={scan} target="_blank" rel="noopener noreferrer" className="text-white/60 underline underline-offset-4 transition-colors duration-300 hover:text-white">
                  See the page
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
