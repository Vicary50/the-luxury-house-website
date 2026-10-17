import Image from 'next/image';

export default function ClosingCta() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-ink">
      <Image
        src="/images/Poolside%20villa/Poolside%20villa%20outside%20dining%20area.jpg"
        alt=""
        fill
        sizes="100vw"
        data-reveal-image
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <h2 data-reveal className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1] text-white">
          Bring everyone,
          <em className="block font-light">and stay a while.</em>
        </h2>
        <a
          href="/#contact-form"
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-[2px] bg-white px-8 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:bg-stone"
        >
          Enquire about dates
        </a>
      </div>
    </section>
  );
}
