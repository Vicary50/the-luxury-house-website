import type { ComponentProps } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import Spread from '@/components/layout/Spread';
import ClosingCta from '@/components/layout/ClosingCta';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ENTRIES } from '@/components/layout/GuestBookSection';

interface OccasionPageProps {
  eyebrow: string;
  title: string;
  titleItalic: string;
  intro: string;
  spreads: ComponentProps<typeof Spread>[];
  factsTitle: string;
  facts: [string, string][];
  faqs: { question: string; answer: string }[];
  /** Index into the guest book ENTRIES, shown above the fold. */
  guestBook: number;
}

// Landing page for one kind of stay (hen weekends, birthdays, race days, couples). Content lives in each page file.
export default function OccasionPage({ eyebrow, title, titleItalic, intro, spreads, factsTitle, facts, faqs, guestBook }: OccasionPageProps) {
  const entry = ENTRIES[guestBook];
  return (
    <main>
      <PageHeader eyebrow={eyebrow} title={title} titleItalic={titleItalic} intro={<p>{intro}</p>}>
        <a
          href="/#contact-form"
          className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-olive px-8 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-olive-deep"
        >
          Enquire about dates
        </a>
        <p className="mt-4 text-sm text-muted">Tell us your dates and numbers, and we reply by email.</p>
        <figure className="mt-12 max-w-2xl border-l-2 border-olive pl-6">
          <blockquote className="font-display text-[1.5rem] italic leading-snug text-ink">“{entry.quote}”</blockquote>
          <figcaption className="mt-3 text-sm text-muted">
            {entry.name ? `${entry.name}, ` : ''}{entry.date} · <Link href="/#reviews" className="underline underline-offset-4 hover:text-olive">from our guest book</Link>
          </figcaption>
        </figure>
      </PageHeader>

      {spreads.map((spread, i) => (
        <Spread key={spread.title} {...spread} flip={i % 2 === 1} tone={i % 2 === 1 ? 'stone' : 'paper'} />
      ))}

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-olive">At a glance</p>
            <h2 data-reveal className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">{factsTitle}</h2>
            <dl data-reveal className="mt-10 border-t border-hairline">
              {facts.map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-hairline py-3 text-[0.9375rem]">
                  <dt className="text-ink">{term}</dt>
                  <dd className="text-muted">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-hairline lg:col-span-7 lg:col-start-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-[1.375rem] leading-snug text-ink transition-colors duration-300 hover:text-olive [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span aria-hidden="true" className="mt-1 text-2xl font-light leading-none text-olive transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="max-w-2xl pb-7 text-[1.0625rem] leading-[1.75] text-muted">{faq.answer}</p>
              </details>
            ))}
            <p className="pt-8 text-[1.0625rem] leading-[1.75] text-muted">
              More in our{' '}
              <Link href="/#faq" className="text-ink underline underline-offset-4 hover:text-olive">questions and house rules</Link>
              {' '}and the{' '}
              <Link href="/terms" className="text-ink underline underline-offset-4 hover:text-olive">terms and conditions</Link>.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
      <ScrollReveal />
    </main>
  );
}
