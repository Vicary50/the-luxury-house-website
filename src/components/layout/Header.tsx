'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're on the homepage, smooth scroll to contact form
    if (pathname === '/') {
      e.preventDefault();
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Otherwise, let the link navigate normally to /#contact-form
  };

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're on the homepage, smooth scroll to gallery section
    if (pathname === '/') {
      e.preventDefault();
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Otherwise, let the link navigate normally to /#gallery
  };

  const navItems = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'Activities & Experiences', href: '/activities', isPage: true },
    { name: 'Gallery', href: '/#gallery', onClick: handleGalleryClick, isPage: false },
    { name: 'Guest Resources', href: '/info', isPage: true },
    { name: 'Blog', href: '/blog', isPage: true },
    { name: 'Contact', href: '/#contact-form', onClick: handleContactClick, isPage: false },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Empty space where logo was */}
          <div className="flex-shrink-0">
            {/* Logo removed */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isPage ? (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-amber-700 font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className="text-gray-700 hover:text-amber-700 font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="/#contact-form"
              onClick={handleContactClick}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-amber-700 focus:outline-none focus:text-amber-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium"
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (item.onClick) {
                        item.onClick(e);
                      }
                    }}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <a
                href="/#contact-form"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleContactClick(e);
                }}
                className="block w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}