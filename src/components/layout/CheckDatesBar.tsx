'use client';

import { useEffect, useState } from 'react';

// Shown between the bottom of the hero and the enquiry form; hidden once the form is in view or passed.
export default function CheckDatesBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    const form = document.getElementById('contact-form');
    if (!hero || !form) return;
    let heroVisible = true;
    let formReached = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        else formReached = entry.isIntersecting || entry.boundingClientRect.top < 0;
      }
      setShow(!heroVisible && !formReached);
    });
    observer.observe(hero);
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm transition-[transform,opacity] duration-500 ease-[var(--ease-editorial)] motion-reduce:transition-none md:inset-x-auto md:bottom-6 md:right-6 md:border ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0 md:translate-y-4'
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-3">
        <p className="font-display text-lg text-ink">
          Sleeps up to 14<span className="hidden sm:inline"> <span className="text-muted">·</span> <em>East Yorkshire</em></span>
        </p>
        <a
          href="#contact-form"
          className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-[2px] bg-olive px-6 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-olive-deep"
        >
          Check dates
        </a>
      </div>
    </div>
  );
}
