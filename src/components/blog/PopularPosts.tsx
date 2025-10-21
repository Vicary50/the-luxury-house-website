'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

const popularPosts = [
  {
    id: 1,
    title: 'Best Luxury Holiday Destinations for Families in 2025',
    excerpt: 'Looking to plan your family holiday or upgrade to something more luxurious? We\'ll provide our top picks for family destinations for every budget and preference.',
    author: 'Sarah Johnson',
    authorRole: 'Travel & Lifestyle Expert',
    date: 'Nov 28, 2024',
    readTime: '8 min',
    category: 'Family Travel',
    slug: 'best-luxury-family-destinations',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'How to Host the Perfect Celebration: Step-by-Step Guide & Checklist',
    excerpt: 'Learn how to host the perfect celebration with real tips from experienced party planners. From planning, guest management, and catering to entertainment.',
    author: 'Michael Chen',
    authorRole: 'Event Planning Specialist',
    date: 'Nov 25, 2024',
    readTime: '12 min',
    category: 'Event Planning',
    slug: 'perfect-celebration-guide',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Luxury Holiday Home Features: What Makes The Luxury House Special',
    excerpt: 'Discover the many features of luxury holiday homes and find out how to choose a holiday property with all the amenities you need in the highest quality possible.',
    author: 'Emma Thompson',
    authorRole: 'Luxury Property Expert',
    date: 'Nov 22, 2024',
    readTime: '10 min',
    category: 'Property Features',
    slug: 'luxury-holiday-home-features',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop'
  }
];

export default function PopularPosts() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-4">
          Most popular posts
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {popularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#f7a49e] text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#948d71] transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
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
    </div>
  );
}