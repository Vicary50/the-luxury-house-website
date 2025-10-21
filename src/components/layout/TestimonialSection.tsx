'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  review: string;
  image: string;
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Claudine Jackson',
      date: 'August 27, 2020',
      rating: 5,
      review: 'Amazing customer support and fantastic product to showcase your reviews on your website. Highly recommended.',
      image: '/images/testimonials/testimonial-1.jpg'
    },
    {
      id: 2,
      name: 'Brian Walton',
      date: 'August 8, 2020',
      rating: 5,
      review: 'Good solution, happy to be a Trustindex Pro user. Was really easy to integrate the widget to my WordPress website. Support working good.',
      image: '/images/testimonials/testimonial-2.jpg'
    },
    {
      id: 3,
      name: 'Nicholas Aldridge',
      date: 'July 31, 2020',
      rating: 5,
      review: 'The graphics are crisp, tagging helps conveniently categorize and filter reviews, the software is intuitive and easy to use.',
      image: '/images/testimonials/testimonial-3.jpg'
    },
    {
      id: 4,
      name: 'Sarah Mitchell',
      date: 'September 15, 2020',
      rating: 5,
      review: 'Absolutely wonderful stay! The house exceeded all our expectations. Perfect for our family reunion.',
      image: '/images/testimonials/testimonial-4.jpg'
    },
    {
      id: 5,
      name: 'James Thompson',
      date: 'October 3, 2020',
      rating: 5,
      review: 'Luxury at its finest. The heated pool was amazing and the service was impeccable. Will definitely return.',
      image: '/images/testimonials/testimonial-5.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <section className="py-8 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read testimonials from our satisfied guests who have experienced the luxury and comfort of The Luxury House
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {getVisibleTestimonials().map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Handwritten Testimonial Image */}
                  <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={`https://images.unsplash.com/photo-${1600000000000 + testimonial.id}?w=400&h=200&fit=crop`}
                      alt={`Handwritten testimonial from ${testimonial.name}`}
                      width={400}
                      height={200}
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Handwritten Testimonial</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}