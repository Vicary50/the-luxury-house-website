'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { havenImages, getAllCategories, getImagesByCategory } from '@/lib/images';
import { ImageCategory } from '@/types';

type Category = 'ALL' | ImageCategory;

export default function MasonryGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  // Get all available categories and add 'ALL' option
  const availableCategories = getAllCategories();
  const categories: Category[] = ['ALL', ...availableCategories];

  const getCategoryImages = (category: Category) => {
    if (category === 'ALL') return havenImages;
    return getImagesByCategory(category);
  };

  const filteredImages = getCategoryImages(activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            GALLERY
          </h2>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 max-w-5xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-200 rounded-full ${
                activeCategory === category
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${activeCategory}-${image.id}`}
              className="break-inside-avoid mb-4 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay with category label - positioned like in screenshot */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                    {image.title || image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}