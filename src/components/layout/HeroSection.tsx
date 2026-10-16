import Image from 'next/image';

// Hero film: scripts/media.mjs writes `${HERO_VIDEO}-{landscape,portrait}.{webm,mp4,jpg}`.
// Landscape screens get the 16:9 cut, portrait screens the full-height film; the .jpg is
// each cut's first frame, shown until playback starts. null = photo-only hero.
// The photo is the reduced-motion fallback.
const HERO_VIDEO: string | null = '/video/kitchen-film';
const HERO_PHOTO = '/images/Swimming%20pool/Swimming%20pool%206.jpg';

const FACTS = [
  'Sleeps up to 14',
  'Heated outdoor pool',
  'Poolside villa',
  'Firepit terrace',
  'East Yorkshire',
];

export default function HeroSection() {
  return (
    <>
      <section id="home" className="relative isolate flex min-h-[640px] h-[calc(100svh-4rem)] items-end overflow-hidden bg-ink">
        <div className="hero-settle absolute inset-0 -z-10">
          {HERO_VIDEO ? (
            <div className="absolute inset-0 motion-reduce:hidden">
              <picture>
                <source media="(orientation: landscape)" srcSet={`${HERO_VIDEO}-landscape.jpg`} />
                <img src={`${HERO_VIDEO}-portrait.jpg`} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
              </picture>
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden="true">
                <source media="(orientation: landscape)" src={`${HERO_VIDEO}-landscape.webm`} type="video/webm" />
                <source media="(orientation: landscape)" src={`${HERO_VIDEO}-landscape.mp4`} type="video/mp4" />
                <source src={`${HERO_VIDEO}-portrait.webm`} type="video/webm" />
                <source src={`${HERO_VIDEO}-portrait.mp4`} type="video/mp4" />
              </video>
            </div>
          ) : null}
          <Image
            src={HERO_PHOTO}
            alt="The heated outdoor pool at The Luxury House, with the poolside villa and lounge terrace beyond"
            fill
            priority={!HERO_VIDEO}
            sizes="100vw"
            className={`object-cover ${HERO_VIDEO ? 'hidden motion-reduce:block' : ''}`}
          />
        </div>
        {/* Scrim only behind the text block, so the photo stays clean above it */}
        <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-gradient-to-t from-black/80 via-black/45 via-45% to-black/0 sm:h-3/4" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20 lg:pb-24">
          <h1 className="rise-in font-display text-[clamp(3.25rem,9vw,7.5rem)] font-light leading-[0.95] tracking-[-0.01em] text-white">
            The Luxury House
          </h1>
          <p
            className="rise-in mt-5 max-w-xl font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light italic leading-snug text-white/90"
            style={{ animationDelay: '180ms' }}
          >
            Room for fourteen, a heated pool, and a fire to end the day.
          </p>
          <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '360ms' }}>
            <a
              href="#contact-form"
              className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-white px-8 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:bg-stone"
            >
              Enquire about dates
            </a>
            <a
              href="#gallery"
              className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-white/60 px-8 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
            >
              View the gallery
            </a>
          </div>
        </div>
      </section>

      <div className="border-b border-hairline bg-paper">
        {/* gap-px over a hairline background draws the dividers at every breakpoint */}
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-hairline md:grid-cols-5">
          {FACTS.map((fact) => (
            <li
              key={fact}
              className="bg-paper px-3 py-5 text-center font-display text-lg text-ink last:col-span-2 md:text-xl md:last:col-span-1"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
