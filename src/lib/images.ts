import { ImageData, ImageCategory } from '@/types';

// Real images from The Luxury House organized by room categories - updated to match current folder structure
export const havenImages: ImageData[] = [
  // Living area
  {
    id: 'living-2',
    src: '/images/Living%20area/Living%20area%202.jpg',
    alt: 'Living area with a grey corner sofa, a wood-burning stove against a dark feature wall, and the kitchen beyond',
    category: 'Living area',
    featured: true,
    title: 'Living Room'
  },
  {
    id: 'living-4',
    src: '/images/Living%20area/Living%20area%204.jpg',
    alt: 'Grey corner sofa facing the open-plan kitchen, with pendant lights over the counter',
    category: 'Living area',
    title: 'Secondary Living Space'
  },

  // Master bedroom
  {
    id: 'master-1',
    src: '/images/Master%20bedroom/Master%20bedroom%201.jpg',
    alt: 'Master bedroom with a grey buttoned bed, a cream throw and a window onto the garden',
    category: 'Master bedroom',
    featured: true,
    title: 'Master Bedroom'
  },
  {
    id: 'master-2',
    src: '/images/Master%20bedroom/Master%20bedroom%202.jpg',
    alt: 'Master bedroom with a tall silver mirror and the door open to the en suite',
    category: 'Master bedroom',
    title: 'Master Suite'
  },
  {
    id: 'master-ensuite-2',
    src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%202.jpg',
    alt: 'Walk-in shower in the master en suite, with brown marble-effect tiles',
    category: 'Master bedroom',
    title: 'Ensuite Bathroom'
  },
  {
    id: 'master-ensuite-3',
    src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%203.jpg',
    alt: 'Master en suite with a freestanding bath and twin basins under a wide mirror',
    category: 'Master bedroom',
    title: 'Luxury Bathroom'
  },
  {
    id: 'master-ensuite-4',
    src: '/images/Master%20bedroom/Master%20bedroom%20ensuite%204.jpg',
    alt: 'Freestanding bath in the master en suite, with a waterfall tap below the window',
    category: 'Master bedroom',
    title: 'Ensuite Details'
  },

  // Kingsize bedroom
  {
    id: 'kingsize-1',
    src: '/images/Kingsize%20bedroom/Kingsize%20bedroom%201.jpg',
    alt: 'King-size bedroom with a white wooden bed, grey walls and a window onto trees',
    category: 'Kingsize bedroom',
    title: 'Kingsize Bedroom'
  },

  // Rear Kingsize bedroom
  {
    id: 'rear-king-1',
    src: '/images/Rear%20Kingsize%20bedroom/Rear%20Kingsize%20bedroom%201.jpg',
    alt: 'Rear king-size bedroom with tree-pattern wallpaper and a window onto the garden',
    category: 'Rear Kingsize bedroom',
    title: 'Garden View Bedroom'
  },
  {
    id: 'rear-king-2',
    src: '/images/Rear%20Kingsize%20bedroom/Rear%20Kingsize%20bedroom%202.jpg',
    alt: 'Rear king-size bedroom with a white wardrobe, folded towels on the chest of drawers and a dressing gown on the door',
    category: 'Rear Kingsize bedroom',
    title: 'Rear King Bedroom'
  },

  // Double room
  {
    id: 'double-2',
    src: '/images/Double%20room/Double%20room%202.jpg',
    alt: 'Double room with a cream buttoned headboard, script-pattern wallpaper and a brass side table',
    category: 'Double room',
    title: 'Guest Double Room'
  },

  // Bunk bed room
  {
    id: 'bunk-1',
    src: '/images/Bunk%20bed%20room/Bunk%20bed%20room%201.jpg',
    alt: 'Bunk room with white bunk beds, a chest of drawers with heart handles and a window onto trees',
    category: 'Bunk bed room',
    title: 'Bunk Bed Room'
  },
  {
    id: 'bunk-2',
    src: '/images/Bunk%20bed%20room/Bunk%20bed%20room%202.jpg',
    alt: 'Bunk room with a white wardrobe and a chest of drawers with heart handles',
    category: 'Bunk bed room',
    title: 'Kids Bunk Room'
  },

  // Children's room
  {
    id: 'children-1',
    src: "/images/Children's%20room/Children's%20room%201.jpg",
    alt: "Children's room with a single bed, star-pattern wallpaper and a star rug",
    category: 'Children\'s room',
    title: 'Children\'s Room'
  },
  {
    id: 'children-3',
    src: "/images/Children's%20room/Children's%20room%20%203.jpg",
    alt: "Single bed in the children's room, beneath star-pattern wallpaper and a wall clock",
    category: 'Children\'s room',
    title: 'Twin Room'
  },
  {
    id: 'children-ensuite',
    src: "/images/Children's%20room/Children's%20room%20%20en%20suite.jpg",
    alt: "Children's room en suite with a black glass basin and a shower cubicle",
    category: 'Children\'s room',
    title: 'Kids Ensuite'
  },

  // Kitchen
  {
    id: 'kitchen-1',
    src: '/images/Kitchen%20%26%20utility/Kitchen%201.jpg',
    alt: 'Kitchen with cream units, a wooden island, a range cooker and pendant lights',
    category: 'Kitchen',
    featured: true,
    title: 'Gourmet Kitchen'
  },
  {
    id: 'kitchen-3',
    src: '/images/Kitchen%20%26%20utility/Kitchen%203.jpg',
    alt: 'Kitchen units with a wine fridge, and the dining area and garden doors beyond',
    category: 'Kitchen',
    title: 'Chef\'s Kitchen'
  },

  // Dining area
  {
    id: 'dining-1',
    src: '/images/Dining%20area/Dining%20area%201.jpg',
    alt: 'Dining room with a long dark table, cream chairs and white orchids, looking out to the garden',
    category: 'Dining area',
    featured: true,
    title: 'Dining Area'
  },
  {
    id: 'dining-3',
    src: '/images/Dining%20area/Dining%20area%203.jpg',
    alt: 'Dining table laid for dinner, seen from above, with the garden through the window',
    category: 'Dining area',
    title: 'Family Dining'
  },
  {
    id: 'dining-4',
    src: '/images/Dining%20area/Dining%20area%204.jpg',
    alt: 'Dining area under a high vaulted ceiling, with a glass chandelier and tall windows',
    category: 'Dining area',
    title: 'Contemporary Dining'
  },

  // Sitting room
  {
    id: 'sitting-1',
    src: '/images/Sitting%20room/Sitting%20room%201.jpg',
    alt: 'Sitting room with a wood-burning stove, a sunburst mirror and panelled grey wallpaper, lit by lamps',
    category: 'Sitting room',
    title: 'Sitting Room'
  },
  {
    id: 'sitting-2',
    src: '/images/Sitting%20room/Sitting%20room%202.jpg',
    alt: 'Sitting room with a cream sofa, a log basket by the stove and glazed oak doors',
    category: 'Sitting room',
    title: 'Relaxation Area'
  },

  // Playroom
  {
    id: 'playroom-1',
    src: '/images/Playroom%20%3A%20sofabed/Playroom%201.jpg',
    alt: 'Playroom with a television, a teddy bear, shelves of board games and a doll’s house',
    category: 'Playroom',
    title: 'Family Playroom'
  },

  // Swimming pool
  {
    id: 'pool-1',
    src: '/images/Swimming%20pool/Swimming%20pool%201.jpg',
    alt: 'The heated pool with its roller cover, the paved terrace and the back of the house',
    category: 'Swimming pool',
    featured: true,
    title: 'Private Pool'
  },
  {
    id: 'pool-6',
    src: '/images/Swimming%20pool/Swimming%20pool%206.jpg',
    alt: 'The pool, an outdoor sofa and the lawn, with the poolside villa at the far end',
    category: 'Swimming pool',
    title: 'Evening Pool View'
  },
  {
    id: 'outdoor-shower',
    src: '/images/Swimming%20pool/Outside%20shower.jpg',
    alt: 'Outdoor shower with black marble-effect tiles and a rainfall head, behind wooden slats',
    category: 'Swimming pool',
    title: 'Outdoor Shower'
  },

  // Firepit
  {
    id: 'firepit-1',
    src: '/images/Firepit/Fire%20pit%201.jpg',
    alt: 'Firepit terrace with two fire tables and built-in benches with patterned cushions, backed by a hedge',
    category: 'Firepit',
    title: 'Fire Pit Area'
  },
  {
    id: 'firepit-4',
    src: '/images/Firepit/Fire%20pit%204.jpg',
    alt: 'A fire table burning on the terrace, with the barbecue and the back of the house behind',
    category: 'Firepit',
    title: 'Outdoor Fire Area'
  },

  // Poolside villa
  {
    id: 'poolside-lounge-2',
    src: '/images/Poolside%20villa/Poolside%20villa%20lounge%202.jpg',
    alt: 'Poolside villa lounge with a cream sofa, a wall-mounted television and glass doors to the garden',
    category: 'Poolside villa',
    title: 'Villa Lounge'
  },
  {
    id: 'poolside-dining-1',
    src: '/images/Poolside%20villa/Poolside%20villa%20dining%20area%201.jpg',
    alt: 'Round dining table in the poolside villa, with the sofa and glass doors behind',
    category: 'Poolside villa',
    title: 'Poolside Dining'
  },
  {
    id: 'poolside-outside-dining',
    src: '/images/Poolside%20villa/Poolside%20villa%20outside%20dining%20area.jpg',
    alt: 'View from the poolside villa’s covered terrace across the pool to the back of the house',
    category: 'Poolside villa',
    title: 'Al Fresco Dining'
  },
  {
    id: 'poolside-kitchen',
    src: '/images/Poolside%20villa/Poolside%20villa%20kitchen.jpg',
    alt: 'Poolside villa kitchen with white units, an oven and a hob',
    category: 'Poolside villa',
    title: 'Poolside Kitchen'
  },
  {
    id: 'poolside-shower-1',
    src: '/images/Poolside%20villa/Poolside%20villa%20shower%201.jpg',
    alt: 'Poolside villa shower room with a black-framed glass screen and a round mirror',
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
  return `https://placehold.co/${width}x${height}/efebe4/5e5b54?text=${encodeURIComponent(text)}`;
};