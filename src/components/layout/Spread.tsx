import Image from 'next/image';

interface SpreadProps {
  id?: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  titleItalic: string;
  paragraphs: string[];
  /** Photo on the right instead of the left. */
  flip?: boolean;
  tone?: 'stone' | 'paper';
  cta?: boolean;
}

// Editorial spread: photo bleeds to one edge, text sits in the remaining columns.
export default function Spread({ id, image, alt, eyebrow, title, titleItalic, paragraphs, flip = false, tone = 'stone', cta = false }: SpreadProps) {
  return (
    <section id={id} className={tone === 'stone' ? 'bg-stone' : 'bg-paper'}>
      <div className="grid lg:grid-cols-12">
        <div className={`relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[44rem] ${flip ? 'lg:order-2' : ''}`}>
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 58vw, 100vw" data-reveal-image className="object-cover" />
        </div>

        <div className={`flex items-center px-5 py-16 sm:px-8 sm:py-20 lg:col-span-5 lg:px-16 xl:px-24 ${flip ? 'lg:order-1' : ''}`}>
          <div data-reveal className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-olive">{eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
              {title}
              <em className="block font-light">{titleItalic}</em>
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-muted">
              {paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            {cta && (
              <a
                href="/#contact-form"
                className="mt-10 inline-flex min-h-12 items-center border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
              >
                Enquire about dates
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
