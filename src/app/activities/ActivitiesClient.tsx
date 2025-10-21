'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ActivitiesClient() {
  const [activeRestaurantCategory, setActiveRestaurantCategory] = useState('all');
  const [activeAttractionCategory, setActiveAttractionCategory] = useState('all');

  const restaurantCategories = [
    { id: 'all', name: 'All Restaurants' },
    { id: 'fine-dining', name: 'Fine Dining' },
    { id: 'casual', name: 'Casual Dining' },
    { id: 'pubs', name: 'Pubs & Traditional' },
    { id: 'international', name: 'International' }
  ];

  const attractionCategories = [
    { id: 'all', name: 'All Attractions' },
    { id: 'historic', name: 'Historic Sites' },
    { id: 'museums', name: 'Museums & Culture' },
    { id: 'nature', name: 'Nature & Outdoors' },
    { id: 'family', name: 'Family Fun' }
  ];

  const restaurants = [
    {
      name: 'The White Hart',
      category: 'fine-dining',
      cuisine: 'Modern British',
      features: ['Michelin Guide Listed', 'Seasonal Menu', 'Local Ingredients'],
      location: 'Hull City Centre',
      description: 'Award-winning restaurant offering contemporary British cuisine with a focus on Yorkshire produce.',
      website: null
    },
    {
      name: 'Ambiente Tapas',
      category: 'international',
      cuisine: 'Spanish',
      features: ['Authentic Tapas', 'Wine Selection', 'Live Music'],
      location: 'Princes Avenue, Hull',
      description: 'Vibrant Spanish restaurant serving authentic tapas and paella in a lively atmosphere.',
      website: 'https://www.ambientetapas.co.uk'
    },
    {
      name: 'The Old House',
      category: 'pubs',
      cuisine: 'Traditional British',
      features: ['Historic Pub', 'Real Ales', 'Sunday Roasts'],
      location: 'Scale Lane, Hull',
      description: 'Historic 17th-century pub offering traditional British fare and locally brewed ales.',
      website: 'https://www.theoldhousehull.com'
    },
    {
      name: 'Hitchcocks Vegetarian Restaurant',
      category: 'casual',
      cuisine: 'Vegetarian/Vegan',
      features: ['Plant-Based Menu', 'Organic Ingredients', 'Cozy Atmosphere'],
      location: 'Bishop Lane, Hull',
      description: 'Charming vegetarian restaurant known for creative plant-based dishes and welcoming atmosphere.',
      website: 'http://hitchcocksrestaurant.co.uk'
    },
    {
      name: 'The Granary',
      category: 'casual',
      cuisine: 'British / Seafood',
      features: ['Riverside Location', 'Fresh Seafood', 'Family-Friendly'],
      location: 'The Marina, Hull',
      description: 'Popular marina restaurant specializing in fresh seafood and traditional British cuisine.',
      website: 'https://www.granaryhull.co.uk'
    },
    {
      name: 'Thieving Harry&apos;s',
      category: 'casual',
      cuisine: 'Modern British',
      features: ['Craft Cocktails', 'Live Music', 'Local Art'],
      location: 'Humber Street, Hull',
      description: 'Trendy bar-restaurant in the cultural quarter serving modern British dishes and craft cocktails.',
      website: 'https://www.thievingharrys.co.uk'
    }
  ];

  const attractions = [
    {
      name: 'The Deep',
      category: 'family',
      type: 'Aquarium',
      highlights: ['World&apos;s Only Submarium', '3,500 Fish', 'Interactive Exhibits'],
      location: 'Tower Street, Hull',
      description: 'One of the UK&apos;s most spectacular aquariums, home to sharks, rays, and diverse marine life.',
      website: 'https://www.thedeep.co.uk'
    },
    {
      name: 'Hull Old Town',
      category: 'historic',
      type: 'Historic District',
      highlights: ['Medieval Streets', 'Historic Pubs', 'Cobblestone Lanes'],
      location: 'Hull City Centre',
      description: 'Charming historic quarter with medieval streets, traditional pubs, and centuries of maritime history.',
      website: 'https://www.visithull.org'
    },
    {
      name: 'Ferens Art Gallery',
      category: 'museums',
      type: 'Art Gallery',
      highlights: ['Free Entry', 'Contemporary Art', 'Local Artists'],
      location: 'Queen Victoria Square, Hull',
      description: 'Premier art gallery featuring contemporary works, local artists, and rotating exhibitions.',
      website: 'https://www.hcandl.co.uk/ferens'
    },
    {
      name: 'Yorkshire Wolds',
      category: 'nature',
      type: 'Natural Landscape',
      highlights: ['Rolling Hills', 'Walking Trails', 'Scenic Views'],
      location: '30 mins from Hull',
      description: 'Area of Outstanding Natural Beauty with rolling chalk hills, charming villages, and excellent walking.',
      website: 'https://www.visithullandeastyorkshire.com/yorkshire-wolds'
    },
    {
      name: 'Streetlife Museum',
      category: 'museums',
      type: 'Transport Museum',
      highlights: ['Historic Vehicles', 'Interactive Displays', 'Victorian Street'],
      location: 'High Street, Hull',
      description: 'Fascinating transport museum with historic vehicles and a reconstructed Victorian street.',
      website: 'https://www.hcandl.co.uk/streetlife-museum'
    },
    {
      name: 'Spurn Point',
      category: 'nature',
      type: 'Nature Reserve',
      highlights: ['Unique Peninsula', 'Bird Watching', 'Lighthouse'],
      location: 'Humber Estuary (1 hr from Hull)',
      description: 'Distinctive curved spit of land extending into the Humber Estuary, perfect for wildlife watching.',
      website: 'https://www.ywt.org.uk/nature-reserves/spurn'
    },
    {
      name: 'Hull Maritime Museum',
      category: 'museums',
      type: 'Maritime History',
      highlights: ['Whaling Heritage', 'Ship Models', 'Interactive Exhibits'],
      location: 'Queen Victoria Square, Hull',
      description: 'Explore Hull&apos;s rich maritime heritage including its whaling history and fishing industry.',
      website: 'https://maritimehull.co.uk'
    },
    {
      name: 'East Park',
      category: 'family',
      type: 'Public Park',
      highlights: ['Animal Enclosures', 'Playground', 'Boating Lake'],
      location: 'Holderness Road, Hull',
      description: 'Large Victorian park with animal enclosures, children&apos;s playground, and beautiful gardens.',
      website: 'https://www.hcandl.co.uk/east-park'
    }
  ];

  const filteredRestaurants = activeRestaurantCategory === 'all' 
    ? restaurants 
    : restaurants.filter(r => r.category === activeRestaurantCategory);

  const filteredAttractions = activeAttractionCategory === 'all'
    ? attractions
    : attractions.filter(a => a.category === activeAttractionCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Activities & Experiences
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Welcome to a region where maritime heritage meets modern culture, where historic cobblestone streets lead to world-class dining, and where the Yorkshire countryside offers endless adventures. <strong>Hull and East Yorkshire</strong> provide the perfect blend of <strong>urban sophistication and natural beauty</strong>, making your stay at The Luxury House truly unforgettable.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Restaurants Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Savor the Flavors
              </h2>
              <div className="w-16 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                <strong>Best Restaurants in Hull & East Yorkshire</strong> - From award-winning fine dining to cozy traditional pubs, discover the region&apos;s culinary treasures.
              </p>
            </motion.div>

            {/* Restaurant Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {restaurantCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveRestaurantCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeRestaurantCategory === category.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Restaurant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <strong>{restaurant.name}</strong>
                    </h3>
                    <p className="text-amber-600 font-medium mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {restaurant.description}
                    </p>
                    <div className="mb-3">
                      {restaurant.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mr-2 mb-1 font-medium"
                        >
                          <strong>{feature}</strong>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-sm">
                        <strong>📍 {restaurant.location}</strong>
                      </p>
                      {restaurant.website && (
                        <a
                          href={restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 text-sm font-medium underline transition-colors duration-200"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Attractions Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Explore & Discover
              </h2>
              <div className="w-16 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                <strong>Places to Visit in Hull & East Yorkshire</strong> - From world-class museums to stunning natural landscapes, uncover the region&apos;s hidden gems and must-see destinations.
              </p>
            </motion.div>

            {/* Attraction Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {attractionCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveAttractionCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeAttractionCategory === category.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Attraction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction, index) => (
                <motion.div
                  key={attraction.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <strong>{attraction.name}</strong>
                    </h3>
                    <p className="text-amber-600 font-medium mb-2">{attraction.type}</p>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {attraction.description}
                    </p>
                    <div className="mb-3">
                      {attraction.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-1 font-medium"
                        >
                          <strong>{highlight}</strong>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-sm">
                        <strong>📍 {attraction.location}</strong>
                      </p>
                      {attraction.website && (
                        <a
                          href={attraction.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium underline transition-colors duration-200"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Perfect Yorkshire Adventure Awaits
              </h2>
              <div className="w-16 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                Whether you&apos;re <strong>savoring award-winning cuisine</strong> in Hull&apos;s vibrant restaurant scene, <strong>exploring centuries of maritime heritage</strong>, or <strong>discovering the natural beauty of the Yorkshire Wolds</strong>, this remarkable region offers something special for every traveler. 
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                Make the most of your stay at <strong>The Luxury House</strong> and create unforgettable memories in <strong>Hull & East Yorkshire</strong> - where every corner tells a story and every experience enriches your journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Citation Footer */}
        <section className="py-8 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2 font-medium">Information Sources & Citations</p>
              <p>
                [i] Restaurant and attraction information compiled from official websites, Visit Hull & East Yorkshire, TripAdvisor reviews, and local tourism boards. All details accurate as of 2024 and subject to change. Please verify current opening hours, prices, and availability before visiting.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}