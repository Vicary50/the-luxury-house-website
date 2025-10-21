'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

const trendingPosts = [
  {
    id: 1,
    title: 'How to Make the Most of Your Private Pool Experience',
    date: 'Dec 18, 2024',
    readTime: '5 min',
    category: 'Pool Experience',
    slug: 'private-pool-experience',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Yorkshire\'s Hidden Gems: Local Attractions Near The Luxury House',
    date: 'Dec 16, 2024',
    readTime: '7 min',
    category: 'Local Guide',
    slug: 'yorkshire-hidden-gems',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Creating Perfect Family Memories: Activities for All Ages',
    date: 'Dec 14, 2024',
    readTime: '6 min',
    category: 'Family Activities',
    slug: 'family-activities-guide',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=250&fit=crop'
  }
];

export default function TrendingSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-[#948d71] to-[#7a7460] rounded-xl p-6 text-white"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Trending at The Luxury House</h2>
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="space-y-4">
        {trendingPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
          >
            <Link 
              href={`/blog/${post.slug}`}
              className="group block bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-200"
            >
              <div className="flex gap-3">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs md:text-sm leading-tight mb-2 group-hover:text-[#f7c6c2] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}