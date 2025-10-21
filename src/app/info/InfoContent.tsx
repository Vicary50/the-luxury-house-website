'use client';

import { motion } from 'framer-motion';

interface InfoTile {
  id: string;
  title: string;
  description: string;
  category: string;
}

const infoTiles: InfoTile[] = [
  // Kitchen & Dining
  {
    id: 'rangemaster-cooker',
    title: 'Rangemaster Cooker & Fire Safety',
    description: 'Learn how to safely operate the Rangemaster cooker and important fire safety information.',
    category: 'Kitchen & Dining'
  },
  {
    id: 'dishwasher',
    title: 'Dishwasher',
    description: 'Instructions for using the dishwasher including loading tips and cycle options.',
    category: 'Kitchen & Dining'
  },
  {
    id: 'coffee-machine',
    title: 'Coffee Machine',
    description: 'How to operate the coffee machine and create the perfect cup.',
    category: 'Kitchen & Dining'
  },
  // Swimming Pool & Spa
  {
    id: 'pool-opening-closing',
    title: 'Opening & Closing the Swimming Pool',
    description: 'Step-by-step guide for safely opening and closing the swimming pool.',
    category: 'Swimming Pool & Spa'
  },
  {
    id: 'sauna-usage',
    title: 'Using the Sauna',
    description: 'Safety guidelines and instructions for enjoying the sauna facilities.',
    category: 'Swimming Pool & Spa'
  },
  {
    id: 'poolhouse-ac',
    title: 'Using the air conditioner in the poolhouse',
    description: 'How to operate the air conditioning system in the poolhouse area.',
    category: 'Swimming Pool & Spa'
  },
  // Outdoor Areas
  {
    id: 'fire-pit',
    title: 'Using the Fire Pit',
    description: 'Safe operation of the outdoor fire pit including lighting and extinguishing procedures.',
    category: 'Outdoor Areas'
  },
  {
    id: 'bbq-usage',
    title: 'Using the BBQ',
    description: 'Instructions for operating the BBQ safely and cleaning after use.',
    category: 'Outdoor Areas'
  },
  {
    id: 'outdoor-furniture',
    title: 'Outdoor Furniture Care',
    description: 'How to properly care for and protect the outdoor furniture.',
    category: 'Outdoor Areas'
  },
  {
    id: 'gate-operation',
    title: 'Operating the Gates',
    description: 'Instructions for opening and closing the property gates.',
    category: 'Outdoor Areas'
  },
  // General House Systems
  {
    id: 'laundry',
    title: 'Laundry Facilities',
    description: 'How to use the washing machine, dryer, and laundry room facilities.',
    category: 'General House Systems'
  },
  {
    id: 'ev-charging',
    title: 'EV Charging Point',
    description: 'Instructions for using the electric vehicle charging station.',
    category: 'General House Systems'
  },
  // Safety & Emergency
  {
    id: 'first-aid',
    title: 'First Aid Kit Location',
    description: 'Location of first aid kits and emergency contact information.',
    category: 'Safety & Emergency'
  }
];

const categories = [
  'Kitchen & Dining',
  'Swimming Pool & Spa',
  'Outdoor Areas',
  'General House Systems',
  'Safety & Emergency'
];

export default function InfoContent() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Guest Information
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know to make the most of your stay at The Luxury House. 
            Watch our helpful video guides and read important information about the property facilities.
          </p>
        </motion.div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => {
          const categoryTiles = infoTiles.filter(tile => tile.category === category);
          
          return (
            <motion.section
              key={category}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8 border-b border-gray-200 pb-4">
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTiles.map((tile, tileIndex) => (
                  <motion.div
                    key={tile.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: tileIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Video Placeholder */}
                    <div className="aspect-square bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <p className="text-sm">Video Placeholder</p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {tile.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {tile.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}