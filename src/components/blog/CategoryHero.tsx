'use client';

import { motion } from 'framer-motion';
import { BlogCategory } from '@/lib/blog/blogData';

interface CategoryHeroProps {
  category: BlogCategory;
  subCategory?: string;
  postCount: number;
}

export default function CategoryHero({ category, subCategory, postCount }: CategoryHeroProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[#fceeed] to-[#d9d7c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6"
               style={{ backgroundColor: category.color, color: '#ffffff' }}>
            {category.name}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            {subCategory || category.name}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subCategory 
              ? `Explore our ${subCategory.toLowerCase()} articles in ${category.name.toLowerCase()}`
              : category.description
            }
          </p>
          
          {/* Stats */}
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg">
            <span className="text-[#948d71] font-semibold">
              {postCount} {postCount === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}