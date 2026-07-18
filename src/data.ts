import { Product, RewardItem } from './types';

export const PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'elec-headphones',
    name: 'Apple AirPods Max (Imagine Store Exclusive)',
    category: 'Electronics',
    pointsRequired: 8500,
    priceValue: 59900,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    description: 'Immerse yourself in pure studio-quality acoustic luxury. Features advanced active noise cancellation, custom audio transparency, custom-knit mesh canopy, and seamless pairing across all iOS devices.',
    tags: ['Best Seller', 'Active Noise Cancelling', 'Imagine Premium'],
    features: [
      'Active Noise Cancellation & Transparency Mode',
      'High-Fidelity Audio with Custom Driver',
      'Premium Knit Mesh Canopy & Memory Foam Ear Cushions',
      '20 Hours of Premium High-Res Playback'
    ]
  },
  {
    id: 'elec-watch',
    name: 'Garmin Fenix 7X Sapphire Titanium (Croma)',
    category: 'Electronics',
    pointsRequired: 12000,
    priceValue: 93990,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop',
    description: 'The ultimate rugged multisport GPS watch. Features scratch-resistant sapphire solar charged lens, lightweight titanium bezel, preloaded TopoActive India maps, and up to 37 days of battery life in smartwatch mode.',
    tags: ['Premium Choice', 'Titanium Case', 'Croma Partner'],
    features: [
      'Scratch-Resistant Sapphire Solar Charged Bezel',
      'Preloaded High-Resolution TopoActive India Maps',
      'Advanced Wrist-Based Heart Rate & SpO2 Tracking',
      'Ultra-Reliable Multi-Band GNSS Navigation'
    ]
  },
  {
    id: 'elec-earbuds',
    name: 'Sony WF-1000XM5 Premium ANC Earbuds',
    category: 'Electronics',
    pointsRequired: 6000,
    priceValue: 24990,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
    description: 'Industry-leading noise cancellation with Sony’s proprietary V2 Processor. Offers magnificent high-resolution audio quality, pristine call quality, and custom tailored spatial sound.',
    tags: ['Hi-Res Audio', 'Spatial Sound', 'Best ANC'],
    features: [
      'Dual Feedback Microphones for Supreme ANC',
      'High-Resolution Audio Wireless & LDAC Codec Support',
      'Ergonomic Comfort Fit Design with Foam Tips',
      'Quick Charge (3 min for 60 min Playback)'
    ]
  },
  {
    id: 'elec-keyboard',
    name: 'Keychron Q1 Pro QMK Custom Keyboard',
    category: 'Electronics',
    pointsRequired: 4500,
    priceValue: 18999,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop',
    description: 'Full metal customized layout keyboard with premium hot-swappable tactile switches, double-shot keycaps, and dual macOS/Windows support. Engineered with acoustic dampening foam.',
    tags: ['Hot-Swappable', 'CNC Aluminum Chassis', 'Pro Gear'],
    features: [
      'Full CNC Machined Anodized Aluminum Body',
      'Hot-Swappable Keychron K Pro Mechanical Switches',
      'Gasket Mount Design for Premium Sound Feedback',
      'QMK/VIA Program Support for Customizable Keys'
    ]
  },

  // Travel
  {
    id: 'travel-suitcase',
    name: 'Mokobara Transit Hardshell Cabin Pro Carry-On',
    category: 'Lifestyle',
    pointsRequired: 9500,
    priceValue: 14999,
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=600&auto=format&fit=crop',
    description: 'Designed for the modern premium traveler. Includes an indestructible German polycarbonate shell, a front easy-access padded compartment for laptops, custom silent spinner wheels, and an integrated USB charging port.',
    tags: ['Indestructible', 'Japanese Wheels', 'Easy Front Access'],
    features: [
      '100% Virgin German Polycarbonate Shell',
      'Padded Front Laptop Sleeve (Fits up to 15.6")',
      'Super-Silent Hinomoto Japanese Spinner Wheels',
      'Integrated TSA Lock & Built-in USB Hub'
    ]
  },
  {
    id: 'travel-backpack',
    name: 'Mokobara Overnighter Rugged Travel Backpack',
    category: 'Lifestyle',
    pointsRequired: 3500,
    priceValue: 7499,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    description: 'The perfect companion for single-night business excursions or elite corporate commutes. Water-resistant vegan leather construction with dedicated luggage sleeve and smart organizing grids.',
    tags: ['Waterproof', 'Vegan Leather', 'Smart Organizer'],
    features: [
      'Premium Water-Resistant Vegan Leather Profile',
      'Lay-Flat TSA-Friendly Gadget Compartment',
      'Sleek Luggage Sleeve for Seamless Suitcase Pairing',
      'Concealed RFID Protection Security Pocket'
    ]
  },

  // Fashion
  {
    id: 'fash-sneakers',
    name: 'Saint Frisk Handcrafted Calfskin Loafers',
    category: 'Fashion',
    pointsRequired: 5500,
    priceValue: 9999,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    description: 'Meticulously handcrafted in boutique workshops using Italian calfskin leather. Adapts dynamically to your stance while showcasing premium gold-plated custom metallic buckle accents.',
    tags: ['Italian Leather', 'Bespoke Craft', 'Luxury Comfort'],
    features: [
      '100% Genuine Hand-Picked Italian Calfskin',
      'Breathable Insole Cushioning for Long-Day Strolls',
      'Bespoke Hand-Stitched Classic Silhouette Design',
      'Anti-Slip Structured Vulcanized Soles'
    ]
  },
  {
    id: 'fash-watch',
    name: 'Titan Edge Mechanical Slim Classic Watch',
    category: 'Fashion',
    pointsRequired: 14000,
    priceValue: 69995,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop',
    description: 'The epitome of classic ultra-thin horology. Encased in high-grade surgical stainless steel, featuring sapphire crystal glass, and paired with a genuine hand-burnished crocodile leather strap.',
    tags: ['Ultra-Thin', 'Heirloom Class', 'Made in India'],
    features: [
      'Precision Slim Japanese Mechanical Movement',
      'Genuine Premium Burnished Leather Strap',
      'Double-Dented Scratch-Proof Sapphire Face',
      'Surgical-Grade Stainless Steel Brushed Housing'
    ]
  },
  {
    id: 'fash-sunglasses',
    name: 'Opium Premium Aviator Polarized Sunglasses',
    category: 'Fashion',
    pointsRequired: 4000,
    priceValue: 5999,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    description: 'Command every summer excursion with sheer timeless style. Provides elite polarized contrast protection housed in a featherweight stainless-steel silver-alloy frame with comfortable silicone bridge pads.',
    tags: ['Polarized', '100% UV Protection', 'Aerospace Alloy'],
    features: [
      'Precision Multi-Layer HD Polarized Coatings',
      'Corrosion-Resistant Featherlight Steel Structure',
      'True UVA/UVB Complete Block-Filter',
      'Soft Non-Slip Silicone Bridge Cushions'
    ]
  },

  // Lifestyle
  {
    id: 'life-brewer',
    name: 'Araku Specialty Coffee Roasters Luxury Set',
    category: 'Lifestyle',
    pointsRequired: 6500,
    priceValue: 8500,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    description: 'Bespoke artisanal brewer kit by Araku. Features single-origin shade-grown organic coffee bags, temperature-controlled custom dripper, and hand-painted borosilicate server with fine brass accents.',
    tags: ['Artisanal Coffee', 'Organic Roast', 'Brass Detailing'],
    features: [
      'Artisanal Fine Borosilicate Server Frame',
      'Two Packets of Award-Winning Araku Signature Roast',
      'Precise Direct Extraction Thermal Brewing Column',
      'Solid Hand-Carved Teakwood Guard'
    ]
  },
  {
    id: 'life-lamp',
    name: 'The Purple Turtles Floating Ambient Light',
    category: 'Lifestyle',
    pointsRequired: 5000,
    priceValue: 9999,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
    description: 'Transform your master bedroom into a peaceful sanctuary. Featuring a levitating warm-glow bulb floating magnetically over a solid natural rosewood base, crafted by India’s premium lighting studio.',
    tags: ['Levitating Globe', 'Rosewood Base', 'Purple Turtles design'],
    features: [
      'Frictionless Magnetic Suspension Levitation',
      'Dimmable High-Efficiency Warm Soft Light LED',
      'Solid Hand-Finished Premium Indian Rosewood Base',
      'Touch-Activated Sensor Base Controls'
    ]
  },

  // Gold Member Exclusives (Loyal Customer - Stage 4 Only)
  {
    id: 'gold-resort',
    name: 'The Taj Lake Palace Udaipur (2-Night Luxury Escape)',
    category: 'Travel',
    pointsRequired: 50000,
    priceValue: 180000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop',
    description: 'An elite 2-night all-inclusive grand retreat at the world’s most romantic palace. Features a stay in a luxury lake-view suite, premium vintage car airport transfers, private butler service, and a personalized dining experience by IHCL.',
    tags: ['Infinia Exclusive', 'All-Inclusive Palace Stay', 'Grand Heritage'],
    features: [
      '2-Night Palace Royal Lakeview Suite Accommodation',
      'Bespoke Vintage Car Pick-up & Royal Welcome Rituals',
      'Private 24/7 Royal Butler & Curated Culinary Meals',
      'Complimentary Sunset Jharokha Boat Cruise for Two'
    ],
    isPremium: true
  },
  {
    id: 'gold-lounge',
    name: 'Taj Epicure Club Exclusive Elite Membership',
    category: 'Travel',
    pointsRequired: 22000,
    priceValue: 65000,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=600&auto=format&fit=crop',
    description: 'Lifetime priority access to Taj’s executive club lounges, global wellness spas, complimentary luxury room upgrade certificates, and up to 25% savings on fine-dining dining globally.',
    tags: ['Infinia Exclusive', 'Epicure Privileges', 'Taj Luxury Spa'],
    features: [
      'Complimentary Grand Room Upgrade & Elite Lounge Entry',
      'One Complimentary Room Night Stay Certificate',
      'Premium Spa Access & Private Gym Workouts Globally',
      'Bespoke 25% Off Food & Beverage across Taj, SeleQtions & Vivanta Hotels'
    ],
    isPremium: true
  }
];

