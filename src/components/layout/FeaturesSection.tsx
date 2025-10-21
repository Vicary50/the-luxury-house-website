'use client';

import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 2C4.34 2 3 3.34 3 5v8c0 1.66 1.34 3 3 3h1v2c0 1.1.9 2 2 2s2-.9 2-2v-2h4v2c0 1.1.9 2 2 2s2-.9 2-2v-2h1c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3H6zm12 2c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h12zM8 6v1h8V6H8zm0 2v1h8V8H8zm0 2v1h8v-1H8z"/>
          <path d="M2 18c.5-.5 1-.5 1.5 0s1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0"/>
          <path d="M2 20c.5-.5 1-.5 1.5 0s1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0 1-.5 1.5 0 1 .5 1.5 0"/>
        </svg>
      ),
      title: 'Outdoor Heated Swimming Pool',
      description: 'Dive into luxury with our temperature-controlled pool, perfect for year-round enjoyment regardless of the Yorkshire weather.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 10.5c0-.83-.67-1.5-1.5-1.5h-15C3.67 9 3 9.67 3 10.5V12h18v-1.5zM7 7c0-1.1.9-2 2-2s2 .9 2 2H7zm8 0c0-1.1.9-2 2-2s2 .9 2 2h-4zM3 13v5c0 .55.45 1 1 1h1v-2h14v2h1c.55 0 1-.45 1-1v-5H3z"/>
          <path d="M6 16v2h2v-2H6zm10 0v2h2v-2h-2z"/>
        </svg>
      ),
      title: 'Luxury Bedrooms',
      description: 'Rest in elegantly furnished bedrooms featuring premium linens, comfortable mattresses, and stunning countryside views.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"/>
        </svg>
      ),
      title: 'Firepit Area',
      description: 'Gather around our cozy firepit for evening conversations, marshmallow roasting, and creating magical memories under the stars.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83l7.02 7.01zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41-6.51-6.75z"/>
          <path d="M2 3h2v18H2z"/>
          <path d="M6 3v4l-2-2-2 2V3h4z"/>
        </svg>
      ),
      title: 'Gourmet Kitchen',
      description: 'Create culinary masterpieces in our fully equipped kitchen with professional-grade appliances and spacious granite countertops.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ),
      title: 'Private Parking',
      description: 'Enjoy peace of mind with secure, dedicated parking spaces for multiple vehicles right on the property.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-3 5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5S7 15.33 7 14.5zm7-5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/>
          <path d="M7.5 11.5c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm9 0c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z"/>
          <path d="M9 14c0 1.66 1.34 3 3 3s3-1.34 3-3"/>
        </svg>
      ),
      title: 'Entertainment Spaces',
      description: 'From the games room to outdoor dining areas, we provide multiple spaces designed for group activities and socializing.'
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every detail has been carefully considered to ensure your stay exceeds expectations
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-left p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 text-amber-600 rounded-xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}