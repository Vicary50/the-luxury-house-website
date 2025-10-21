'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { blogCategories } from '@/lib/blog/blogData';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function CategoryNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-[#fceeed] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-16">
          {/* Blog Categories */}
          <div className="flex items-center space-x-6 xl:space-x-8">
            <Link 
              href="/blog"
              className="text-[#948d71] hover:text-[#7a7460] font-medium transition-colors"
            >
              All Posts
            </Link>
            
            {blogCategories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-[#948d71] font-medium transition-colors">
                  <span>{category.name}</span>
                  {category.subCategories && (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {category.subCategories && (
                  <AnimatePresence>
                    {activeDropdown === category.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                      >
                        <div className="p-4">
                          <Link
                            href={`/blog/category/${category.id}`}
                            className="block px-3 py-2 text-[#948d71] font-semibold hover:bg-[#fceeed] rounded-md transition-colors"
                          >
                            All {category.name}
                          </Link>
                          {category.subCategories.map((subCategory) => (
                            <Link
                              key={subCategory}
                              href={`/blog/category/${category.id}?sub=${encodeURIComponent(subCategory)}`}
                              className="block px-3 py-2 text-gray-600 hover:text-[#948d71] hover:bg-[#fceeed] rounded-md transition-colors"
                            >
                              {subCategory}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-48 xl:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#948d71] focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden py-4 space-y-4">
          {/* Search Bar - Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#948d71] focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories - Mobile */}
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/blog"
              className="inline-flex items-center px-3 py-2 bg-[#948d71] text-white text-sm font-medium rounded-full hover:bg-[#7a7460] transition-colors"
            >
              All Posts
            </Link>
            
            {blogCategories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.id}`}
                className="inline-flex items-center px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 hover:text-[#948d71] transition-colors border border-gray-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}