'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

// Hash links rely on `scroll-smooth` + `scroll-padding-top` in globals.css, so no click handlers.
const NAV_ITEMS = [
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Activities', href: '/activities' },
  { name: 'Guest resources', href: '/info' },
  { name: 'Blog', href: '/blog' },
];

const linkClass = 'text-sm tracking-wide text-ink-soft transition-colors duration-300 hover:text-olive';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);

  return (
    <header className="print:hidden sticky top-0 z-50 border-b border-hairline bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={close} className="font-display text-2xl font-light tracking-[-0.01em] text-ink">
          The Luxury House
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={linkClass}>{item.name}</Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact-form"
                className="inline-flex min-h-10 items-center rounded-[2px] bg-olive px-5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-olive-deep"
              >
                Enquire
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="-mr-2 p-2 text-ink md:hidden"
        >
          {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-hairline bg-paper md:hidden">
          <ul className="px-5 py-4 sm:px-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.name} className="border-b border-hairline last:border-0">
                <Link href={item.href} onClick={close} className="block py-4 font-display text-2xl font-light text-ink">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-6 sm:px-8">
            <Link
              href="/#contact-form"
              onClick={close}
              className="flex min-h-12 items-center justify-center rounded-[2px] bg-olive text-sm font-medium tracking-wide text-white"
            >
              Enquire about dates
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
