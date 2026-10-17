export default function IntroSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-olive lg:col-span-3 lg:pt-4">East Yorkshire</p>
        <div data-reveal className="lg:col-span-8">
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
            One house, the whole party,
            <em className="block font-light">and room to spread out.</em>
          </h2>
          <p className="mt-8 max-w-2xl text-[1.0625rem] leading-[1.75] text-muted">
            The Luxury House is a large private home let as a whole, for groups of up to fifteen.
            Outside there is a heated pool, a poolside villa and a firepit terrace. Inside, a kitchen
            big enough for several cooks, a separate dining room, and two living rooms with
            wood-burning stoves.
          </p>
        </div>
      </div>
    </section>
  );
}
