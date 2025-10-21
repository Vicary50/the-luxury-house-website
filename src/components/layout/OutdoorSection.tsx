'use client';

import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function OutdoorSection() {

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Relax in Your section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Relax in Your
            <br />
            <span className="text-amber-700">Private Oasis</span>
          </h2>
        </motion.div>

        {/* Large Pool Image */}
        <motion.div 
          className="mb-12 relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <OptimizedImage
            src="/images/Swimming%20pool/Swimming%20pool%201.jpg"
            alt="Beautiful private swimming pool at The Luxury House surrounded by lush landscaping and elegant outdoor furniture"
            width={1200}
            height={400}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-semibold mb-2">Private Pool & Gardens</h3>
              <p className="text-lg opacity-90">Your personal sanctuary for relaxation</p>
            </div>
          </div>
        </motion.div>

        {/* Pool Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <OptimizedImage
                src="/images/Swimming%20pool/Swimming%20pool%206.jpg"
                alt="Evening pool area at The Luxury House with beautiful ambient lighting and romantic atmosphere"
                width={600}
                height={300}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">Evening Pool Views</h4>
                  <p className="text-sm opacity-90">Magical ambiance for evening relaxation</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <OptimizedImage
                src="/images/Poolside%20villa/Poolside%20villa%20dining%20area%201.jpg"
                alt="Poolside dining area at The Luxury House perfect for outdoor entertaining and al fresco meals"
                width={600}
                height={300}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">Poolside Dining</h4>
                  <p className="text-sm opacity-90">Al fresco dining with stunning pool views</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fire Pit Area */}
        <motion.div 
          className="mb-12 relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <OptimizedImage
            src="/images/Firepit/Fire%20pit%201.jpg"
            alt="Cozy fire pit area at The Luxury House perfect for evening gatherings, storytelling and stargazing"
            width={1000}
            height={300}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1000px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Cozy Fire Pit</h3>
              <p className="text-base opacity-90">Perfect for evening gatherings under the stars</p>
            </div>
          </div>
        </motion.div>

        {/* Outdoor Features */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Private Pool', desc: 'Beautiful swimming pool with landscaped surrounds' },
              { title: 'Fire Pit Area', desc: 'Cozy gathering space for evenings' },
              { title: 'Outdoor Shower', desc: 'Refreshing rinse area by the pool' },
              { title: 'Poolside Villa', desc: 'Additional dining and relaxation space' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}