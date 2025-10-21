import { ImageData, ImageCategory } from '@/types';

// Real images from The Luxury House organized by room categories - updated to match current folder structure
export const havenImages: ImageData[] = [
  // Living area
  {
    id: 'living-2',
    src: '/images/Living%20area/Living%20area%202.jpg',
    alt: 'Comfortable living space with modern furnishings',
    category: 'Living area',
    featured: true,
    title: 'Living Room'
  },
  {
    id: 'living-4',
    src: '/images/Living%20area/Living%20area%204.jpg',
    alt: 'Additional living space with elegant furnishings',
    category: 'Living area',
    title: 'Secondary Living Space'
  },

  // Master bedroom
  {
    id: 'master-1',
    src: '/images/Master%20bedroom/Master%20bedroom%201.jpg',
    alt: 'Elegant master bedroom with luxury bedding',
    category: 'Master bedroom',
    featured: true,
    title: 'Master Bedroom'
  },
  {
    id: 'master-2',
    src: '/images/Master%20bedroom/Master%20bedroom%202.jpg',
    alt: 'Luxurious master bedroom with ensuite',
    category: 'Master bedroom',
    title: 'Master Suite'
  },
  {
    id: 'master-ensuite-2',
    src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%202.jpg',
    alt: 'Spa-like master bathroom',
    category: 'Master bedroom',
    title: 'Ensuite Bathroom'
  },
  {
    id: 'master-ensuite-3',
    src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%203.jpg',
    alt: 'Premium bathroom fixtures',
    category: 'Master bedroom',
    title: 'Luxury Bathroom'
  },
  {
    id: 'master-ensuite-4',
    src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%204.jpg',
    alt: 'Modern ensuite with premium finishes',
    category: 'Master bedroom',
    title: 'Ensuite Details'
  },

  // Kingsize bedroom
  {
    id: 'kingsize-1',
    src: '/images/Kingsize%20bedroom/Kingsize%20bedroom%201.jpg',
    alt: 'Spacious kingsize bedroom with elegant decor',
    category: 'Kingsize bedroom',
    title: 'Kingsize Bedroom'
  },

  // Rear Kingsize bedroom
  {
    id: 'rear-king-1',
    src: '/images/Rear%20Kingsize%20bedroom/Rear%20Kingsize%20bedroom%201.jpg',
    alt: 'Comfortable rear kingsize bedroom',
    category: 'Rear Kingsize bedroom',
    title: 'Garden View Bedroom'
  },
  {
    id: 'rear-king-2',
    src: '/images/Rear%20Kingsize%20bedroom/Rear%20Kingsize%20bedroom%202.jpg',
    alt: 'Rear kingsize bedroom with garden views',
    category: 'Rear Kingsize bedroom',
    title: 'Rear King Bedroom'
  },

  // Double room
  {
    id: 'double-2',
    src: '/images/Double%20room/Double%20room%202.jpg',
    alt: 'Comfortable double room',
    category: 'Double room',
    title: 'Guest Double Room'
  },

  // Bunk bed room
  {
    id: 'bunk-1',
    src: '/images/Bunk%20bed%20room/Bunk%20bed%20room%201.jpg',
    alt: 'Fun bunk bed room perfect for children',
    category: 'Bunk bed room',
    title: 'Bunk Bed Room'
  },
  {
    id: 'bunk-2',
    src: '/images/Bunk%20bed%20room/Bunk%20bed%20room%202.jpg',
    alt: 'Cozy bunk bed room',
    category: 'Bunk bed room',
    title: 'Kids Bunk Room'
  },

  // Children's room
  {
    id: 'children-1',
    src: "/images/Children's%20room/Children's%20room%201.jpg",
    alt: 'Delightful children\'s room with twin beds',
    category: 'Children\'s room',
    title: 'Children\'s Room'
  },
  {
    id: 'children-3',
    src: "/images/Children's%20room/Children's%20room%20%203.jpg",
    alt: 'Colorful children\'s room',
    category: 'Children\'s room',
    title: 'Twin Room'
  },
  {
    id: 'children-ensuite',
    src: "/images/Children's%20room/Children's%20room%20%20en%20suite.jpg",
    alt: 'Children\'s room ensuite bathroom',
    category: 'Children\'s room',
    title: 'Kids Ensuite'
  },

  // Kitchen
  {
    id: 'kitchen-1',
    src: '/images/Kitchen%20%26%20utility/Kitchen%201.jpg',
    alt: 'Fully equipped modern kitchen',
    category: 'Kitchen',
    featured: true,
    title: 'Gourmet Kitchen'
  },
  {
    id: 'kitchen-3',
    src: '/images/Kitchen%20%26%20utility/Kitchen%203.jpg',
    alt: 'Modern kitchen with premium appliances',
    category: 'Kitchen',
    title: 'Chef\'s Kitchen'
  },

  // Dining area
  {
    id: 'dining-1',
    src: '/images/Dining%20area/Dining%20area%201.jpg',
    alt: 'Beautiful dining area perfect for family meals',
    category: 'Dining area',
    featured: true,
    title: 'Dining Area'
  },
  {
    id: 'dining-3',
    src: '/images/Dining%20area/Dining%20area%203.jpg',
    alt: 'Spacious dining room',
    category: 'Dining area',
    title: 'Family Dining'
  },
  {
    id: 'dining-4',
    src: '/images/Dining%20area/Dining%20area%204.jpg',
    alt: 'Modern dining space',
    category: 'Dining area',
    title: 'Contemporary Dining'
  },

  // Sitting room
  {
    id: 'sitting-1',
    src: '/images/Sitting%20room/Sitting%20room%201.jpg',
    alt: 'Elegant sitting room for relaxation',
    category: 'Sitting room',
    title: 'Sitting Room'
  },
  {
    id: 'sitting-2',
    src: '/images/Sitting%20room/Sitting%20room%202.jpg',
    alt: 'Comfortable sitting area with fireplace',
    category: 'Sitting room',
    title: 'Relaxation Area'
  },

  // Playroom
  {
    id: 'playroom-1',
    src: '/images/Playroom%20%3A%20sofabed/Playroom%201.jpg',
    alt: 'Spacious playroom with sofa bed',
    category: 'Playroom',
    title: 'Family Playroom'
  },

  // Swimming pool
  {
    id: 'pool-1',
    src: '/images/Swimming%20pool/Swimming%20pool%201.jpg',
    alt: 'Beautiful private swimming pool',
    category: 'Swimming pool',
    featured: true,
    title: 'Private Pool'
  },
  {
    id: 'pool-6',
    src: '/images/Swimming%20pool/Swimming%20pool%206.jpg',
    alt: 'Evening pool area with ambient lighting',
    category: 'Swimming pool',
    title: 'Evening Pool View'
  },
  {
    id: 'outdoor-shower',
    src: '/images/Swimming%20pool/Outside%20shower.jpg',
    alt: 'Refreshing outdoor shower area',
    category: 'Swimming pool',
    title: 'Outdoor Shower'
  },

  // Firepit
  {
    id: 'firepit-1',
    src: '/images/Firepit/Fire%20pit%201.jpg',
    alt: 'Cozy fire pit area for evening gatherings',
    category: 'Firepit',
    title: 'Fire Pit Area'
  },
  {
    id: 'firepit-4',
    src: '/images/Firepit/Fire%20pit%204.jpg',
    alt: 'Outdoor fire pit gathering area',
    category: 'Firepit',
    title: 'Outdoor Fire Area'
  },

  // Poolside villa
  {
    id: 'poolside-lounge-2',
    src: '/images/Poolside%20villa/Poolside%20villa%20lounge%202.jpg',
    alt: 'Comfortable poolside lounge',
    category: 'Poolside villa',
    title: 'Villa Lounge'
  },
  {
    id: 'poolside-dining-1',
    src: '/images/Poolside%20villa/Poolside%20villa%20dining%20area%201.jpg',
    alt: 'Poolside dining area with stunning views',
    category: 'Poolside villa',
    title: 'Poolside Dining'
  },
  {
    id: 'poolside-outside-dining',
    src: '/images/Poolside%20villa/Poolside%20villa%20outside%20dining%20area.jpg',
    alt: 'Al fresco dining area',
    category: 'Poolside villa',
    title: 'Al Fresco Dining'
  },
  {
    id: 'poolside-kitchen',
    src: '/images/Poolside%20villa/Poolside%20villa%20kitchen.jpg',
    alt: 'Poolside villa kitchen facilities',
    category: 'Poolside villa',
    title: 'Poolside Kitchen'
  },
  {
    id: 'poolside-shower-1',
    src: '/images/Poolside%20villa/Poolside%20villa%20shower%201.jpg',
    alt: 'Poolside villa shower',
    category: 'Poolside villa',
    title: 'Villa Shower'
  }
];

