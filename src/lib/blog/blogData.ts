export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  subCategory?: string;
  tags: string[];
  image: string;
  featured?: boolean;
  isPillar?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  subCategories?: string[];
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'hen-party-planning',
    name: 'Hen Party Planning',
    description: 'Complete guides for planning the perfect hen party at The Luxury House',
    color: '#f7a49e',
    subCategories: ['Planning & Logistics', 'Activities & Entertainment', 'Practical Tips', 'Creative Ideas', 'Accommodation']
  },
  {
    id: 'family-celebrations',
    name: 'Family Celebrations',
    description: 'Everything you need for memorable family milestone events',
    color: '#948d71',
    subCategories: ['Milestone Events', 'Planning & Logistics', 'Activities & Experiences', 'Practical Considerations']
  },
  {
    id: 'romantic-getaways',
    name: 'Romantic Getaways',
    description: 'Ideas and inspiration for couples seeking romance and connection',
    color: '#f7c6c2',
    subCategories: ['Special Occasions', 'Activities & Experiences', 'Planning & Ideas', 'Budget & Lifestyle']
  },
  {
    id: 'local-area-guide',
    name: 'Local Area Guide',
    description: 'Discover the best East Yorkshire has to offer for your celebration',
    color: '#d9d7c2',
    subCategories: ['Attractions & Activities', 'Dining & Entertainment', 'Practical Information', 'Hidden Gems & Secrets']
  },
  {
    id: 'property-experience',
    name: 'Property Experience',
    description: 'Make the most of The Luxury House\'s luxury amenities and features',
    color: '#fceeed',
    subCategories: ['Amenities & Features', 'Guest Guidelines', 'Practical Information']
  },
  {
    id: 'guest-stories',
    name: 'Guest Stories',
    description: 'Real stories and experiences from our guests',
    color: '#f7a49e',
    subCategories: ['Success Stories', 'Transformations & Tips']
  }
];

