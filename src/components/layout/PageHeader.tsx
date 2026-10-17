import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  intro?: ReactNode;
  /** Actions shown under the intro, e.g. a print button. */
  children?: ReactNode;
}

// Opening band for inner pages: same eyebrow + display title pairing as the home sections.
export default function PageHeader({ eyebrow, title, titleItalic, intro, children }: PageHeaderProps) {
  return (
    <header className="bg-stone py-20 sm:py-28 print:bg-transparent print:py-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="rise-in text-xs font-medium uppercase tracking-[0.2em] text-olive">{eyebrow}</p>
        <h1 className="rise-in mt-5 max-w-4xl font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-light leading-[1.02] text-ink">
          {title}
          {titleItalic && <em className="block font-light">{titleItalic}</em>}
        </h1>
        {intro && <div className="mt-8 max-w-2xl text-[1.0625rem] leading-[1.75] text-muted">{intro}</div>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}
