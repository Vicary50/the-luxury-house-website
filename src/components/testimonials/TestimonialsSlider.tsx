'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  id: number;
  date: string;
  name: string;
  content: string;
  image: string;
  type?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    date: '22/8/25',
    name: 'Newton',
    content: 'Thank you. The whole of the Newton family, from 5 months to 75 years old had a wonderful stay in your lovely house.',
    image: '/images/testimonials/review-1.jpg'
  },
  {
    id: 2,
    date: '22-24 August \'25',
    name: 'Merrick',
    content: 'Thank you for having us in your lovely home to celebrate our hens! We can\'t wait to stay again!',
    image: '/images/testimonials/review-2.jpg',
    type: 'Hen Party'
  },
  {
    id: 3,
    date: '6/8/25',
    name: 'Francie + Zin',
    content: '5 star! Beautiful home, had everything you could want... amazing experience!',
    image: '/images/testimonials/review-3.jpg'
  },
  {
    id: 4,
    date: '9-8-25',
    name: 'Anonymous',
    content: 'Wow! we had a lovely stay in this beautiful home. Will be coming back soon. Thank-you for sharing your lovely home - Millie & Sid x',
    image: '/images/testimonials/review-4.jpg'
  },
  {
    id: 5,
    date: '19/4',
    name: 'Special Family',
    content: 'Spectacular! Our family',
    image: '/images/testimonials/review-7.jpg'
  },
  {
    id: 6,
    date: '6-8/6/25',
    name: 'Rohan',
    content: 'Amazing house, clear communication, perfect for our event!',
    image: '/images/testimonials/review-8.jpg'
  },
  {
    id: 7,
    date: '19/5/24',
    name: 'Anonymous',
    content: 'What a great find! Such a hidden gem, lovely and spacious, just what we needed as a family. The boys enjoyed splashing around and using the pool with which gave me and husband some time to relax and talk. Highly recommended',
    image: '/images/testimonials/review-9.jpg'
  },
  {
    id: 8,
    date: '26/5/24',
    name: 'The Sauna Guest',
    content: 'The sauna is superb! Such a treat to be able to relax by the pool, dip in and out and enjoy the spa. Luxurious, thoughtful touches throughout. Will definitely be back. Perfect for special occasions and celebrations with the family.',
    image: '/images/testimonials/review-10.jpg'
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Auto-advance functionality
  useEffect(() => {
    if (!isPaused && !lightboxImage) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, 5000); // 5 seconds
    }

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [isPaused, lightboxImage, totalPages]);

  // Pause auto-advance on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsPaused(true); // Pause auto-advance when user manually navigates
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsPaused(true); // Pause auto-advance when user manually navigates
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true); // Pause auto-advance when user manually navigates
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * testimonialsPerPage;
    return testimonials.slice(startIndex, startIndex + testimonialsPerPage);
  };

  const openLightbox = (image: string) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
            Guest Testimonials
          </h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Hear from our delighted guests about their unforgettable experiences at The Luxury House
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="wait">
              {getCurrentTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => openLightbox(testimonial.image)}
                >
                  {/* Testimonial Image */}
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={testimonial.image}
                      alt={`Testimonial from ${testimonial.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Type Badge */}
                    {testimonial.type && (
                      <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {testimonial.type}
                      </div>
                    )}
                  </div>

                  {/* Testimonial Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h3>
                      <span className="text-xs text-gray-500">{testimonial.date}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="mt-3 text-amber-600 text-xs font-medium group-hover:text-amber-700 transition-colors">
                      Click to view full testimonial →
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:bg-amber-50 transition-all duration-300 group"
              aria-label="Previous testimonials"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
            </button>

            {/* Page Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-amber-600 scale-110'
                      : 'bg-gray-300 hover:bg-amber-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:bg-amber-50 transition-all duration-300 group"
              aria-label="Next testimonials"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                  aria-label="Close lightbox"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-700" />
                </button>

                {/* Lightbox Image */}
                <div className="relative">
                  <OptimizedImage
                    src={lightboxImage}
                    alt="Full testimonial"
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}