export const REWARDS_ITEMS: RewardItem[] = [
  {
    id: 'rew-amazon',
    name: 'Amazon Pay India Instant Gift Voucher (₹5,000)',
    provider: 'Amazon India',
    pointsRequired: 5000,
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=600&auto=format&fit=crop',
    description: 'Add credits directly to your Amazon Pay wallet. Can be used for purchases on Amazon, flight bookings, utility bill payments, and premium food delivery instantly.',
    category: 'voucher'
  },
  {
    id: 'rew-movie',
    name: 'PVR Inox Director’s Cut Luxury Couple Voucher',
    provider: 'PVR Inox',
    pointsRequired: 2500,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    description: 'Experience pure cinema luxury. Valid for two recliner seats at PVR Director’s Cut or PVR Gold, coupled with a curated gourmet chef meal basket and welcome artisanal coolers.',
    category: 'entertainment'
  },
  {
    id: 'rew-lounge',
    name: 'Encalm Privé VIP Lounge Access (Delhi T3 / Mumbai T2)',
    provider: 'Encalm Lounges',
    pointsRequired: 4000,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=600&auto=format&fit=crop',
    description: 'Bypass the transit rush and rest in pure style. Includes premium gourmet chef-led buffet, sleeping nap zones, bar access, business desks, and luxury shower rooms.',
    category: 'travel'
  },
  {
    id: 'rew-travel',
    name: 'Taj Hotels Experience Voucher (₹15,000)',
    provider: 'IHCL Resorts',
    pointsRequired: 15000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop',
    description: 'Redeem directly at Taj, SeleQtions, or Vivanta hotels in India. Applicable for room stays, award-winning spa therapies, or high-end dining experiences.',
    category: 'travel'
  },
  {
    id: 'rew-dining',
    name: 'EazyDiner Prime Luxury Dining Voucher (₹10,000)',
    provider: 'EazyDiner India',
    pointsRequired: 6000,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop',
    description: 'Indulge in India’s finest culinary landscapes. Valid for fully paid premium fine-dining courses and mocktails at top-tier curated partner restaurants.',
    category: 'lifestyle'
  }
];
