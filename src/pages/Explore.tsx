import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, REWARDS_ITEMS } from '../data';
import { Product, Stage, RewardItem } from '../types';
import { 
  Laptop, Plane, Flame, Sparkles, Gift, SlidersHorizontal, Search, Heart, 
  ShieldAlert, Compass, ShieldCheck, ShoppingBag, Bed, Calendar, Users, 
  CheckCircle2, Ticket, ArrowRight, Star, RefreshCw, X, ChevronRight, AlertCircle 
} from 'lucide-react';

// Mock high-fidelity flight inventory matching real travel hubs
const TRAVEL_FLIGHTS = [
  {
    id: 'fl-1',
    airline: 'Vistara',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=300&auto=format&fit=crop',
    from: 'Bengaluru (BLR)',
    to: 'Goa (GOI)',
    departure: '08:15 AM',
    arrival: '09:30 AM',
    duration: '1h 15m',
    class: 'Economy',
    pointsRequired: 3500,
    priceValue: 4500,
    multiplier: '5X Points Accelerator'
  },
  {
    id: 'fl-2',
    airline: 'Air India',
    logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=300&auto=format&fit=crop',
    from: 'Bengaluru (BLR)',
    to: 'Goa (GOI)',
    departure: '02:20 PM',
    arrival: '03:40 PM',
    duration: '1h 20m',
    class: 'Business',
    pointsRequired: 7500,
    priceValue: 12500,
    multiplier: '5X Points Accelerator'
  },
  {
    id: 'fl-3',
    airline: 'Singapore Airlines',
    logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=300&auto=format&fit=crop',
    from: 'Mumbai (BOM)',
    to: 'Dubai (DXB)',
    departure: '04:00 PM',
    arrival: '08:15 PM',
    duration: '3h 45m',
    class: 'Business',
    pointsRequired: 16000,
    priceValue: 45000,
    isPremium: true,
    multiplier: 'Elite Fast-track Booking'
  },
  {
    id: 'fl-4',
    airline: 'British Airways',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=300&auto=format&fit=crop',
    from: 'Delhi (DEL)',
    to: 'London (LHR)',
    departure: '11:30 AM',
    arrival: '06:45 PM',
    duration: '10h 45m',
    class: 'First Class',
    pointsRequired: 35000,
    priceValue: 180000,
    isPremium: true,
    multiplier: 'Centurion Elite'
  },
  {
    id: 'fl-5',
    airline: 'IndiGo',
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=300&auto=format&fit=crop',
    from: 'Delhi (DEL)',
    to: 'Udaipur (UDR)',
    departure: '01:10 PM',
    arrival: '02:25 PM',
    duration: '1h 15m',
    class: 'Economy',
    pointsRequired: 2800,
    priceValue: 3500,
    multiplier: 'Standard Air Fare'
  }
];

