'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { blogCategories, getRecentPosts } from '@/lib/blog/blogData';

const categories = ['All Articles', ...blogCategories.map(cat => cat.name)];

const allArticles = getRecentPosts(12);

export default function AllArticles() {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const filteredArticles = selectedCategory === 'All Articles' 
    ? allArticles 
    : allArticles.filter(article => article.category === selectedCategory);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-6 md:mb-8">
          All Articles
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-[#948d71] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <Link href={`/blog/${article.slug}`} className="block">
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#f7a49e] text-white text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#948d71] transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <div className="text-[#948d71] group-hover:text-[#7a7460] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <button className="px-8 py-3 bg-[#948d71] text-white font-semibold rounded-lg hover:bg-[#7a7460] transition-all duration-200 transform hover:scale-105">
          View all articles
        </button>
      </motion.div>
    </div>
  );
}