'use client';

import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function ImageGallery() {
  
  // Select key interior images for the main gallery
  const galleryImages = [
    {
      src: '/images/Living%20area/Living%20area%202.jpg',
      alt: 'Luxury living room at The Luxury House with modern furnishings, comfortable seating and abundant natural light',
      title: 'Living Area'
    },
    {
      src: '/images/Master%20bedroom/Master%20bedroom%202.jpg',
      alt: 'Elegant master bedroom at The Luxury House featuring luxury bedding, ensuite bathroom and sophisticated decor',
      title: 'Master Bedroom'
    },
    {
      src: '/images/Kitchen%20%26%20utility/Kitchen%201.jpg',
      alt: 'Fully equipped gourmet kitchen at The Luxury House with modern appliances, granite countertops and premium fixtures',
      title: 'Gourmet Kitchen'
    },
    {
      src: '/images/Dining%20area/Dining%20area%201.jpg',
      alt: 'Sophisticated dining room at The Luxury House perfect for entertaining guests and family celebrations',
      title: 'Dining Room'
    },
    {
      src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%202.jpg',
      alt: 'Luxury bathroom at The Luxury House with premium fixtures, spa-like amenities and elegant marble finishes',
      title: 'Premium Bathroom'
    },
    {
      src: '/images/Kingsize%20bedroom/Kingsize%20bedroom%201.jpg',
      alt: 'Spacious kingsize bedroom at The Luxury House with elegant decor, luxury bedding and peaceful ambiance',
      title: 'Kingsize Bedroom'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Beautiful Interiors
          </h2>
        </motion.div>

        {/* Large Featured Image */}
        <motion.div 
          className="mb-12 relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <OptimizedImage
            src="/images/Sitting%20room/Sitting%20room%201.jpg"
            alt="Stunning luxury sitting room at The Luxury House with elegant furnishings, warm ambiance and sophisticated interior design"
            width={1200}
            height={400}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={400}
                height={256}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-light text-gray-800 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience comfort and luxury in every corner of our carefully 
            curated spaces
          </h3>
        </motion.div>

        {/* Additional Gallery Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: '/images/Playroom%20%3A%20sofabed/Playroom%201.jpg',
              alt: 'Spacious family playroom at The Luxury House with comfortable seating, entertainment area and games for children',
              title: 'Family Playroom'
            },
            {
              src: "/images/Children's%20room/Children's%20room%201.jpg",
              alt: 'Delightful children\'s room at The Luxury House with twin beds, bright colorful decor and child-friendly furnishings',
              title: 'Children\'s Room'
            },
            {
              src: '/images/Bunk%20bed%20room/Bunk%20bed%20room%201.jpg',
              alt: 'Fun bunk bed room at The Luxury House perfect for kids with creative design and safe sleeping arrangements',
              title: 'Bunk Room'
            },
            {
              src: '/images/Swimming%20pool/Swimming%20pool%201.jpg',
              alt: 'Beautiful private swimming pool at The Luxury House with heated water, pool lighting and landscaped surroundings',
              title: 'Swimming Pool'
            }
          ].map((image, index) => (
            <motion.div
              key={image.title}
              className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-md group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                <div className="p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">{image.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}