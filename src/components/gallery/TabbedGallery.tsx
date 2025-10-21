'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { getImagesByCategory, getAllImages, getAllCategories } from '@/lib/images';
import { ImageCategory } from '@/types';

// Create dynamic categories based on actual image data
const availableCategories = getAllCategories();
const categories = [
  { id: 'all', label: 'ALL', category: null },
  ...availableCategories.map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-').replace(/'/g, ''),
    label: cat,
    category: cat as ImageCategory
  }))
];

export default function TabbedGallery() {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredImages = () => {
    if (activeTab === 'all') {
      return getAllImages();
    }
    const category = categories.find(cat => cat.id === activeTab)?.category;
    return category ? getImagesByCategory(category) : [];
  };

  const filteredImages = getFilteredImages();

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
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Browse by space
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? 'bg-amber-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700 shadow-sm hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={400}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {image.alt}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white">
                    {image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Results Count */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600">
            Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
            {activeTab !== 'all' && (
              <span className="ml-1">
                in {categories.find(cat => cat.id === activeTab)?.label.toLowerCase()}
              </span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}