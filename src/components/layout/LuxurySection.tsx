'use client';

import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function LuxurySection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Where Luxury Meets
              <br />
              <span className="text-amber-700">Tranquility</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Step into a home where every detail has been carefully curated to provide you 
              unparalleled comfort and sophistication. The Luxury House offers the perfect sanctuary 
              for those seeking to escape the ordinary and embrace the extraordinary.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Whether you&apos;re planning a family gathering, a reunion with friends, or a special 
              celebration like a hen party or Eid, The Luxury House provides the perfect 
              backdrop for creating lasting memories. Our attention to detail ensures that 
              every aspect of your stay exceeds expectations.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              By booking directly with us, you&apos;ll not only secure the best rates but also 
              receive personalized service tailored to your specific needs. We&apos;re committed 
              to making your stay as comfortable and enjoyable as possible.
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/images/Sitting%20room/Sitting%20room%201.jpg"
                alt="Elegant sitting room at The Luxury House with luxury furnishings, warm ambiance and sophisticated interior design"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-100 rounded-full opacity-60"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-amber-200 rounded-full opacity-40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}