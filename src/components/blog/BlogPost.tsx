'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    tags: string[];
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#948d71] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#948d71] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900">{post.category}</span>
        </div>
      </motion.nav>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#fceeed] text-[#948d71] text-sm font-semibold rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pb-8 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#948d71] to-[#7a7460] rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">{post.authorRole}</p>
            </div>
          </div>
          
          <div className="text-right text-sm text-gray-500">
            <p>{post.date}</p>
            <p>{post.readTime} read</p>
          </div>
        </div>
      </motion.header>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden mb-12"
      >
        <OptimizedImage
          src={post.image}
          alt={post.title}
          width={1200}
          height={600}
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{
          '--tw-prose-headings': '#111827',
          '--tw-prose-body': '#374151',
          '--tw-prose-links': '#d97706',
          '--tw-prose-bold': '#111827',
          '--tw-prose-counters': '#6b7280',
          '--tw-prose-bullets': '#d1d5db',
        } as React.CSSProperties}
      />

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 pt-8 border-t border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Back to Blog */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-[#948d71] text-white font-semibold rounded-lg hover:bg-[#7a7460] transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0L2.586 11H9a1 1 0 110 2H2.586l3.707 3.707a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L2.586 9H9a1 1 0 110 2H2.586l3.707 3.707z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
      </motion.div>
    </article>
  );
}