// Mock high-fidelity hotel inventory matching real luxury options
const TRAVEL_HOTELS = [
  {
    id: 'ht-1',
    name: 'The Taj Lake Palace',
    city: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=500&auto=format&fit=crop',
    room: 'Grand Royal Lakeview Suite',
    rating: '5.0',
    pointsRequired: 25000,
    priceValue: 85000,
    isPremium: true,
    tag: 'Palace Experience'
  },
  {
    id: 'ht-2',
    name: 'W Goa Resort',
    city: 'Goa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop',
    room: 'Vibrant Ocean Chalet',
    rating: '4.8',
    pointsRequired: 9500,
    priceValue: 24000,
    tag: 'Beach Luxury'
  },
  {
    id: 'ht-3',
    name: 'The Leela Palace',
    city: 'Bengaluru',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop',
    room: 'Royal Club Suite',
    rating: '4.9',
    pointsRequired: 8000,
    priceValue: 18500,
    tag: 'Artisanal Luxury'
  },
  {
    id: 'ht-4',
    name: 'The Taj Mahal Palace',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=500&auto=format&fit=crop',
    room: 'Heritage Tower Room',
    rating: '5.0',
    pointsRequired: 11000,
    priceValue: 32000,
    tag: 'Historic Landmark'
  }
];

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, viewProduct, addToWishlist, removeFromWishlist, isInWishlist, redeemReward, executeMarketplacePurchase } = useApp();

  const selectedCategoryFromURL = searchParams.get('category') || 'All';
  
  // Normalize Category: Electronics, Fashion, Lifestyle from URL map to 'Shopping' internally
  const initialCategory = ['Electronics', 'Fashion', 'Lifestyle', 'Shopping'].includes(selectedCategoryFromURL)
    ? 'Shopping'
    : selectedCategoryFromURL;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  
  // Track sub-categories of Shopping (Electronics, Fashion, Lifestyle, All)
  const [shoppingSubCategory, setShoppingSubCategory] = useState<string>(
    ['Electronics', 'Fashion', 'Lifestyle'].includes(selectedCategoryFromURL) ? selectedCategoryFromURL : 'All'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'points-low' | 'points-high'>('recommended');
  const [isLoading, setIsLoading] = useState(true);

  // Travel booking states
  const [travelTab, setTravelTab] = useState<'flights' | 'hotels'>('flights');
  
  // Flight form search inputs
  const [flightFrom, setFlightFrom] = useState('Bengaluru (BLR)');
  const [flightTo, setFlightTo] = useState('Goa (GOI)');
  const [flightDate, setFlightDate] = useState('2026-07-25');
  const [flightClass, setFlightClass] = useState<'Economy' | 'Business' | 'First Class'>('Economy');
  
  // Hotel form search inputs
  const [hotelDestination, setHotelDestination] = useState('Goa');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-07-28');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-07-31');
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelRoomType, setHotelRoomType] = useState<'Standard' | 'Club Suite' | 'Presidential Suite'>('Standard');

  // Search Results States
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Booking Modal States
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [bookingType, setBookingType] = useState<'flight' | 'hotel' | 'giftcard'>('flight');
  const [bookingSuccessData, setBookingSuccessData] = useState<any | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'points_pay'>('cash');

  // Watch URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    const searchVal = searchParams.get('search');
    
    if (cat) {
      if (['Electronics', 'Fashion', 'Lifestyle'].includes(cat)) {
        setSelectedCategory('Shopping');
        setShoppingSubCategory(cat);
      } else {
        setSelectedCategory(cat);
      }
    }
    if (searchVal) {
      setSearchQuery(searchVal);
    }
  }, [searchParams]);

  // Loading triggers
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedCategory, shoppingSubCategory, sortBy]);

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Shopping', icon: ShoppingBag },
    { name: 'Travel', icon: Plane },
    { name: 'Gift Cards', icon: Gift }
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setHasSearched(false);
    setSearchResults([]);
    
    if (category === 'All') {
      searchParams.delete('category');
      setShoppingSubCategory('All');
    } else if (category === 'Shopping') {
      searchParams.set('category', 'Shopping');
      setShoppingSubCategory('All');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleSubCategorySelect = (sub: string) => {
    setShoppingSubCategory(sub);
    searchParams.set('category', sub);
    setSearchParams(searchParams);
  };

  // Product actions
  const handleProductClick = (product: Product) => {
    viewProduct(product.id);
    navigate(`/product/${product.id}`);
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  // Filter products based on active stage, search, category, and premium access
  const filteredProducts = PRODUCTS.filter((prod) => {
    const isGoldCustomer = state.stage === Stage.LOYAL_CUSTOMER;
    
    // Hide Premium/Gold products from users below Stage 4
    if (prod.isPremium && !isGoldCustomer) {
      return false;
    }

    // Category Filter
    let matchesCategory = true;
    if (selectedCategory === 'Shopping') {
      if (shoppingSubCategory !== 'All') {
        matchesCategory = prod.category === shoppingSubCategory;
      } else {
        matchesCategory = ['Electronics', 'Fashion', 'Lifestyle'].includes(prod.category);
      }
    } else if (selectedCategory === 'All') {
      // In All, show everything
      matchesCategory = ['Electronics', 'Fashion', 'Lifestyle'].includes(prod.category);
    } else {
      matchesCategory = prod.category === selectedCategory;
    }

    // Search query
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'points-low') {
      return a.pointsRequired - b.pointsRequired;
    }
    if (sortBy === 'points-high') {
      return b.pointsRequired - a.pointsRequired;
    }
    
    // Default 'recommended' prioritization
    if (state.stage === Stage.FIRST_PURCHASE) {
      if (a.category === 'Electronics' && b.category !== 'Electronics') return -1;
      if (b.category === 'Electronics' && a.category !== 'Electronics') return 1;
    }
    if (state.stage === Stage.LOYAL_CUSTOMER) {
      if (a.isPremium && !b.isPremium) return -1;
      if (b.isPremium && !a.isPremium) return 1;
    }

    return 0;
  });

  // Travel Hub Search Execution
  const executeTravelSearch = () => {
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      setIsSearching(false);
      const isGoldCustomer = state.stage === Stage.LOYAL_CUSTOMER;

      if (travelTab === 'flights') {
        // Find matching routes or generate matching dynamic flight
        const results = TRAVEL_FLIGHTS.filter(flight => {
          if (flight.isPremium && !isGoldCustomer) return false;
          return true;
        }).map(flight => {
          // Dynamic adaptation: make search match their inputs!
          const matchFrom = flightFrom;
          const matchTo = flightTo;
          let calculatedPoints = flight.pointsRequired;
          
          if (flightClass === 'Business') calculatedPoints = Math.round(calculatedPoints * 1.8);
          if (flightClass === 'First Class') calculatedPoints = Math.round(calculatedPoints * 2.8);

          return {
            ...flight,
            from: matchFrom,
            to: matchTo,
            class: flightClass,
            pointsRequired: calculatedPoints
          };
        });
        setSearchResults(results);
      } else {
        // Hotel search matching
        const results = TRAVEL_HOTELS.filter(hotel => {
          if (hotel.isPremium && !isGoldCustomer) return false;
          // Destination matching
          if (hotel.city.toLowerCase() !== hotelDestination.toLowerCase()) return false;
          return true;
        }).map(hotel => {
          let points = hotel.pointsRequired;
          if (hotelRoomType === 'Club Suite') points = Math.round(points * 1.5);
          if (hotelRoomType === 'Presidential Suite') points = Math.round(points * 2.4);
          
          return {
            ...hotel,
            room: `${hotelRoomType} - ${hotel.room.split(' - ').pop()}`,
            pointsRequired: points
          };
        });

        // If no exact matching city found, provide alternative recommendations
        if (results.length === 0) {
          const defaults = TRAVEL_HOTELS.filter(hotel => {
            if (hotel.isPremium && !isGoldCustomer) return false;
            return true;
          });
          setSearchResults(defaults);
        } else {
          setSearchResults(results);
        }
      }
    }, 600);
  };

  // Open booking modal
  const handleBookingClick = (item: any, type: 'flight' | 'hotel' | 'giftcard') => {
    setBookingType(type);
    setSelectedBooking(item);
    setBookingSuccessData(null);
    setBookingError(null);
    setPaymentMethod('cash');
  };

  // Finalize booking via App Context's executeMarketplacePurchase
  const handleConfirmBooking = () => {
    if (!selectedBooking) return;
    
    setBookingError(null);
    
    // Check points only if points_pay is selected
    let pointsRequired = selectedBooking.pointsRequired || 5000;
    if (bookingType === 'giftcard') {
      const faceValue = selectedBooking.id === 'rew-dining' ? 10000 : selectedBooking.pointsRequired;
      pointsRequired = Math.round((faceValue * 0.70) / 0.25);
    } else if (bookingType === 'flight' || bookingType === 'hotel') {
      pointsRequired = Math.round(selectedBooking.priceValue * 0.70);
    }

    if (paymentMethod === 'points_pay' && state.rewardBalance < pointsRequired) {
      setBookingError(`Insufficient points. You need ${pointsRequired - state.rewardBalance} more points to pay using Points + Pay.`);
      return;
    }

    const success = executeMarketplacePurchase(selectedBooking, bookingType, paymentMethod);
    if (success) {
      const isFlight = bookingType === 'flight';
      const isHotel = bookingType === 'hotel';
      const isGift = bookingType === 'giftcard';

      let bookingId = '';
      let nameText = '';
      let descriptionText = '';
      let providerText = '';
      let imageSource = '';

      if (isFlight) {
        bookingId = `fl-${Date.now().toString().slice(-6)}`;
        nameText = `${selectedBooking.airline} Flight Reservation (${selectedBooking.from} ➔ ${selectedBooking.to})`;
        descriptionText = `Confirmed Air Ticket. Flight Class: ${selectedBooking.class}. Departure Date: ${flightDate}. Flight Time: ${selectedBooking.departure}. Duration: ${selectedBooking.duration}.`;
        providerText = selectedBooking.airline;
        imageSource = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop';
      } else if (isHotel) {
        bookingId = `ht-${Date.now().toString().slice(-6)}`;
        nameText = `Luxury Stay: ${selectedBooking.name} (${selectedBooking.room})`;
        descriptionText = `Luxury Hotel Reservation Confirmed. Room Type: ${selectedBooking.room}. Stay Dates: ${hotelCheckIn} to ${hotelCheckOut}. Guests: ${hotelGuests} Adults.`;
        providerText = selectedBooking.name;
        imageSource = selectedBooking.image;
      } else {
        bookingId = selectedBooking.id;
        nameText = selectedBooking.name;
        descriptionText = selectedBooking.description;
        providerText = selectedBooking.provider;
        imageSource = selectedBooking.image;
      }

      let cashPrice = selectedBooking.priceValue || 5000;
      if (bookingType === 'giftcard') {
        cashPrice = selectedBooking.id === 'rew-dining' ? 10000 : selectedBooking.pointsRequired;
      }

      const pointsSpent = paymentMethod === 'points_pay' ? pointsRequired : 0;
      const cashPaid = paymentMethod === 'points_pay' ? cashPrice * 0.30 : cashPrice;
      const pointsEarned = paymentMethod === 'cash' 
        ? Math.round(cashPrice * (bookingType === 'giftcard' ? 0.05 : 0.10))
        : Math.round((cashPrice * 0.30) * (bookingType === 'giftcard' ? 0.05 : 0.10));

      setTimeout(() => {
        setBookingSuccessData({
          id: bookingId,
          name: nameText,
          description: descriptionText,
          pointsRequired: pointsSpent,
          cashPaid: cashPaid,
          pointsEarned: pointsEarned,
          paymentMethod: paymentMethod,
          image: imageSource,
          category: isGift ? selectedBooking.category : 'travel',
          code: `CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        });
      }, 50);
    } else {
      setBookingError('Transaction processing failed. Please check your points balance.');
    }
  };

  const SkeletonGrid = () => (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#F8F9FC] rounded-3xl border border-gray-100 p-4 flex flex-col justify-between h-[280px] animate-pulse">
          <div>
            <div className="aspect-square rounded-2xl bg-slate-250 mb-3.5" />
            <div className="h-2.5 w-1/3 bg-slate-250 rounded-md mb-2" />
            <div className="h-4 w-5/6 bg-slate-250 rounded-md mb-1" />
            <div className="h-3.5 w-2/3 bg-slate-250 rounded-md" />
          </div>
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
            <div className="space-y-1">
              <div className="h-2 w-8 bg-slate-250 rounded-sm" />
              <div className="h-3.5 w-12 bg-slate-250 rounded-md" />
            </div>
            <div className="space-y-1 flex flex-col items-end">
              <div className="h-2 w-8 bg-slate-250 rounded-sm" />
              <div className="h-3.5 w-14 bg-slate-250 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen bg-brand-bg pb-24 font-sans text-slate-900 select-none relative"
    >
      
      {/* Search Header */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <h1 className="text-xl font-display font-black tracking-tight text-slate-900">Explore Marketplace</h1>
        <p className="text-xs text-slate-400 mt-0.5">Premium Eon rewards, instant flights, & gift cards</p>

        {/* Custom Search bar */}
        <div className="relative mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={
                selectedCategory === 'Travel' 
                  ? "Search destinations, airports..." 
                  : selectedCategory === 'Gift Cards' 
                    ? "Search vouchers, brands..." 
                    : "Search products..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary/40 focus:bg-white transition-all"
            />
          </div>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200/60 px-4 py-2.5 pr-8 rounded-2xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="recommended">Best Fit</option>
              <option value="points-low">Points: Low to High</option>
              <option value="points-high">Points: High to Low</option>
            </select>
            <SlidersHorizontal className="absolute right-3 top-3 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Dynamic Category Chips */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mt-4 pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`flex-none px-4 py-2 rounded-2xl text-xs font-display font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200/50 text-slate-600'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="px-6 py-6">
        
        {/* Stage-based Personalized Marketplace banner */}
        <div className="mb-6 p-4.5 rounded-3xl bg-slate-950 text-white relative overflow-hidden border border-white/10">
          <div className="absolute right-[-10%] top-[-10%] w-20 h-20 bg-[#5B3DF5]/30 rounded-full blur-xl pointer-events-none" />
          {state.stage === 'Stage 1: New User' && (
            <div>
              <div className="flex items-center gap-1 text-[8.5px] text-amber-400 font-mono font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Picks • Stage 1
              </div>
              <h4 className="text-xs font-display font-black mt-1">Trending Newcomer Catalog Active</h4>
              <p className="text-[10px] text-slate-350 mt-1 leading-relaxed">Browse starter products. Each transaction logs immediately, unlocking double points accelerator bonuses.</p>
            </div>
          )}
          {state.stage === 'Stage 2: Browsing' && (
            <div>
              <div className="flex items-center gap-1 text-[8.5px] text-indigo-400 font-mono font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                Point-Optimized Catalog • Stage 2
              </div>
              <h4 className="text-xs font-display font-black mt-1">Products Matching your 2,500 balance</h4>
              <p className="text-[10px] text-slate-350 mt-1 leading-relaxed">We have curated lifestyle products and instant gift vouchers matching your exact 2,500 points balance perfectly.</p>
            </div>
          )}
          {state.stage === 'Stage 3: First Purchase' && (
            <div>
              <div className="flex items-center gap-1.5 text-[8.5px] text-amber-400 font-mono font-black uppercase tracking-wider animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                ML Recommended • Stage 3
              </div>
              <h4 className="text-xs font-display font-black mt-1">Predictive Sound Accessories Unlocked</h4>
              <p className="text-[10px] text-slate-350 mt-1 leading-relaxed">Based on your recent studio purchase history, our ML engine has elevated complementary chargers, mechanical keys, and luxury luggage for high-affinity pairings.</p>
            </div>
          )}
          {state.stage === 'Stage 4: Loyal Customer' && (
            <div>
              <div className="flex items-center gap-1 text-[8.5px] text-amber-300 font-mono font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                Prescriptive Catalog • Stage 4
              </div>
              <h4 className="text-xs font-display font-black mt-1">Centurion Gold Exclusives Fully Visible</h4>
              <p className="text-[10px] text-slate-350 mt-1 leading-relaxed">Welcome Centurion Elite. Luxury chalets, premium business airlines, and high-end hotels are pre-approved and pre-loaded for point redemptions.</p>
            </div>
          )}
        </div>

        {/* LOADING SKELETON */}
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <AnimatePresence mode="wait">
            
            {/* ========================================== */}
            {/* 1. TRAVEL BOOKING HUB */}
            {/* ========================================== */}
            {selectedCategory === 'Travel' && (
              <motion.div
                key="travel-hub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Powered By Header */}
                <div className="flex justify-between items-center bg-emerald-50/70 border border-emerald-100 px-5 py-3 rounded-2xl">
                  <span className="text-[11px] text-emerald-900 font-display font-black uppercase tracking-wider">Travel Booking Directory</span>
                  <span className="text-[9px] text-emerald-600 font-mono font-black uppercase tracking-widest">POWERED BY TRAVELSTACC</span>
                </div>

                {/* Search Form Card */}
                <div className="bg-white rounded-[32px] border border-slate-100 p-5 shadow-xs">
                  {/* Tab Selector: Flights vs Hotels */}
                  <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1">
                    <button
                      onClick={() => { setTravelTab('flights'); setHasSearched(false); }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        travelTab === 'flights' 
                          ? 'bg-primary text-white shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5" />
                      Book Flights
                    </button>
                    <button
                      onClick={() => { setTravelTab('hotels'); setHasSearched(false); }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        travelTab === 'hotels' 
                          ? 'bg-primary text-white shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Bed className="w-3.5 h-3.5" />
                      Book Hotels
                    </button>
                  </div>

                  {/* Flight Form */}
                  {travelTab === 'flights' && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">DEPARTURE</label>
                          <select 
                            value={flightFrom} 
                            onChange={(e) => setFlightFrom(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white"
                          >
                            <option>Bengaluru (BLR)</option>
                            <option>Mumbai (BOM)</option>
                            <option>Delhi (DEL)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">DESTINATION</label>
                          <select 
                            value={flightTo} 
                            onChange={(e) => setFlightTo(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white"
                          >
                            <option>Goa (GOI)</option>
                            <option>Udaipur (UDR)</option>
                            <option>Dubai (DXB)</option>
                            <option>London (LHR)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">DEPARTURE DATE</label>
                          <input 
                            type="date" 
                            value={flightDate}
                            onChange={(e) => setFlightDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">CABIN CLASS</label>
                          <select 
                            value={flightClass} 
                            onChange={(e: any) => setFlightClass(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white"
                          >
                            <option>Economy</option>
                            <option>Business</option>
                            {state.stage === Stage.LOYAL_CUSTOMER && <option>First Class</option>}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={executeTravelSearch}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-2xl text-xs font-display font-black uppercase tracking-wider shadow-sm shadow-primary/20 cursor-pointer flex items-center justify-center gap-1.5 mt-2 transition-all active:scale-[0.98]"
                      >
                        <Plane className="w-4 h-4" />
                        Search Flight Options
                      </button>
                    </div>
                  )}

                  {/* Hotel Form */}
                  {travelTab === 'hotels' && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">CITY / DESTINATION</label>
                        <select 
                          value={hotelDestination} 
                          onChange={(e) => setHotelDestination(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white"
                        >
                          <option value="Goa">Goa (Beach Resorts)</option>
                          <option value="Udaipur">Udaipur (Heritage Palaces)</option>
                          <option value="Bengaluru">Bengaluru (Modern Luxury)</option>
                          <option value="Mumbai">Mumbai (Historic Hotels)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">CHECK-IN</label>
                          <input 
                            type="date" 
                            value={hotelCheckIn}
                            onChange={(e) => setHotelCheckIn(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">CHECK-OUT</label>
                          <input 
                            type="date" 
                            value={hotelCheckOut}
                            onChange={(e) => setHotelCheckOut(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:bg-white" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">GUESTS</label>
                          <select 
                            value={hotelGuests} 
                            onChange={(e) => setHotelGuests(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none"
                          >
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                            <option value={3}>3 Guests</option>
                            <option value={4}>4 Guests</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-slate-400 uppercase">ROOM TIER</label>
                          <select 
                            value={hotelRoomType} 
                            onChange={(e: any) => setHotelRoomType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none"
                          >
                            <option value="Standard">Standard Premium Room</option>
                            <option value="Club Suite">Club Executive Suite</option>
                            {state.stage === Stage.LOYAL_CUSTOMER && <option value="Presidential Suite">Presidential Royal Suite</option>}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={executeTravelSearch}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-2xl text-xs font-display font-black uppercase tracking-wider shadow-sm shadow-primary/20 cursor-pointer flex items-center justify-center gap-1.5 mt-2 transition-all active:scale-[0.98]"
                      >
                        <Bed className="w-4 h-4" />
                        Search Hotel Stays
                      </button>
                    </div>
                  )}
                </div>

                {/* SEARCH RESULTS SECTION */}
                <div>
                  <h3 className="font-display font-black text-sm text-slate-900 tracking-tight mb-4 uppercase">
                    {hasSearched ? 'Available Flight & Stay Offers' : 'Featured Premium Exclusives'}
                  </h3>

                  {isSearching ? (
                    <div className="bg-white rounded-3xl p-10 border border-slate-100 text-center flex flex-col items-center justify-center space-y-3">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-xs font-mono font-bold text-slate-500 animate-pulse">ALGORITHMIC FARE ACCELERATOR ACTIVE...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Standard curated list if no search has been executed */}
                      {!hasSearched ? (
                        <div className="space-y-4">
                          {/* Top curated flight card */}
                          <div className="bg-[#EBF1FF] rounded-[28px] border border-[#BACDFD] p-5 relative overflow-hidden group">
                            <div className="absolute right-[-10px] top-[-10px] bg-[#5B3DF5]/5 w-24 h-24 rounded-full blur-xl" />
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="bg-primary text-white text-[8px] font-mono font-black px-2 py-0.5 rounded-md uppercase tracking-wider">FEATURED FLIGHT</span>
                                <h4 className="font-display font-black text-sm text-slate-900 mt-2">Vistara Premium Economy</h4>
                                <p className="text-[10px] font-mono text-slate-400 mt-0.5">Bengaluru (BLR) to Goa (GOI)</p>
                                <span className="text-[8.5px] font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1.5 inline-block uppercase">
                                  Earn +450 Pts (10X Accelerator!)
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">CASH PRICE</span>
                                <span className="font-display font-black text-slate-900 text-sm">₹4,500/-</span>
                                <span className="text-[8.5px] font-sans font-medium text-slate-500 block mt-1">
                                  or <span className="text-primary font-bold">3,150 pts</span><br />+ ₹1,350
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-200/50">
                              <span className="text-[10px] text-emerald-600 font-sans font-bold flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> High-Yield Multiplier Active
                              </span>
                              <button 
                                onClick={() => handleBookingClick(TRAVEL_FLIGHTS[0], 'flight')}
                                className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-display font-black uppercase tracking-wider transition-all"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>

                          {/* Curated Hotel Card */}
                          <div className="bg-white rounded-[28px] border border-slate-100 p-4.5 shadow-2xs group flex gap-4">
                            <div className="relative h-24 w-24 rounded-2xl overflow-hidden flex-none">
                              <img src={TRAVEL_HOTELS[1].image} alt={TRAVEL_HOTELS[1].name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" referrerPolicy="no-referrer" />
                              <span className="absolute top-1.5 left-1.5 bg-slate-950/80 backdrop-blur-xs text-[8px] font-mono font-black text-white px-2 py-0.5 rounded-md uppercase">4.8 ★</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[8px] text-slate-400 font-mono font-black uppercase tracking-wider">{TRAVEL_HOTELS[1].tag}</span>
                                <h4 className="font-display font-black text-xs text-slate-900 leading-tight mt-0.5">{TRAVEL_HOTELS[1].name}</h4>
                                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 font-medium">{TRAVEL_HOTELS[1].room}</p>
                                <span className="text-[8px] font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block uppercase">
                                  Earn +2,400 Pts (10X Accelerator!)
                                </span>
                              </div>
                              <div className="flex justify-between items-end mt-2 pt-1 border-t border-slate-100">
                                <div>
                                  <span className="text-[8px] text-slate-400 font-mono block uppercase leading-none font-bold">CASH PRICE</span>
                                  <span className="font-display font-black text-slate-900 text-xs mt-1 block">₹24,000/- / night</span>
                                  <span className="text-[9.5px] text-slate-500 block mt-1">
                                    or <span className="text-primary font-bold">16,800 pts</span> + ₹7,200
                                  </span>
                                </div>
                                <button 
                                  onClick={() => handleBookingClick(TRAVEL_HOTELS[1], 'hotel')}
                                  className="text-[9px] font-display font-black uppercase text-primary tracking-wider flex items-center gap-0.5"
                                >
                                  Reserve <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                              <div 
                                key={item.id} 
                                className="bg-white rounded-[28px] border border-slate-100 p-5 shadow-2xs hover:shadow-xs transition-all relative overflow-hidden flex flex-col justify-between"
                              >
                                {item.isPremium && (
                                  <div className="absolute top-0 right-0 bg-amber-400/10 text-amber-500 border-l border-b border-amber-400/20 px-3.5 py-1 text-[8px] font-mono font-black uppercase tracking-wider rounded-bl-xl">
                                    Gold Exclusive
                                  </div>
                                )}
                                
                                <div className="flex justify-between items-start gap-4">
                                  <div className="space-y-1">
                                    {travelTab === 'flights' ? (
                                      <>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-display font-black text-slate-900">{item.airline}</span>
                                          <span className="bg-slate-100 text-slate-600 text-[8px] font-mono font-bold px-2 py-0.5 rounded-md uppercase">{item.class}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2">
                                          <div>
                                            <span className="text-xs font-display font-black text-slate-900 block leading-none">{item.departure}</span>
                                            <span className="text-[8px] font-mono text-slate-400 uppercase font-bold">{item.from.split(' ')[0]}</span>
                                          </div>
                                          <div className="flex flex-col items-center w-12 border-t border-dashed border-slate-200 relative py-1.5">
                                            <span className="text-[7.5px] font-mono text-slate-400 absolute top-[-6px] bg-white px-1.5 font-bold uppercase">{item.duration}</span>
                                            <Plane className="w-2.5 h-2.5 text-slate-400" />
                                          </div>
                                          <div>
                                            <span className="text-xs font-display font-black text-slate-900 block leading-none">{item.arrival}</span>
                                            <span className="text-[8px] font-mono text-slate-400 uppercase font-bold">{item.to.split(' ')[0]}</span>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <div className="flex gap-4">
                                        <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-none">
                                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        </div>
                                        <div>
                                          <h4 className="text-xs font-display font-black text-slate-900">{item.name}</h4>
                                          <span className="text-[8.5px] font-mono text-slate-400 uppercase font-bold">{item.city} • {item.rating} ★ Rating</span>
                                          <p className="text-[9.5px] text-slate-400 font-medium mt-1 leading-tight line-clamp-1">{item.room}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="text-right flex flex-col items-end flex-none">
                                    <span className="text-[8px] text-slate-400 font-mono font-black uppercase tracking-wider block">CASH PRICE</span>
                                    <span className="text-sm font-display font-black text-slate-900 block mt-0.5">₹{item.priceValue.toLocaleString('en-IN')}/-</span>
                                    {travelTab === 'hotels' && <span className="text-[7.5px] text-slate-400 font-mono uppercase font-extrabold block">per night</span>}
                                    <span className="text-[9px] text-slate-500 block mt-1.5 font-medium leading-tight">
                                      or <span className="text-primary font-bold">{Math.round(item.priceValue * 0.70).toLocaleString()} pts</span><br />+ ₹{Math.round(item.priceValue * 0.30).toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-slate-50">
                                  <span className="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-wide flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Earn +{Math.round(item.priceValue * 0.10).toLocaleString()} Pts (10X Accelerator!)
                                  </span>
                                  <button
                                    onClick={() => handleBookingClick(item, travelTab === 'flights' ? 'flight' : 'hotel')}
                                    className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-display font-black uppercase tracking-wider cursor-pointer"
                                  >
                                    Select & Book
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                              <h4 className="text-xs font-display font-black text-slate-900 uppercase">No Exact Search Matches</h4>
                              <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                                No exact inventory matches this custom tier class. Try searching other cities or check-in dates.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* 2. GIFT CARDS CATALOG HUB */}
            {/* ========================================== */}
            {selectedCategory === 'Gift Cards' && (
              <motion.div
                key="giftcards-hub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Powered By Header */}
                <div className="flex justify-between items-center bg-amber-50/70 border border-amber-100 px-5 py-3 rounded-2xl">
                  <span className="text-[11px] text-amber-950 font-display font-black uppercase tracking-wider">Eon Instant Vouchers</span>
                  <span className="text-[9px] text-amber-700 font-mono font-black uppercase tracking-widest">POWERED BY GIFTSTACC</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {REWARDS_ITEMS.filter(item => {
                    if (searchQuery) {
                      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.provider.toLowerCase().includes(searchQuery.toLowerCase());
                    }
                    return true;
                  }).map((voucher) => {
                    const faceValue = voucher.id === 'rew-dining' ? 10000 : voucher.pointsRequired;
                    const ptsPayPoints = Math.round((faceValue * 0.70) / 0.25);
                    const ptsPayCash = Math.round(faceValue * 0.30);
                    const gcEarnPoints = Math.round(faceValue * 0.05);

                    return (
                      <div 
                        key={voucher.id}
                        className="bg-white rounded-[28px] border border-slate-100 p-4.5 shadow-2xs hover:shadow-xs transition-all flex gap-4"
                      >
                        <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-slate-50 flex-none border border-slate-100">
                          <img src={voucher.image} alt={voucher.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[8px] font-mono font-black text-primary uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md leading-none">
                                {voucher.category}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono font-bold leading-none">{voucher.provider}</span>
                            </div>
                            <h4 className="font-display font-black text-xs text-slate-900 mt-1.5 leading-snug line-clamp-1">{voucher.name}</h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[8px] font-mono font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                                Earn +{gcEarnPoints} Pts
                              </span>
                              <span className="text-[8px] font-mono font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-sm">
                                5X Accelerator
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-end mt-2 pt-1.5 border-t border-slate-50">
                            <div>
                              <span className="text-[8px] text-slate-400 font-mono uppercase block leading-none font-bold">CASH PRICE</span>
                              <span className="font-display font-black text-slate-900 text-xs leading-none block mt-1">₹{faceValue.toLocaleString('en-IN')}/-</span>
                              <span className="text-[9px] text-slate-400 block mt-1.5 font-medium leading-none">
                                or <span className="font-extrabold text-primary">{ptsPayPoints.toLocaleString()} pts</span> + ₹{ptsPayCash.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <button
                              onClick={() => handleBookingClick(voucher, 'giftcard')}
                              className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-[9px] font-display font-black uppercase tracking-wider cursor-pointer"
                            >
                              Buy Voucher
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* 3. PHYSICAL SHOPPING / ALL PRODUCT LIST */}
            {/* ========================================== */}
            {['All', 'Shopping'].includes(selectedCategory) && (
              <motion.div
                key="shopping-hub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Powered By Header */}
                <div className="flex justify-between items-center bg-indigo-50/70 border border-indigo-100 px-5 py-3 rounded-2xl">
                  <span className="text-[11px] text-indigo-950 font-display font-black uppercase tracking-wider">Premium Eon Catalog</span>
                  <span className="text-[9px] text-[#5B3DF5] font-mono font-black uppercase tracking-widest">POWERED BY SHOPSTACC</span>
                </div>

                {/* Horizontal Subcategory filter list for Shopping */}
                {selectedCategory === 'Shopping' && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {['All', 'Electronics', 'Fashion', 'Lifestyle'].map((sub) => {
                      const isSelected = shoppingSubCategory === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => handleSubCategorySelect(sub)}
                          className={`flex-none px-3.5 py-1.5 rounded-xl text-[10px] font-display font-black uppercase tracking-wider border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-slate-900 border-slate-900 text-white' 
                              : 'bg-white hover:bg-slate-50 border-slate-200/60 text-slate-600'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Product Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {sortedProducts.map((prod) => {
                      const fav = isInWishlist(prod.id);
                      return (
                        <motion.div
                          layout
                          key={prod.id}
                          initial={{ opacity: 0, scale: 0.93 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.93 }}
                          transition={{ duration: 0.25 }}
                          onClick={() => handleProductClick(prod)}
                          className={`bg-[#F8F9FC] rounded-3xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative ${
                            prod.isPremium ? 'border-amber-400/30 ring-1 ring-amber-400/10' : 'border-gray-100'
                          }`}
                        >
                          <div>
                            {/* Product Image Panel */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-250 mb-3.5">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              
                              {/* Wishlist Button */}
                              <button
                                onClick={(e) => toggleWishlist(e, prod.id)}
                                className={`absolute top-2.5 right-2.5 h-7 w-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                                  fav 
                                    ? 'bg-rose-50 text-rose-500' 
                                    : 'bg-black/40 hover:bg-black/50 text-white'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500' : ''}`} />
                              </button>
        
                              {/* Premium label */}
                              {prod.isPremium && (
                                <div className="absolute bottom-2 left-2 bg-slate-950/90 text-amber-400 text-[8px] font-mono rounded-md px-2 py-0.5 uppercase tracking-wider font-black">
                                  Gold Exclusive
                                </div>
                              )}
                              
                              {!prod.isPremium && (
                                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-black text-emerald-600 border border-emerald-100/50 uppercase tracking-wider">
                                  Earn +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                                </div>
                              )}
                            </div>
        
                            {/* Info Area */}
                            <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-slate-400">{prod.category}</span>
                            <h3 className="text-xs font-display font-black text-slate-900 mt-1 line-clamp-2 min-h-[32px] leading-tight">
                              {prod.name}
                            </h3>
                          </div>
        
                          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                              <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}/-</span>
                            </div>
                            <div className="text-right flex flex-col justify-end">
                              <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                              <span className="text-xs font-display font-black text-emerald-600">
                                +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-white rounded-3xl border border-slate-50">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-wider">No Items Match</h3>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed font-medium">
                      Try adjusting your search query or sub-filters. Note that Gold membership items unlock in Stage 4.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL TRAVEL & GIFT CARD CONFIRMATION SLIDE-UP MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-xs">
            {/* Modal Backdrop Click */}
            <div className="absolute inset-0" onClick={() => setSelectedBooking(null)} />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative bg-white rounded-t-[36px] w-full max-w-md p-6 pb-10 shadow-2xl overflow-hidden border-t border-slate-100 max-h-[92vh] overflow-y-auto no-scrollbar"
            >
              {/* Drag line handle */}
              <div className="mx-auto w-12 h-1 bg-slate-200 rounded-full mb-6" />

              <div className="flex justify-between items-start">
                <h3 className="text-lg font-display font-black uppercase text-slate-900 tracking-tight">
                  {bookingSuccessData ? 'Checkout Complete!' : 'Select Payment Method'}
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 rounded-full bg-slate-100 hover:bg-slate-250 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* SUCCESS VOUCHER STATE */}
              {bookingSuccessData ? (
                <div className="mt-5 space-y-6">
                  {/* Confetti Micro Info */}
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl text-center space-y-1">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="text-xs font-display font-black text-emerald-800 uppercase tracking-wider mt-1.5">Purchase Authorized Successfully</h4>
                    <p className="text-[10px] text-emerald-600 font-sans font-medium leading-relaxed mt-0.5">
                      {bookingSuccessData.paymentMethod === 'points_pay'
                        ? `Redeemed ${bookingSuccessData.pointsRequired.toLocaleString()} Pts. Cash co-pay of ₹${bookingSuccessData.cashPaid.toLocaleString('en-IN')} processed.`
                        : `Charged ₹${bookingSuccessData.cashPaid.toLocaleString('en-IN')} to Credit Card. No points deducted.`}
                    </p>
                  </div>

                  {/* Travel Ticket / Voucher Layout */}
                  <div className="bg-slate-950 text-white rounded-[32px] p-5 border border-white/10 relative overflow-hidden">
                    <div className="absolute right-[-10px] top-[-10px] bg-primary/20 w-24 h-24 rounded-full blur-2xl" />
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div className="flex items-center gap-1.5">
                        <Ticket className="w-4.5 h-4.5 text-amber-400" />
                        <div className="flex flex-col">
                          <span className="font-display font-black text-[10px] tracking-widest uppercase">EON VOUCHER PASS</span>
                          <span className="text-[7.5px] font-mono font-bold tracking-wider text-slate-400">
                            {bookingType === 'giftcard' ? 'POWERED BY GIFTSTACC' : 'POWERED BY TRAVELSTACC'}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">{bookingSuccessData.code}</span>
                    </div>

                    <div className="py-4 space-y-3.5">
                      <h4 className="font-display font-black text-sm text-white leading-tight">{bookingSuccessData.name}</h4>
                      <p className="text-[10px] text-slate-350 leading-relaxed font-sans">{bookingSuccessData.description}</p>
                    </div>

                    <div className="border-t border-dashed border-white/15 pt-3 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] text-slate-500 font-mono block uppercase leading-none font-bold">TRANSACTION SUMMARY</span>
                        <div className="flex items-center gap-2 mt-1">
                          {bookingSuccessData.pointsRequired > 0 && (
                            <span className="font-display font-black text-rose-400 text-xs">-${bookingSuccessData.pointsRequired.toLocaleString()} pts</span>
                          )}
                          <span className="font-display font-black text-white text-xs">Paid: ₹{bookingSuccessData.cashPaid.toLocaleString('en-IN')}</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block mt-1.5">Earned +{bookingSuccessData.pointsEarned.toLocaleString()} Pts back!</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBooking(null);
                          navigate('/wallet');
                        }}
                        className="px-4 py-2 bg-white text-slate-950 rounded-xl text-[9px] font-display font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        Open Apple Wallet <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (() => {
                let modalCashPrice = selectedBooking.priceValue || 5000;
                let modalPointsRequired = selectedBooking.pointsRequired || 5000;

                if (bookingType === 'giftcard') {
                  modalCashPrice = selectedBooking.id === 'rew-dining' ? 10000 : selectedBooking.pointsRequired;
                  modalPointsRequired = Math.round((modalCashPrice * 0.70) / 0.25);
                } else if (bookingType === 'flight' || bookingType === 'hotel') {
                  modalPointsRequired = Math.round(modalCashPrice * 0.70);
                }

                const modalPointsEarnedCash = Math.round(modalCashPrice * (bookingType === 'giftcard' ? 0.05 : 0.10));
                const modalPointsEarnedCoPay = Math.round((modalCashPrice * 0.30) * (bookingType === 'giftcard' ? 0.05 : 0.10));

                const cannotAffordPointsPay = state.rewardBalance < modalPointsRequired;

                return (
                  /* IN-REVIEW STATE */
                  <div className="mt-5 space-y-6">
                    {/* Product Details Panel */}
                    <div className="flex gap-4 bg-slate-50 border border-slate-100 p-4 rounded-3xl">
                      {bookingType !== 'flight' && (
                        <div className="h-16 w-16 rounded-xl overflow-hidden flex-none bg-slate-200">
                          <img src={selectedBooking.image} alt={selectedBooking.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-[8px] font-mono font-black text-primary uppercase bg-indigo-50 px-2 py-0.5 rounded-md leading-none">
                            {bookingType === 'flight' ? 'Vistara / Air India Flight' : bookingType === 'hotel' ? 'Taj / Leela Luxury Stay' : selectedBooking.category}
                          </span>
                          <span className={`text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-md leading-none ${
                            bookingType === 'giftcard' 
                              ? 'text-amber-700 bg-amber-50' 
                              : 'text-emerald-700 bg-emerald-50'
                          }`}>
                            {bookingType === 'giftcard' ? 'POWERED BY GIFTSTACC' : 'POWERED BY TRAVELSTACC'}
                          </span>
                        </div>
                        <h4 className="font-display font-black text-xs text-slate-900 mt-1.5 leading-snug truncate">
                          {bookingType === 'flight' 
                            ? `Flight: ${selectedBooking.from} ➔ ${selectedBooking.to} (${selectedBooking.class})` 
                            : selectedBooking.name}
                        </h4>
                        <p className="text-[9.5px] text-slate-400 font-medium leading-relaxed mt-0.5 truncate">
                          {bookingType === 'flight' ? `Departure Class: ${selectedBooking.class} on ${flightDate}` : selectedBooking.room || selectedBooking.description}
                        </p>
                      </div>
                    </div>

                    {/* INTERACTIVE PAYMENT METHOD SELECTION */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">CHOOSE PAYMENT COMBINATION</span>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {/* Option 1: 100% Cash / Credit Card */}
                        <button
                          onClick={() => setPaymentMethod('cash')}
                          className={`p-4 rounded-3xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                            paymentMethod === 'cash'
                              ? 'border-primary bg-indigo-50/40 ring-1 ring-primary/25'
                              : 'border-slate-100 bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div>
                            <span className="font-display font-black text-xs text-slate-950 block">Standard Pay (100% Cash / Card)</span>
                            <span className="text-[9.5px] text-slate-500 font-medium mt-0.5 block">Charge full cost to credit card & maximize loyalty accruals</span>
                            <span className="text-[9.5px] font-bold text-emerald-600 block mt-1 uppercase tracking-wider font-mono">
                              Earn +{modalPointsEarnedCash.toLocaleString()} Pts (Accelerated!)
                            </span>
                          </div>
                          <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center flex-none ml-2 border-slate-350">
                            {paymentMethod === 'cash' && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                          </div>
                        </button>

                        {/* Option 2: Points + Pay (Hybrid) */}
                        <button
                          onClick={() => {
                            if (!cannotAffordPointsPay) {
                              setPaymentMethod('points_pay');
                            }
                          }}
                          disabled={cannotAffordPointsPay}
                          className={`p-4 rounded-3xl border text-left flex justify-between items-center transition-all relative overflow-hidden ${
                            cannotAffordPointsPay ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-100' : 'cursor-pointer'
                          } ${
                            paymentMethod === 'points_pay' && !cannotAffordPointsPay
                              ? 'border-primary bg-indigo-50/40 ring-1 ring-primary/25'
                              : !cannotAffordPointsPay ? 'border-slate-100 bg-white hover:bg-slate-50/50' : 'border-slate-100'
                          }`}
                        >
                          <div className="pr-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-display font-black text-xs text-slate-950 block">Points + Pay (Hybrid Split)</span>
                              <span className="bg-amber-100 text-amber-700 text-[8px] font-mono font-black px-1.5 py-0.5 rounded-md uppercase">Max 70% Points</span>
                            </div>
                            <span className="text-[9.5px] text-slate-500 font-medium mt-0.5 block">
                              Pay {modalPointsRequired.toLocaleString()} pts + ₹{(modalCashPrice * 0.30).toLocaleString('en-IN')} Cash co-pay
                            </span>
                            <span className="text-[9.5px] font-bold text-emerald-600 block mt-1 uppercase tracking-wider font-mono">
                              Earn +{modalPointsEarnedCoPay.toLocaleString()} Pts on co-pay spend
                            </span>
                          </div>
                          <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center flex-none border-slate-350">
                            {paymentMethod === 'points_pay' && !cannotAffordPointsPay && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Points breakdown */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">TRANSACTION LEDGER</span>
                      
                      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4.5 space-y-3 font-mono text-xs text-slate-600 font-bold">
                        <div className="flex justify-between">
                          <span>Payment Mode</span>
                          <span className="text-slate-900 font-black uppercase tracking-wider text-[10px]">
                            {paymentMethod === 'cash' ? 'Credit Card (Full)' : 'Points + Pay (Hybrid)'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Card Spend Charge</span>
                          <span className="text-slate-800 font-black">
                            ₹{(paymentMethod === 'cash' ? modalCashPrice : modalCashPrice * 0.30).toLocaleString('en-IN')}
                          </span>
                        </div>
                        {paymentMethod === 'points_pay' && (
                          <div className="flex justify-between">
                            <span>Points Redeemed</span>
                            <span className="text-primary">-{modalPointsRequired.toLocaleString()} pts</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Points To Earn</span>
                          <span className="text-emerald-600">
                            +{paymentMethod === 'cash' ? modalPointsEarnedCash.toLocaleString() : modalPointsEarnedCoPay.toLocaleString()} pts
                          </span>
                        </div>
                        <div className="border-t border-slate-200/50 pt-2.5 flex justify-between font-black text-slate-900">
                          <span>Remaining Points Balance</span>
                          <span className={state.rewardBalance >= (paymentMethod === 'points_pay' ? modalPointsRequired : 0) ? 'text-slate-900' : 'text-red-500'}>
                            {(state.rewardBalance - (paymentMethod === 'points_pay' ? modalPointsRequired : 0) + (paymentMethod === 'cash' ? modalPointsEarnedCash : modalPointsEarnedCoPay)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>

                      {/* Booking errors */}
                      {paymentMethod === 'points_pay' && cannotAffordPointsPay && (
                        <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex gap-2.5 items-start text-amber-700">
                          <AlertCircle className="w-4 h-4 flex-none mt-0.5" />
                          <div className="text-[10px] font-medium leading-relaxed">
                            <p className="font-bold">Insufficient Points</p>
                            <p className="text-amber-600">You need {modalPointsRequired - state.rewardBalance} more points to use Points + Pay. Standard payment mode has been auto-recommended.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Action Buttons */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={handleConfirmBooking}
                        disabled={paymentMethod === 'points_pay' && cannotAffordPointsPay}
                        className="w-full py-3 rounded-2xl text-xs font-display font-black uppercase tracking-wider text-white bg-primary hover:bg-primary-dark transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {paymentMethod === 'points_pay' ? 'Authorize Points + Pay' : 'Pay via Credit Card'}
                      </button>
                      <button
                        onClick={() => setSelectedBooking(null)}
                        className="w-full py-3 rounded-2xl text-xs font-display font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-all cursor-pointer text-center"
                      >
                        Cancel Checkout
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
