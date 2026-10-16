import Image from 'next/image';

// Editorial spread: photo bleeds to the left edge, text sits in the right-hand columns.
export default function LuxurySection() {
  return (
    <section id="about" className="bg-stone">
      <div className="grid lg:grid-cols-12">
        <div className="relative aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[44rem]">
          <Image
            src="/images/Swimming%20pool/Swimming%20pool%201.jpg"
            alt="The heated pool beside the house, with sun loungers on the terrace and the lawn beyond"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex items-center px-5 py-16 sm:px-8 sm:py-20 lg:col-span-5 lg:px-16 xl:px-24">
          <div className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-olive">The pool and villa</p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
              Warm water,
              <em className="block font-light">whatever the weather.</em>
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-muted">
              <p>
                The outdoor pool is heated, so a Yorkshire spring or autumn is no reason to stay dry.
                Loungers line the terrace, and the lawn gives the children room to run between swims.
              </p>
              <p>
                Across the terrace, the poolside villa has its own kitchen, lounge, dining table and
                shower. It is where long lunches happen, and where everyone dries off without
                trailing water through the house.
              </p>
            </div>
            <a
              href="#contact-form"
              className="mt-10 inline-flex min-h-12 items-center border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
            >
              Enquire about dates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