export const blogPosts: BlogPost[] = [
  // PILLAR PAGES
  {
    id: '1',
    title: 'The Ultimate Guide to Hen Party Planning',
    slug: 'ultimate-hen-party-planning-guide',
    excerpt: 'Your complete guide to planning the perfect hen party at The Luxury House. From timeline to activities, we cover everything you need for an unforgettable celebration.',
    content: `
      <p>Hey there, future hen party superstar! Are you buzzing with excitement but also feeling a tiny flutter of nerves about planning your bestie's hen party? You're in the perfect place! Planning a hen party is more than just booking events; it's about celebrating a truly special person in a way that resonates deeply with her!</p>
      
      <p>This isn't just any guide; it's your step-by-step roadmap to a smooth, fun, and absolutely unforgettable celebration that the bride-to-be will cherish forever! We'll walk you through every single detail, ensuring you feel confident and ready to create magic at The Luxury House.</p>

      <h2>The Hen Party Philosophy – Making it Authentically Her!</h2>
      
      <h3>The Golden Rule: The Bride is the Focal Point!</h3>
      <p>This is the non-negotiable, sparkling truth of hen party planning: <strong>this celebration is all about the bride!</strong> Every choice you make, from the big picture to the tiny details, should reflect her personality, her preferences, and what she truly loves.</p>
      
      <p>It's absolutely essential to have an open conversation with her right from the start. This isn't just about what she wants to do, but also her "absolute no-gos." Things like strippers or heavy drinking might be common in some hen parties, but they can make some people really uncomfortable.</p>

      <h3>Embrace Flexibility & Let Go of Perfectionism!</h3>
      <p>Here's a liberating secret: no event, no matter how perfectly planned, goes off without a single hitch! And that's totally okay! Instead of aiming for flawless execution, create a flexible schedule that allows for spontaneous fun and easy adjustments.</p>

      <h3>The Unspoken Rule: The Bride Doesn't Pay!</h3>
      <p>This is a time-honored tradition that adds to the celebratory spirit: the costs of the hen party are typically split among all the guests, with the future bride being the happy exception! It's a beautiful gesture of love and support from her closest friends and family.</p>

      <h2>Stage 1 – Laying the Groundwork (10-12 Months in Advance)</h2>
      
      <h3>Initial Consultation: Talk to the Bride (Crucial First Step)</h3>
      <p>Your very first and most important mission: have a heartfelt chat with the bride-to-be! Here's what to cover:</p>
      <ul>
        <li><strong>Vibe Check:</strong> Does she envision a cozy country retreat with spa treatments, or is she dreaming of a vibrant, high-energy party atmosphere?</li>
        <li><strong>Must-Haves & No-Gos:</strong> What are her non-negotiables? Are there any activities she absolutely loves or wants to avoid?</li>
        <li><strong>Involvement Level:</strong> How much does she want to be involved in the planning? Some brides love every detail, while others prefer to be completely surprised.</li>
      </ul>

      <h3>Crafting the Guest List: Who's in the Tribe?</h3>
      <ul>
        <li><strong>Bride's Input is Key:</strong> Ask the bride to create the definitive guest list, including contact details</li>
        <li><strong>Prioritize (Secretly!):</strong> You can subtly ask her to rank guests by attendance preference for date planning</li>
        <li><strong>Consider 'Sten' Possibilities:</strong> Is the bride open to a combined stag and hen party?</li>
        <li><strong>Dividing the Party:</strong> For diverse guest lists (family, different generations), consider whether one event suits everyone</li>
      </ul>

      <h3>Setting the Financial Foundation: The Budget!</h3>
      <p>Let's talk money – openly and honestly! This is crucial to avoid any awkwardness later on.</p>
      <ul>
        <li><strong>Transparency from the Start:</strong> The number one complaint from hen party guests is often about cost! Be upfront about estimated costs</li>
        <li><strong>Set a Budget, Stick to It:</strong> Once discussed with the group, set a budget and commit to it! The average UK hen party spend in 2023 was over £200 per person</li>
        <li><strong>Payment Plan Power:</strong> Set up payment installments upfront! Tools like PayPal Money Pools are fantastic for transparently collecting funds</li>
      </ul>

      <h3>Why Choose The Luxury House for Your Hen Party?</h3>
      <p>Our luxury holiday home offers everything you need for the perfect hen party celebration:</p>
      <ul>
        <li>Accommodation for up to 15 guests across 5 bedrooms with en-suite showers</li>
        <li>Master bedroom with luxurious bath facilities</li>
        <li>Pool villa with additional accommodation and en-suite</li>
        <li>Private heated swimming pool & outdoor shower</li>
        <li>Full kitchen in both main house and pool villa</li>
        <li>Multiple living rooms and sitting areas for group bonding</li>
        <li>Playroom and games area for entertainment</li>
        <li>Fire pit area for evening gatherings</li>
        <li>Private parking and secluded location</li>
      </ul>

      <h2>Stage 2 – Planning & Booking the Fun (3-6 Months in Advance)</h2>

      <h3>Theme & Type: Defining the Vibe!</h3>
      <p>This is where the hen party truly comes to life! Decide on the overall format and unleash your creativity with a fantastic theme!</p>
      
      <h4>Popular Theme Ideas:</h4>
      <ul>
        <li><strong>"Bride's Last Rodeo"</strong> (think cowboy chic!)</li>
        <li><strong>"Mamma Mia"</strong> (disco balls and ABBA!)</li>
        <li><strong>"Bridgerton"</strong> (regency elegance!)</li>
        <li><strong>"Til Death Do Us Party"</strong> (fun gothic twist!)</li>
        <li><strong>"On Cloud Nine"</strong> (dreamy blues and silvers!)</li>
        <li><strong>"Bridal Era"</strong> (Taylor Swift inspired fun!)</li>
        <li><strong>"Barbie"</strong> (hot pink girl power!)</li>
      </ul>

      <h3>Activities: Curating the Fun!</h3>
      <p>Think about the bride's hobbies and passions! Let her interests lead the way!</p>
      
      <h4>Adventure Seekers:</h4>
      <ul>
        <li>Inland surfing, alpaca walking, axe throwing</li>
        <li>Outdoor assault courses or high ropes</li>
        <li>Pool parties and swimming competitions</li>
      </ul>
      
      <h4>Creative Souls:</h4>
      <ul>
        <li>Flower crown making, garter making</li>
        <li>Bouquet making (wedding prep!)</li>
        <li>Cocktail making workshops</li>
      </ul>
      
      <h4>Foodie Fun:</h4>
      <ul>
        <li>Cookery or baking classes</li>
        <li>Bottomless brunch with themed options</li>
        <li>Wine tasting experiences</li>
      </ul>

      <h4>Unique Experiences:</h4>
      <ul>
        <li>Murder mystery parties</li>
        <li>Professional spa treatments at the house</li>
        <li>Photography sessions by the pool</li>
        <li>Fire pit gatherings with marshmallow roasting</li>
      </ul>

      <h2>Stage 3 – Polishing the Plan (1-2 Months in Advance)</h2>

      <h3>Communication with Guests: Final Checks!</h3>
      <ul>
        <li><strong>Group Chat Power-Up:</strong> Create a vibrant group chat with themed emojis and custom profile picture</li>
        <li><strong>Icebreaker Introductions:</strong> Encourage everyone to introduce themselves with fun facts</li>
        <li><strong>Confirm, Confirm, Confirm:</strong> Final attendance check, dietary restrictions, and special needs</li>
        <li><strong>Dress Code & Gifts:</strong> Decide on dress code and whether to organize joint gifts</li>
      </ul>

      <h3>Confirm All Bookings: Double and Triple Check!</h3>
      <ul>
        <li>Reconfirm every single booking with suppliers and accommodation</li>
        <li>Clarify all details: timings, menus, special requests, payment statuses</li>
        <li>Create a checklist of all services and locations to contact</li>
      </ul>

      <h2>Stage 4 – The Big Event & Beyond (Day-Of and Post-Party)</h2>

      <h3>Pre-Party Logistics & Essentials</h3>
      <ul>
        <li><strong>The Itinerary Reveal:</strong> Draft a structured yet flexible itinerary</li>
        <li><strong>Bedroom Assignments:</strong> Assign designated bedrooms in advance</li>
        <li><strong>The "Hen Do Emergency Kit":</strong> Plasters, painkillers, phone chargers, mints, snacks, tissues, rehydration sachets</li>
        <li><strong>Address Reminders:</strong> Send accommodation address at least two weeks before, then again on the morning</li>
      </ul>

      <h3>Hen Party Games: Icebreakers & Entertainment</h3>
      <p>Games are fantastic for breaking the ice, especially if not all hens know each other!</p>
      <ul>
        <li><strong>Mrs & Mrs Quiz:</strong> Interview the bride's partner beforehand for hilarious answers</li>
        <li><strong>The Present Game:</strong> Hens bring wrapped gifts, bride guesses who it's from</li>
        <li><strong>Prosecco Pong:</strong> Sophisticated twist on beer pong</li>
        <li><strong>Who's Who:</strong> Anonymous facts about hens for the bride to guess</li>
        <li><strong>Wedding Charades:</strong> All movies are wedding-themed</li>
        <li><strong>Hen Party Dares:</strong> Classic fun from a hat or pre-made kit</li>
      </ul>

      <h3>Capture the Memories</h3>
      <ul>
        <li>Designate someone as the "hen do content creator"</li>
        <li>Ensure everyone has charged phones and cameras</li>
        <li>Create a shared photo album for all guests</li>
      </ul>

      <h2>Post-Hen Party Etiquette</h2>
      <ul>
        <li><strong>Express Gratitude:</strong> Send heartfelt thanks to everyone who attended</li>
        <li><strong>Relive the Memories:</strong> Organize a "hen do debrief" to share photos and videos</li>
        <li><strong>Create Keepsakes:</strong> Beautiful photo album or digital slideshow for the bride</li>
      </ul>

      <h2>Conclusion: A Glorious Send-Off!</h2>
      <p>You've done it! By keeping the bride's desires at the heart of your planning, organizing every detail, and embracing the joyful chaos that comes with any fantastic party, you've created something truly magical at The Luxury House!</p>
      
      <p>Remember, the key is to keep the bride at the heart of every decision, start planning early, and never hesitate to rally your incredible team for support! You've totally got this!</p>
    `,
    author: 'Sarah Johnson',
    authorRole: 'Event Planning Specialist',
    date: 'December 20, 2024',
    readTime: '25 min',
    category: 'Hen Party Planning',
    tags: ['hen party', 'planning guide', 'event planning', 'celebrations', 'luxury accommodation'],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=600&fit=crop',
    featured: true,
    isPillar: true
  },
  {
    id: '2',
    title: 'The Complete Guide to Family Celebration Venues',
    slug: 'family-celebration-venue-guide',
    excerpt: 'Discover why The Luxury House is the perfect venue for multi-generational family celebrations, from milestone birthdays to anniversary parties.',
    content: `
      <p>Family celebrations are precious opportunities to bring multiple generations together and create lasting memories. The Luxury House provides the ideal setting for these special occasions.</p>
      
      <h2>Perfect for Multi-Generational Stays</h2>
      <p>Our thoughtfully designed accommodation caters to guests of all ages and mobility levels.</p>
      
      <h3>Accessibility Features</h3>
      <ul>
        <li>Ground floor bedrooms and bathrooms</li>
        <li>Wide doorways and corridors</li>
        <li>Level access to outdoor areas</li>
        <li>Suitable bathroom facilities</li>
      </ul>
      
      <h2>Celebration Types We Excel At</h2>
      
      <h3>Milestone Birthdays</h3>
      <p>Whether it's a 50th, 60th, or 70th birthday, The Luxury House provides the perfect backdrop for celebration.</p>
      
      <h3>Anniversary Celebrations</h3>
      <p>Celebrate decades of love and commitment with family gathered around you.</p>
      
      <h3>Family Reunions</h3>
      <p>Reconnect with relatives from near and far in our spacious, welcoming environment.</p>
    `,
    author: 'Michael Chen',
    authorRole: 'Family Experience Coordinator',
    date: 'December 18, 2024',
    readTime: '12 min',
    category: 'Family Celebrations',
    tags: ['family celebrations', 'milestone birthdays', 'anniversaries', 'family reunions', 'multi-generational'],
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=600&fit=crop',
    featured: true,
    isPillar: true
  },
  {
    id: '3',
    title: 'The Ultimate Romantic Getaway Planning Guide',
    slug: 'romantic-getaway-planning-guide',
    excerpt: 'Create the perfect romantic escape with our comprehensive guide to couples\' getaways at The Luxury House.',
    content: `
      <p>Romance thrives in the right environment, and The Luxury House offers couples the perfect setting for intimate getaways and special celebrations.</p>
      
      <h2>Creating Romance at The Luxury House</h2>
      <p>Our luxury amenities provide countless opportunities for romantic moments.</p>
      
      <h3>Private Pool Romance</h3>
      <p>Enjoy intimate pool sessions under the stars or relaxing daytime swims together.</p>
      
      <h3>Cozy Evening Settings</h3>
      <p>Our fire pit area creates the perfect ambiance for romantic evenings together.</p>
      
      <h2>Special Occasion Planning</h2>
      
      <h3>Proposal Weekends</h3>
      <p>Plan the perfect proposal in our romantic, private setting.</p>
      
      <h3>Anniversary Celebrations</h3>
      <p>Mark your milestones in luxury and privacy.</p>
      
      <h3>Valentine's Getaways</h3>
      <p>Escape the ordinary for an extraordinary Valentine's celebration.</p>
    `,
    author: 'Emma Thompson',
    authorRole: 'Romance & Events Specialist',
    date: 'December 15, 2024',
    readTime: '10 min',
    category: 'Romantic Getaways',
    tags: ['romantic getaways', 'couples retreat', 'proposals', 'anniversaries', 'valentines day'],
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=600&fit=crop',
    featured: true,
    isPillar: true
  },
  {
    id: '4',
    title: 'East Yorkshire Celebration Guide',
    slug: 'east-yorkshire-celebration-guide',
    excerpt: 'Discover the best East Yorkshire has to offer for your celebration, from attractions to dining and hidden local gems.',
    content: `
      <p>East Yorkshire provides the perfect backdrop for celebrations of all kinds, offering a blend of natural beauty, cultural attractions, and excellent amenities.</p>
      
      <h2>Top Attractions Near The Luxury House</h2>
      <p>Enhance your celebration with visits to local attractions and experiences.</p>
      
      <h3>Historic Sites</h3>
      <p>Explore centuries of history at nearby castles, churches, and heritage sites.</p>
      
      <h3>Natural Beauty</h3>
      <p>Discover stunning countryside, coastal walks, and scenic viewpoints perfect for celebration photos.</p>
      
      <h2>Dining Options for Large Groups</h2>
      <p>East Yorkshire offers excellent restaurants that can accommodate celebration groups.</p>
      
      <h3>Fine Dining</h3>
      <p>Special occasion restaurants for milestone celebrations.</p>
      
      <h3>Casual Group Dining</h3>
      <p>Family-friendly options for relaxed group meals.</p>
    `,
    author: 'David Wilson',
    authorRole: 'Local Area Expert',
    date: 'December 12, 2024',
    readTime: '14 min',
    category: 'Local Area Guide',
    tags: ['east yorkshire', 'local attractions', 'dining', 'celebrations', 'tourism'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=600&fit=crop',
    featured: true,
    isPillar: true
  },

  // HEN PARTY POSTS
  {
    id: '5',
    title: 'Hen Party Planning Timeline: 6-Month Guide',
    slug: 'hen-party-planning-timeline',
    excerpt: 'Follow our detailed 6-month timeline to plan the perfect hen party, from initial booking to final celebration details.',
    content: `
      <p>Planning a hen party requires careful timing and organization. Our comprehensive timeline ensures nothing is forgotten.</p>
      
      <h2>6 Months Before</h2>
      <ul>
        <li>Book The Luxury House for your chosen dates</li>
        <li>Create guest list and send save the dates</li>
        <li>Set budget and payment schedule</li>
        <li>Choose party theme and style</li>
      </ul>
      
      <h2>3 Months Before</h2>
      <ul>
        <li>Send formal invitations</li>
        <li>Plan activities and entertainment</li>
        <li>Book external services (catering, entertainment)</li>
        <li>Organize decorations and supplies</li>
      </ul>
      
      <h2>1 Month Before</h2>
      <ul>
        <li>Confirm guest numbers</li>
        <li>Finalize catering arrangements</li>
        <li>Prepare party packs and favors</li>
        <li>Create schedule for the weekend</li>
      </ul>
    `,
    author: 'Sarah Johnson',
    authorRole: 'Event Planning Specialist',
    date: 'December 10, 2024',
    readTime: '8 min',
    category: 'Hen Party Planning',
    subCategory: 'Planning & Logistics',
    tags: ['hen party timeline', 'planning checklist', 'organization', 'event planning'],
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    title: 'Hen Party Budget Calculator & Money-Saving Tips',
    slug: 'hen-party-budget-calculator',
    excerpt: 'Calculate your hen party budget and discover money-saving tips to create an amazing celebration without breaking the bank.',
    content: `
      <p>Creating a memorable hen party doesn't have to drain your bank account. With careful planning and smart choices, you can celebrate in style at The Luxury House.</p>
      
      <h2>Budget Breakdown</h2>
      
      <h3>Accommodation (40-50% of budget)</h3>
      <p>The Luxury House accommodates up to 15 guests, making per-person costs very reasonable when split.</p>
      
      <h3>Food & Catering (25-30%)</h3>
      <ul>
        <li>Self-catering using our fully equipped kitchen</li>
        <li>Local restaurant bookings</li>
        <li>Professional catering services</li>
      </ul>
      
      <h3>Activities & Entertainment (15-20%)</h3>
      <ul>
        <li>On-site activities (pool, games, spa treatments)</li>
        <li>Local experiences and attractions</li>
        <li>Professional entertainment</li>
      </ul>
      
      <h2>Money-Saving Tips</h2>
      <ul>
        <li>Book off-peak dates for better rates</li>
        <li>Self-cater for some meals</li>
        <li>Use The Luxury House's facilities for entertainment</li>
        <li>Split costs evenly among guests</li>
        <li>DIY decorations and party favors</li>
      </ul>
    `,
    author: 'Lisa Rodriguez',
    authorRole: 'Budget Planning Specialist',
    date: 'December 8, 2024',
    readTime: '6 min',
    category: 'Hen Party Planning',
    subCategory: 'Planning & Logistics',
    tags: ['hen party budget', 'money saving', 'cost planning', 'affordable celebrations'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop'
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPillarPages(): BlogPost[] {
  return blogPosts.filter(post => post.isPillar);
}

export function getRecentPosts(limit: number = 6): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}