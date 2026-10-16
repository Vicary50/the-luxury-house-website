import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const linkClass = 'text-white/70 transition-colors duration-300 hover:text-white';

const EXPLORE = [
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Activities', href: '/activities' },
  { name: 'Guest resources', href: '/info' },
  { name: 'Blog', href: '/blog' },
  { name: 'Enquire', href: '/#contact-form' },
];

// Opened in a new tab so a half-filled enquiry form is not lost.
const LEGAL = [
  { name: 'Privacy policy', href: '/privacy-policy' },
  { name: 'Cookie policy', href: '/cookie-policy' },
  { name: 'Terms & conditions', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white print:hidden">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-4xl font-light tracking-[-0.01em]">The Luxury House</p>
            <p className="mt-2 font-display text-xl font-light italic text-white/70">East Yorkshire</p>
            <div className="mt-8 flex gap-5">
              <a href="https://www.instagram.com/theluxuryhouseuk/" target="_blank" rel="noopener noreferrer" aria-label="The Luxury House on Instagram" className={linkClass}>
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/p/The-Luxury-House-61558062093628/" target="_blank" rel="noopener noreferrer" aria-label="The Luxury House on Facebook" className={linkClass}>
                <Facebook size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/50">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {EXPLORE.map((item) => (
                <li key={item.name}><Link href={item.href} className={linkClass}>{item.name}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/50">Contact</h2>
            <p className="mt-5 text-sm">
              <a href="mailto:theluxuryhouseuk@gmail.com" className={`${linkClass} underline decoration-white/30 underline-offset-4`}>
                theluxuryhouseuk@gmail.com
              </a>
            </p>
            <p className="mt-3 text-sm text-white/70">East Yorkshire, United Kingdom</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Luxury House</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.name}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-white">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
