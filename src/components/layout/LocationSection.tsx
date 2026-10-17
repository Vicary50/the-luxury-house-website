import Link from 'next/link';

const STATIONS = [
  ['Beverley', '25 min drive'],
  ['Brough station', '6.9 miles'],
  ['Hull station', '8.3 miles'],
];

export default function LocationSection() {
  return (
    <section id="location" className="bg-stone py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-olive">Location</p>
          <h2 data-reveal className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
            East Yorkshire,
            <em className="block font-light">within reach of Beverley and Hull.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[1.0625rem] leading-[1.75] text-muted">
            Our activities guide covers places to eat, Hull’s old town and The Deep, and days out in the
            Yorkshire Wolds.
          </p>
          <Link
            href="/activities"
            className="mt-10 inline-flex min-h-12 items-center border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
          >
            Things to do nearby
          </Link>
        </div>

        <dl data-reveal className="self-end border-t border-hairline lg:col-span-4 lg:col-start-9">
          {STATIONS.map(([place, distance]) => (
            <div key={place} className="flex items-baseline justify-between border-b border-hairline py-4">
              <dt className="text-ink">{place}</dt>
              <dd className="font-display text-2xl text-ink">{distance}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
