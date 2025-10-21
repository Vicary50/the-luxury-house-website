'use client';

import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { CheckIcon } from '@heroicons/react/24/outline';

const accommodationOptions = [
  {
    type: 'entire-property',
    title: 'The Luxury House - Main House, Pool Villa, Heated Swimming Pool',
    description: 'Exclusive use of the entire holiday home',
    features: [
      'Sleeps up to 14 adults, 2 under-12s & 2 infants in individual cots',
      '5 bedrooms each with en-suite shower',
      'Master bedroom with bath',
      'Pool villa with en-suite shower',
      'Heated swimming pool'
    ],
    images: [
      '/images/Master%20bedroom/Master%20bedroom%201.jpg',
      '/images/Swimming%20pool/Swimming%20pool%201.jpg',
      '/images/Living%20area/Living%20area%202.jpg'
    ],
    priceFrom: '£120',
    priceUnit: 'per person / per night (minimum of 10 adults & 2 nights)',
    highlights: 'Perfect for large groups and families',
    maxGuests: 15,
    bedrooms: '5 bedrooms'
  },
  {
    type: 'poolhouse-only',
    title: 'Pool Villa & Heated Swimming Pool',
    description: 'Cozy accommodation with pool access',
    features: [
      'Sleeps up to 3 adults',
      'Relaxing lounge area',
      'Kitchenette & dining area',
      'Heated swimming pool'
    ],
    images: [
      '/images/Poolside%20villa/Poolside%20villa%20lounge%202.jpg',
      '/images/Poolside%20villa/Poolside%20villa%20dining%20area%201.jpg',
      '/images/Swimming%20pool/Swimming%20pool%206.jpg'
    ],
    priceFrom: '£115',
    priceUnit: 'per person / per night (minimum of 2 adults)',
    highlights: 'Ideal for couples and small groups',
    maxGuests: 3,
    bedrooms: 'Poolhouse'
  }
];

export default function AccommodationSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Choose Your Accommodation
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Select the accommodation that best suits your group size and requirements
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {accommodationOptions.map((option, index) => (
            <motion.div
              key={option.type}
              className="relative border-2 border-gray-200 rounded-lg overflow-hidden hover:border-amber-300 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image Gallery */}
              <div className="relative h-48 bg-gray-100">
                <div className="grid grid-cols-3 h-full gap-1">
                  {option.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <OptimizedImage
                        src={image}
                        alt={`${option.title} - Image ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, (max-width: 1024px) 16vw, 11vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{option.description}</p>
                    <p className="text-sm text-amber-600 font-medium">
                      {option.highlights}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">From</div>
                    <div className="text-2xl font-bold text-gray-900">{option.priceFrom}</div>
                    <div className="text-sm text-gray-500">{option.priceUnit}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 mb-3">What&apos;s included:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