export const getImagesByCategory = (category: ImageCategory): ImageData[] => {
  return havenImages.filter(image => image.category === category);
};

export const getFeaturedImages = (): ImageData[] => {
  return havenImages.filter(image => image.featured);
};

export const getAllImages = (): ImageData[] => {
  return havenImages;
};

export const getHeroImages = (): ImageData[] => {
  return havenImages.filter(image => image.featured).slice(0, 4);
};

// Get all available categories in specified order
export const getAllCategories = (): ImageCategory[] => {
  const categoriesInOrder: ImageCategory[] = [
    'Kitchen',
    'Living area',
    'Dining area',
    'Sitting room',
    'Swimming pool',
    'Poolside villa',
    'Firepit',
    'Master bedroom',
    'Rear Kingsize bedroom',
    'Kingsize bedroom',
    'Double room',
    'Children\'s room',
    'Bunk bed room',
    'Playroom'
  ];
  
  // Get all unique categories from the images
  const availableCategories = [...new Set(havenImages.map(image => image.category))];
  
  // Return categories in the specified order, only including those that exist in the data
  return categoriesInOrder.filter(cat => availableCategories.includes(cat));
};

// Placeholder image generator for fallback
export const getPlaceholderImage = (width: number, height: number, text: string): string => {
  return `https://placehold.co/${width}x${height}/e6d5b8/8b4513?text=${encodeURIComponent(text)}`;
};