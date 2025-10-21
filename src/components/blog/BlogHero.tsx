'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { getFeaturedPosts } from '@/lib/blog/blogData';

export default function BlogHero() {
  const featuredPost = getFeaturedPosts()[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Featured Article */}
      {featuredPost && (
        <Link href={`/blog/${featuredPost.slug}`} className="block group">
          <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
            <OptimizedImage
              src={featuredPost.image}
              alt={featuredPost.title}
              width={800}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#fceeed] text-[#948d71] text-sm font-semibold rounded-full">
                {featuredPost.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-4 group-hover:text-[#948d71] transition-colors">
              {featuredPost.title}
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#948d71] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">
                    {featuredPost.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{featuredPost.author}</p>
                  <p className="text-xs md:text-sm text-gray-500">{featuredPost.authorRole}</p>
                </div>
              </div>
              
              <div className="text-xs md:text-sm text-gray-500">
                <span>{featuredPost.date}</span>
                <span className="mx-2">•</span>
                <span>{featuredPost.readTime} read</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </motion.div>
  );
}