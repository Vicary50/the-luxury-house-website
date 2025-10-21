'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center text-white"
    >
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
        Never miss another luxury travel tip
      </h2>
      
      <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Get exclusive insights, special offers, and luxury travel guides delivered straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600"
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>
        
        <p className="text-sm text-white/80 mt-4">
          Join 2,500+ luxury travelers who trust The Luxury House for their holiday inspiration.
        </p>
      </form>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-green-500 text-white rounded-lg"
        >
          Welcome to The Luxury House community! Check your email for confirmation.
        </motion.div>
      )}
    </motion.div>
  );
}