'use client';

import { Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

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

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl merriweather-light text-white mb-4">THE LUXURY HOUSE</h2>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience luxury and tranquility in our carefully curated holiday home. 
              Where every detail matters and every moment is designed for your comfort.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/theluxuryhouseuk/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/p/The-Luxury-House-61558062093628/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors">Info</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-amber-400 transition-colors">Gallery</a></li>
              <li><a href="/#contact-form" onClick={handleContactClick} className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-amber-400" />
                <a 
                  href="mailto:theluxuryhouseuk@gmail.com" 
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 underline"
                >
                  theluxuryhouseuk@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-amber-400 mt-1" />
                <span className="text-gray-300">
                  Beautiful East Yorkshire<br />
                  United Kingdom
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 The Luxury House. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end mt-4 md:mt-0">
              <a 
                href="/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/cookie-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Cookie Policy
              </a>
              <a 
                href="/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}