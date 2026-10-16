'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { havenImages } from '@/lib/images';

// First id is the large tile. Fixed-aspect tiles keep the page height stable while photos load.
const MOSAIC_IDS = ['poolside-outside-dining', 'living-2', 'kitchen-1', 'firepit-1', 'master-1'];
const mosaic = MOSAIC_IDS.map((id) => havenImages.findIndex((img) => img.id === id));

export default function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = havenImages.length;
  const current = havenImages[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <section id="gallery" className="bg-paper pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 border-t border-hairline pt-16 sm:flex-row sm:items-end sm:justify-between">
          <h2 data-reveal className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-light leading-[1.05] text-ink">
            Around the house
          </h2>
          <button
            type="button"
            onClick={() => open(0)}
            className="self-start border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive sm:self-auto"
          >
            View all {total} photos
          </button>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:grid-rows-2">
          {mosaic.map((i, n) => (
            <li key={havenImages[i].id} className={n === 0 ? 'col-span-2 lg:row-span-2' : ''}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Open photo: ${havenImages[i].alt}`}
                className="group relative block aspect-[3/2] h-full w-full overflow-hidden bg-stone"
              >
                <Image
                  src={havenImages[i].src}
                  alt=""
                  fill
                  sizes={n === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Native <dialog>: focus trap, Esc to close and inert background come from the browser. */}
      <dialog
        ref={dialogRef}
        aria-label="Photo gallery"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-white backdrop:bg-ink"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4 text-sm text-white/70 sm:px-8">
            <span aria-live="polite">{index + 1} / {total}</span>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close gallery" className="-mr-2 p-2 text-white">
              <X size={26} strokeWidth={1.25} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute inset-y-0 left-0 flex w-16 items-center justify-center text-white/70 hover:text-white sm:w-24">
              <ChevronLeft size={36} strokeWidth={1} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute inset-y-0 right-0 flex w-16 items-center justify-center text-white/70 hover:text-white sm:w-24">
              <ChevronRight size={36} strokeWidth={1} />
            </button>
          </div>

          <p className="px-5 py-5 text-center font-display text-lg italic text-white/80 sm:px-8">{current.alt}</p>
        </div>
      </dialog>
    </section>
  );
}
