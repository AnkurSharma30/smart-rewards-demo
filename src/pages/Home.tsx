import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Stage } from '../types';
import { PRODUCTS, REWARDS_ITEMS } from '../data';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { 
  Sparkles, Gift, Flame, MapPin, Compass, Laptop, Plane, Landmark, 
  CheckCircle2, ArrowRight, Star, Headphones, MessageSquare, Send, X, 
  Bell, Search, Percent, Clock, ArrowRightLeft, Calendar, Heart
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { state, setStage } = useApp();
  
  // Destructure state
  const { stage, rewardBalance, tier, recentlyViewed, wishlist, purchaseHistory, redeemedHistory } = state;

  const [isLoading, setIsLoading] = useState(true);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeMsg, setConciergeMsg] = useState('');
  const [conciergeSent, setConciergeSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [stage]);

  // Product filters
  const electronicsProducts = PRODUCTS.filter(p => p.category === 'Electronics');
  const travelProducts = PRODUCTS.filter(p => p.category === 'Travel');
  const fashionProducts = PRODUCTS.filter(p => p.category === 'Fashion');
  const lifestyleProducts = PRODUCTS.filter(p => p.category === 'Lifestyle');
  const giftCards = REWARDS_ITEMS;

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/explore?category=${categoryName}`);
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // State-specific Search Configs
  const getSearchPlaceholder = () => {
    switch(stage) {
      case Stage.NEW_USER:
        return 'Search rewards, luxury flights, gift cards...';
      case Stage.BROWSING:
        return 'Find premium wireless ANC headphones and gear...';
      case Stage.FIRST_PURCHASE:
        return 'Search for matching accessories, chargers, tags...';
      case Stage.LOYAL_CUSTOMER:
        return 'Search exclusive Gold member perks & chalet rates...';
      default:
        return 'Search products, travel, vouchers...';
    }
  };

  const getSearchSuggestions = () => {
    switch(stage) {
      case Stage.NEW_USER:
        return ['Amazon', 'Headphones', 'Flights', 'Vouchers'];
      case Stage.BROWSING:
        return ['ANC Earbuds', 'Titanwatch', 'Mechanical Keycap'];
      case Stage.FIRST_PURCHASE:
        return ['Horizon Keyboard', 'Travel Suitcase', 'Uber Gift Card'];
      case Stage.LOYAL_CUSTOMER:
        return ['Chalet Resort', 'Global VIP Lounge', 'Amazon Gold'];
      default:
        return ['Amazon', 'Headphones', 'Flights'];
    }
  };

  // State-specific Hero Banners
  const renderHeroBanner = () => {
    switch(stage) {
      case Stage.NEW_USER:
        return null;
      case Stage.BROWSING:
        return (
          <div className="relative h-48 rounded-[32px] overflow-hidden bg-gradient-to-tr from-slate-950 via-[#5B3DF5] to-slate-900 border border-white/10 shadow-lg text-white">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop" 
              alt="Curated luxury gear" 
              className="absolute inset-0 w-full h-full object-cover opacity-35 hover:scale-101 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-20 p-6 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <span className="text-[9px] bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">
                  MEMBER BENEFIT
                </span>
                <h2 className="text-xl font-display font-black tracking-tight leading-tight max-w-[200px] mt-1">
                  Infinia Rewards Club
                </h2>
                <p className="text-[10px] text-slate-350 font-medium max-w-[220px]">
                  Accumulate value automatically. Unlock travel lounge entry and high-end tech.
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[9px] text-slate-400 font-mono tracking-widest font-black uppercase">INFINIA PORTAL V1.0</span>
                <button onClick={() => navigate('/rewards')} className="text-xs font-display font-black text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        );
      case Stage.FIRST_PURCHASE:
        return (
          <div className="relative h-48 rounded-[32px] overflow-hidden bg-gradient-to-tr from-[#5B3DF5] to-[#7C5DFF] border border-white/10 shadow-lg text-white">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" 
              alt="Luxury sound gear" 
              className="absolute inset-0 w-full h-full object-cover opacity-25 hover:scale-101 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-20 p-6 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] bg-white/20 backdrop-blur-md text-amber-200 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">
                    EARNING BOOST
                  </span>
                  <span className="text-[9px] text-amber-300 font-mono font-bold uppercase animate-pulse">ACTIVE</span>
                </div>
                <h2 className="text-xl font-display font-black tracking-tight leading-tight max-w-[220px] mt-1">
                  Enhance Your Studio Experience
                </h2>
                <p className="text-[10px] text-slate-200 font-medium max-w-[240px]">
                  Your recent earbud selection unlocks specialized premium accessories with 2x points multiplier.
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[9px] text-white/70 font-mono tracking-widest uppercase font-bold">LIMITED BOOSTER</span>
                <button onClick={() => navigate('/explore?category=Electronics')} className="text-xs font-display font-black text-white flex items-center gap-1 uppercase tracking-wider">
                  <span>See Gear</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        );
      case Stage.LOYAL_CUSTOMER:
        return (
          <div className="relative h-48 rounded-[32px] overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 border border-amber-400/25 shadow-2xl text-white">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop" 
              alt="Luxury Chalet" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 hover:scale-101 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-20 p-6 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-[9px] bg-amber-400/20 text-amber-400 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">
                    GOLD MEMBER EXCLUSIVES
                  </span>
                </div>
                <h2 className="text-xl font-display font-black tracking-tight leading-tight text-white mt-1.5">
                  Centurion Gold Suite Active
                </h2>
                <p className="text-[10px] text-slate-350 font-medium max-w-[240px]">
                  Enjoy hand-curated VIP helicopter transfers, overwater villa stays, and bespoke lounge lounges.
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[9px] text-amber-400 font-mono tracking-widest uppercase font-bold">BESPOKE DISPATCH ACTIVE</span>
                <button onClick={() => setIsConciergeOpen(true)} className="text-xs font-display font-black text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                  <span>Call Concierge</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const HomeSkeleton = () => (
    <div className="space-y-8 px-6 py-4 animate-pulse">
      <div className="h-40 bg-slate-200/60 rounded-[32px]" />
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-200/60 rounded-3xl" />
        ))}
      </div>
      <div>
        <div className="h-5 w-1/3 bg-slate-200 rounded-md mb-4" />
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {[1, 2].map((i) => (
            <div key={i} className="flex-none w-[220px] h-[190px] bg-slate-200/60 rounded-[28px]" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen bg-[#F8F9FC] pb-24 font-sans text-slate-900 select-none overflow-x-hidden relative"
    >
      
      {/* 1. TOP PREMIUM HEADER */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div>
          <span className="text-[10px] text-slate-450 font-mono tracking-wider font-extrabold block uppercase">
            {tier === 'Gold Member' ? 'GOLD ELITE MEMBER' : 'INFINIA MEMBERSHIP'}
          </span>
          <h1 className="text-xl font-display font-black tracking-tight text-slate-900 flex items-center gap-1.5 mt-0.5">
            SmartRewards
            {tier === 'Gold Member' && (
              <span className="text-[9px] bg-amber-400/20 text-amber-700 px-2.5 py-0.5 rounded-full font-black tracking-wide">
                GOLD
              </span>
            )}
          </h1>
          <span className="text-[10px] text-[#5B3DF5] font-bold block mt-0.5">
            Welcome back, Mohit Sharma
          </span>
        </div>

        {/* Live Notification Bell & Tier Icon */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 relative cursor-pointer hover:bg-slate-100 transition-colors">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#5B3DF5]" />
          </div>
          <div onClick={() => navigate('/profile')} className="cursor-pointer">
            {tier === 'Gold Member' ? (
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-950 via-amber-500 to-slate-900 flex items-center justify-center text-amber-300 shadow-sm border border-amber-400/20">
                <Star className="w-4.5 h-4.5 fill-amber-300 text-amber-300" />
              </div>
            ) : (
              <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200/50 flex items-center justify-center text-slate-500">
                <Compass className="w-4.5 h-4.5 text-slate-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. REWARD BALANCE CARD (NAVIGATES TO APPLE WALLET WALLET SCREEN) */}
      <div className="px-6 py-6">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          onClick={() => navigate('/wallet')}
          className={`relative overflow-hidden rounded-[32px] p-6 shadow-xl cursor-pointer ${
            tier === 'Gold Member'
              ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
              : 'bg-[#5B3DF5] text-white shadow-2xl shadow-[#5B3DF533]'
          }`}
        >
          {/* Subtle light overlay inside card */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div>
              <span className={`text-[10px] font-mono tracking-widest uppercase ${tier === 'Gold Member' ? 'text-slate-400' : 'text-white/70'}`}>
                REWARD BALANCE • POWERED BY REWARDSTACC
              </span>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className={`text-5xl font-display font-black tracking-tight ${tier === 'Gold Member' ? 'text-amber-400' : 'text-white'}`}>
                  <AnimatedCounter value={rewardBalance} />
                </span>
                <span className={`text-xs font-bold ${tier === 'Gold Member' ? 'text-slate-400' : 'text-white/80'}`}>
                  Points
                </span>
              </div>
            </div>
            
            {/* Tier Badge */}
            <div className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 ${
              tier === 'Gold Member' 
                ? 'bg-amber-400/10 border border-amber-400/20 text-amber-400' 
                : 'bg-white/15 border border-white/20 text-white'
            }`}>
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span className="text-[10px] font-mono font-black tracking-wider uppercase">
                {tier}
              </span>
            </div>
          </div>

          <div className={`w-full h-[1px] my-5 ${tier === 'Gold Member' ? 'bg-slate-800/80' : 'bg-white/15'}`} />

          <div className="flex justify-between items-center text-xs font-bold">
            <span className={`${tier === 'Gold Member' ? 'text-slate-400' : 'text-white/80'}`}>
              {tier === 'Gold Member' ? 'Tap for Digital Pass & History Log' : 'Tap to open Points Wallet'}
            </span>
            <div className="flex items-center gap-1">
              <span className={tier === 'Gold Member' ? 'text-amber-400' : 'text-white'}>Open Wallet</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. ADAPTIVE SEARCH BAR & SUGGESTIONS */}
      <div className="relative px-6 pb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            placeholder={getSearchPlaceholder()}
            className="w-full pl-11 pr-5 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-medium placeholder-slate-400 text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-xs"
          />
          <Search className="absolute left-4 top-4.5 w-4.5 h-4.5 text-slate-400" />
        </div>
        
        {/* Dynamic Suggestions Row */}
        <div className="flex gap-2 items-center overflow-x-auto no-scrollbar mt-3">
          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider flex-none">SUGGESTED:</span>
          {getSearchSuggestions().map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setSearchQuery(suggestion);
                navigate(`/explore?search=${encodeURIComponent(suggestion)}`);
              }}
              className="flex-none px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* 4. LARGE HERO BANNER */}
      {renderHeroBanner() && (
        <div className="px-6 mb-6">
          {renderHeroBanner()}
        </div>
      )}

      {/* 5. THREE CORE COMMERCE CTAs - PRIMARY DESTINATIONS */}
      <div className="px-6 mb-8 space-y-3">
        <span className="text-[9px] font-mono font-bold tracking-widest text-slate-450 uppercase block">COMMERCE HUBS</span>
        <div className="grid grid-cols-3 gap-3">
          
          {/* SHOPPING DESTINATION */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => handleCategoryClick('Shopping')}
            className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs flex flex-col justify-between h-32 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute right-[-15%] top-[-10%] w-12 h-12 bg-[#5B3DF5]/5 rounded-full blur-lg pointer-events-none group-hover:bg-[#5B3DF5]/10 transition-colors" />
            <div className="h-9 w-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-display font-black text-slate-900 leading-tight">SHOPPING</span>
              <span className="block text-[8px] text-slate-400 font-mono tracking-wider uppercase mt-0.5 font-bold">Buy Products</span>
              <span className="block text-[7px] text-[#5B3DF5] font-mono tracking-wider uppercase mt-1.5 font-black">POWERED BY SHOPSTACC</span>
            </div>
          </motion.div>

          {/* TRAVEL DESTINATION */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => handleCategoryClick('Travel')}
            className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs flex flex-col justify-between h-32 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute right-[-15%] top-[-10%] w-12 h-12 bg-emerald-500/5 rounded-full blur-lg pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
            <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-display font-black text-slate-900 leading-tight">TRAVEL</span>
              <span className="block text-[8px] text-slate-400 font-mono tracking-wider uppercase mt-0.5 font-bold">Book Flights/Hotels</span>
              <span className="block text-[7px] text-emerald-600 font-mono tracking-wider uppercase mt-1.5 font-black">POWERED BY TRAVELSTACC</span>
            </div>
          </motion.div>

          {/* GIFT CARDS DESTINATION */}
          <motion.div
            whileHover={{ y: -3 }}
            onClick={() => handleCategoryClick('Gift Cards')}
            className="bg-white rounded-3xl p-4 border border-slate-100 shadow-2xs flex flex-col justify-between h-32 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute right-[-15%] top-[-10%] w-12 h-12 bg-amber-400/5 rounded-full blur-lg pointer-events-none group-hover:bg-amber-400/10 transition-colors" />
            <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-display font-black text-slate-900 leading-tight">GIFT CARDS</span>
              <span className="block text-[8px] text-slate-400 font-mono tracking-wider uppercase mt-0.5 font-bold">Buy Gift Cards</span>
              <span className="block text-[7px] text-amber-600 font-mono tracking-wider uppercase mt-1.5 font-black">POWERED BY GIFTSTACC</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 6. DYNAMIC STATE WIDGETS LAYOUT */}
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <>
          {/* Unified Session Signals: Continue Shopping Widget across all stages */}
          {recentlyViewed.length > 0 && (
            <div className="mb-8 bg-white/65 border border-slate-100/50 rounded-[32px] p-5 mx-6 shadow-2xs">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                    <Compass className="w-4.5 h-4.5 text-[#5B3DF5] animate-pulse" />
                    Continue Shopping
                  </h3>
                  <p className="text-[10px] text-slate-450 font-mono tracking-wider font-extrabold uppercase mt-0.5">RECENTLY VIEWED PRODUCTS</p>
                </div>
                <span className="text-[9px] font-mono font-bold bg-[#EBF1FF] text-primary px-2.5 py-0.5 rounded-full border border-[#BACDFD] flex items-center">
                  {recentlyViewed.length} ITEM{recentlyViewed.length > 1 ? 'S' : ''} ACTIVE
                </span>
              </div>
              <div className="overflow-x-auto no-scrollbar flex gap-4 pb-1">
                {PRODUCTS.filter(p => recentlyViewed.includes(p.id)).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleProductClick(prod.id)}
                    className="flex-none w-[140px] bg-white rounded-2xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2 relative">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                    <span className="text-[9px] text-slate-450 font-mono font-bold uppercase block mt-1">{prod.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STATE 1: NEW USER EXPERIENCE */}
          {/* ========================================================= */}
          {stage === Stage.NEW_USER && (
            <div className="space-y-8">
              
              {/* Widget 1: Trending Deals */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                    <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                    Trending Deals
                  </h3>
                  <button onClick={() => navigate('/explore')} className="text-[10px] font-black text-primary tracking-wider uppercase">See All</button>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[180px] bg-white rounded-3xl border border-slate-100 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3 relative">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        <span className="absolute bottom-2 left-2 bg-slate-900/90 text-[8px] font-mono font-black text-amber-300 px-2 py-0.5 rounded-md uppercase tracking-wider">+{prod.pointsRequired / 5} PTS</span>
                      </div>
                      <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                        <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{prod.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 1.5: Near You (Partner Privileges) */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                    <MapPin className="w-4.5 h-4.5 text-rose-500 fill-rose-500/20" />
                    Privileges Near You
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-slate-400">BANGALORE INTRACITY</span>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {[
                    { id: 'near-1', name: 'The Leela Palace Dining', dist: '1.2 km away', offer: '15% Off food + 5x points accelerator', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=60' },
                    { id: 'near-2', name: 'Taj Epicure Lounge Entry', dist: '2.5 km away', offer: 'Complimentary dessert + lounge reservation', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=60' },
                    { id: 'near-3', name: 'BLR Airport Plaza VIP Lounge', dist: '18.4 km away', offer: 'Free entry with premium credit account', image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=300&auto=format&fit=crop&q=60' }
                  ].map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[200px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 mb-2.5">
                        <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-[8px] font-mono font-black text-white px-2 py-0.5 rounded-md uppercase tracking-wider">{loc.dist}</span>
                      </div>
                      <h4 className="text-xs font-display font-black text-slate-900 leading-tight line-clamp-1">{loc.name}</h4>
                      <p className="text-[10px] text-emerald-600 font-sans font-bold mt-1 leading-tight">{loc.offer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 2: Weekly Deals */}
              <div className="px-6">
                <div className="bg-[#FFF4E5] border border-[#FFE1BA] rounded-[32px] p-5 flex items-center justify-between shadow-2xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#B25E00] uppercase">WEEKLY SPECIAL</span>
                    <h3 className="text-sm font-display font-black text-slate-900">50% Off Partner Vouchers</h3>
                    <p className="text-[10px] text-slate-600 font-medium">Double points yield active on Swiggy & Uber gift cards.</p>
                  </div>
                  <button onClick={() => handleCategoryClick('Gift Cards')} className="flex-none h-10 px-4.5 bg-[#B25E00] text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    Unlock
                  </button>
                </div>
              </div>

              {/* Widget 3: Popular Deals & Products */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Popular Deals & Products</h3>
                  <button onClick={() => navigate('/explore')} className="text-[10px] font-black text-primary tracking-wider uppercase">View all</button>
                </div>
                <div className="px-6 grid grid-cols-2 gap-4">
                  {PRODUCTS.slice(3, 5).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-[8px] bg-slate-100 text-slate-500 font-mono font-black px-2 py-0.5 rounded-md uppercase tracking-wider">{prod.category}</span>
                        <h4 className="text-xs font-display font-black text-slate-900 mt-2 line-clamp-1 leading-tight">{prod.name}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                          <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                          <span className="text-xs font-display font-black text-emerald-600">
                            +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Featured Gift Cards */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                    <Gift className="w-4.5 h-4.5 text-indigo-500" />
                    Featured Gift Cards
                  </h3>
                  <button onClick={() => handleCategoryClick('Gift Cards')} className="text-[10px] font-black text-primary tracking-wider uppercase">Redeem</button>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {REWARDS_ITEMS.slice(0, 3).map((reward) => (
                    <div
                      key={reward.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[170px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 mb-3">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{reward.name}</h4>
                      <span className="text-[9px] font-mono font-bold text-slate-400 block mt-1 uppercase">{reward.provider}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 5: Top Travel Deals */}
              <div className="px-6">
                <div className="border border-slate-100 rounded-[32px] bg-white p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-black tracking-widest text-emerald-600 uppercase">RECOMMENDED ESCAPE</span>
                      <h3 className="text-sm font-display font-black text-slate-900">Bespoke Alps Retreat Deals</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Accumulate travel miles. Get pre-approved entry to luxury chalets.</p>
                    </div>
                    <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Plane className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="h-px bg-slate-50" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-display font-black text-slate-900">₹24,999/night average</span>
                    <button onClick={() => handleCategoryClick('Travel')} className="text-xs font-display font-black text-primary flex items-center gap-1 uppercase tracking-wider">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Widget 6: Seasonal Offers */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Seasonal Picks</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {PRODUCTS.filter(p => p.tags.includes('Polarized') || p.tags.includes('Waterproof')).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[150px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-2.5">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      <p className="text-[9px] text-slate-400 font-mono font-bold uppercase mt-0.5">{prod.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 7: New Arrivals */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">New Arrivals</h3>
                </div>
                <div className="px-6 space-y-3">
                  {PRODUCTS.slice(2, 4).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white border border-slate-100 rounded-3xl p-3 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-50">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-xs font-display font-black text-slate-900 leading-tight">{prod.name}</h4>
                          <span className="text-[9px] text-slate-400 font-mono uppercase">{prod.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-display font-black text-primary">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 8: Editor's Picks */}
              <div className="px-6">
                <div className="bg-slate-950 text-white rounded-[32px] p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">EDITOR’S CRITERIA</span>
                  <h3 className="text-base font-display font-black mt-1">Handcrafted Leather Vanguard</h3>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed"> Handcrafted calfskin sneakers molded to your stride. Complete with premium waxed detailing.</p>
                  <button onClick={() => handleProductClick('fash-sneakers')} className="mt-4 px-4.5 py-2.5 bg-[#5B3DF5] text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    Explore Edition
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* STATE 2: AFTER BROWSING ELECTRONICS */}
          {/* ========================================================= */}
          {stage === Stage.BROWSING && (
            <div className="space-y-8">
              
              {/* Widget 1: Recently Purchased Items */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 animate-pulse" />
                    Recently Purchased Items
                  </h3>
                  <p className="text-[10px] text-slate-450 font-mono tracking-wider font-extrabold uppercase mt-0.5">SECURE TRANSACTION HISTORY</p>
                </div>
                {purchaseHistory.length > 0 ? (
                  <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                    {purchaseHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleProductClick(item.productId)}
                        className="flex-none w-[180px] bg-white rounded-3xl border border-slate-100 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3 relative">
                          <img src={item.image} alt={item.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                          <span className="absolute bottom-2 left-2 bg-slate-900/90 text-[8px] font-mono font-black text-emerald-400 px-2 py-0.5 rounded-md uppercase tracking-wider">SECURE PASS</span>
                        </div>
                        <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{item.productName}</h4>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50 text-[10px] font-mono">
                          <span className="text-slate-400">{item.date}</span>
                          <span className="text-emerald-600 font-black">+{item.pointsEarned} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mx-6 p-5 bg-white border border-slate-100 rounded-[28px] text-center space-y-2">
                    <p className="text-xs font-semibold text-slate-500">No purchases in this session yet.</p>
                    <p className="text-[10px] text-slate-450 max-w-xs mx-auto">Standard Card Pay purchases earn up to 10% points instantly. Your secure ledger will appear here.</p>
                  </div>
                )}
              </div>

              {/* Widget 2: Point-Matching Deals */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Percent className="w-4.5 h-4.5 text-emerald-600" />
                      Deals Matching Your Point Balance
                    </h3>
                    <p className="text-[10px] text-slate-450 font-mono tracking-wider font-extrabold uppercase mt-0.5">UNDER {rewardBalance} POINTS</p>
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">{rewardBalance} PTS MAX</span>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {REWARDS_ITEMS.filter(r => r.pointsRequired <= rewardBalance).map((reward) => (
                    <div
                      key={reward.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[170px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 mb-2.5">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{reward.name}</h4>
                      <p className="text-[9px] text-[#2E7D32] font-mono font-bold mt-1 uppercase">COST: {reward.pointsRequired} PTS</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Inspired by Electronics */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Inspired by Mohit's Interests</h3>
                </div>
                <div className="px-6 grid grid-cols-2 gap-4">
                  {electronicsProducts.slice(1, 3).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-[8px] bg-slate-100 text-slate-500 font-mono font-black px-2 py-0.5 rounded-md uppercase tracking-wider">ELECTRONICS</span>
                        <h4 className="text-xs font-display font-black text-slate-900 mt-2 line-clamp-1 leading-tight">{prod.name}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                          <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                          <span className="text-xs font-display font-black text-emerald-600">
                            +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Trending Accessories */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Trending Accessories</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {PRODUCTS.filter(p => p.id === 'elec-keyboard' || p.id === 'life-lamp').map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[170px] bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      <p className="text-[10px] text-slate-450 font-mono tracking-wider font-extrabold uppercase mt-1">{prod.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 5: Customers Also Viewed */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Customers Also Viewed</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {fashionProducts.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[160px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-2">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      <span className="text-[9px] text-slate-400 font-mono uppercase">{prod.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 6: Price Drops */}
              <div className="px-6">
                <div className="bg-[#FFF0F0] border border-[#FFD9D9] rounded-[32px] p-5 flex items-center justify-between shadow-2xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#D32F2F] uppercase">PRICE ACCELERATION</span>
                    <h3 className="text-sm font-display font-black text-slate-900">Elysium Espresso Maker drop</h3>
                    <p className="text-[10px] text-slate-600 font-medium">Temporary point requirement reduction to 650 pts.</p>
                  </div>
                  <button onClick={() => handleProductClick('life-brewer')} className="flex-none h-10 px-4 bg-[#D32F2F] text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    View
                  </button>
                </div>
              </div>

              {/* Widget 7: Recently Popular */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Recently Popular</h3>
                </div>
                <div className="px-6 space-y-3">
                  {PRODUCTS.slice(0, 2).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white border border-slate-100 rounded-3xl p-3 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-50">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-xs font-display font-black text-slate-900 leading-tight">{prod.name}</h4>
                          <span className="text-[9px] text-slate-400 font-mono uppercase">{prod.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-display font-black text-primary">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* STATE 3: AFTER FIRST PURCHASE (EARBUDS ACQUIRED) */}
          {/* ========================================================= */}
          {stage === Stage.FIRST_PURCHASE && (
            <div className="space-y-8">
              
              {/* Widget 1: Continue Shopping */}
              {recentlyViewed.length === 0 && (
                <div>
                  <div className="px-6 mb-4">
                    <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Compass className="w-4.5 h-4.5 text-primary animate-pulse" />
                      Continue Shopping
                    </h3>
                    <p className="text-[10px] text-slate-450 font-mono tracking-wider font-extrabold uppercase mt-0.5">DISCOVER COMPLEMENTS</p>
                  </div>
                  <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                    {electronicsProducts.filter(p => p.id !== 'elec-earbuds').map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleProductClick(prod.id)}
                        className="flex-none w-[180px] bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                          <span className="text-xs font-display font-bold text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-450 font-mono uppercase font-bold">{prod.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Widget 2: Complete Your Setup */}
              <div className="px-6">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-lg flex flex-col justify-between h-56 border border-slate-900">
                  <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-[#5B3DF5]/30 rounded-full blur-2xl pointer-events-none" />
                  <div className="space-y-1">
                    <span className="text-[9px] bg-amber-400/25 text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">COMPLETE THE LOOK</span>
                    <h3 className="text-base font-display font-black mt-2">Finish Your Sound Setup</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Pair your Airbud Elites with custom Horizon tactile mechanical keyboards or smart ambient Oak light panels.</p>
                  </div>
                  <button onClick={() => handleProductClick('elec-keyboard')} className="mt-2 w-full py-3 bg-[#5B3DF5] text-white rounded-2xl text-[10px] font-display font-black tracking-widest uppercase hover:bg-opacity-95 transition-all">
                    Explore Harmony Sets
                  </button>
                </div>
              </div>

              {/* Widget 3: Recommended Accessories */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Recommended Accessories</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {PRODUCTS.filter(p => p.id === 'elec-keyboard' || p.id === 'life-lamp').map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[160px] bg-white rounded-3xl border border-slate-100 p-4.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono uppercase block mt-1">{prod.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Frequently Bought Together */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Frequently Bought Together</h3>
                </div>
                <div className="px-6 grid grid-cols-2 gap-4">
                  {PRODUCTS.filter(p => p.id === 'life-brewer' || p.id === 'fash-sunglasses').map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                          <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                          <span className="text-xs font-display font-black text-emerald-600">
                            +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 5: Recharge Your Wallet */}
              <div className="px-6">
                <div className="bg-[#EBF3FF] border border-[#C6DCFF] rounded-[32px] p-5 flex items-center justify-between shadow-2xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-black tracking-widest text-primary uppercase">WALLET RECHARGE</span>
                    <h3 className="text-sm font-display font-black text-slate-900">Reload Private Accounts</h3>
                    <p className="text-[10px] text-slate-600 font-medium">Link checking balance to SmartRewards for direct points buy-ins.</p>
                  </div>
                  <button onClick={() => navigate('/wallet')} className="flex-none h-10 px-4 bg-primary text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    Link
                  </button>
                </div>
              </div>

              {/* Widget 6: Gift Cards Within Your Balance */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Vouchers Within Balance</h3>
                  <span className="text-[9px] font-mono font-bold bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full border border-[#C8E6C9]">AFFORDABLE</span>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {REWARDS_ITEMS.filter(r => r.pointsRequired <= rewardBalance).map((reward) => (
                    <div
                      key={reward.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[170px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 mb-3">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{reward.name}</h4>
                      <p className="text-[9px] text-[#2E7D32] font-mono font-bold mt-1 uppercase">COST: {reward.pointsRequired} PTS</p>
                    </div>
                  ))}
                  {REWARDS_ITEMS.filter(r => r.pointsRequired <= rewardBalance).length === 0 && (
                    <div className="px-6 py-4 text-xs text-slate-400 font-sans italic">No vouchers fit current balance. Accumulate more points.</div>
                  )}
                </div>
              </div>

              {/* Widget 7: Travel Deals You Can Unlock */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Travel Vouchers to Unlock</h3>
                </div>
                <div className="px-6 space-y-3">
                  {REWARDS_ITEMS.filter(r => r.pointsRequired > rewardBalance).slice(0, 2).map((reward) => {
                    const diff = reward.pointsRequired - rewardBalance;
                    return (
                      <div
                        key={reward.id}
                        className="bg-white border border-slate-100 rounded-3xl p-3.5 flex justify-between items-center shadow-2xs"
                      >
                        <div className="flex gap-3 items-center min-w-0">
                          <div className="h-10 w-10 rounded-2xl overflow-hidden bg-slate-50 flex-none">
                            <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-display font-black text-slate-900 truncate leading-tight">{reward.name}</h4>
                            <span className="text-[9px] text-slate-400 font-mono uppercase">Need {diff} more points</span>
                          </div>
                        </div>
                        <button onClick={() => navigate('/explore')} className="flex-none px-3.5 py-2 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-display font-black uppercase text-slate-700 hover:bg-slate-100 transition-colors">
                          Earn Pts
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Widget 8: Buy Again */}
              <div className="px-6">
                <div className="border border-slate-100 rounded-[32px] bg-white p-5 flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-50">
                      <img src={PRODUCTS[2].image} alt="Vertex buds" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block">ORDER AGAIN</span>
                      <h4 className="text-xs font-display font-black text-slate-900 mt-0.5">Vertex True ANC Airbuds</h4>
                    </div>
                  </div>
                  <button onClick={() => handleProductClick('elec-earbuds')} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer transition-colors">
                    Reorder
                  </button>
                </div>
              </div>

              {/* Widget 9: Recently Purchased */}
              {purchaseHistory.length > 0 && (
                <div>
                  <div className="px-6 mb-3">
                    <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Recently Acquired</h3>
                  </div>
                  <div className="px-6 space-y-2.5">
                    {purchaseHistory.map((item) => (
                      <div key={item.id} className="bg-white border border-slate-100 rounded-3xl p-4 flex justify-between items-center shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl overflow-hidden bg-slate-50 flex-none">
                            <img src={item.image} alt={item.productName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-xs font-display font-black text-slate-900">{item.productName}</h4>
                            <span className="text-[10px] text-slate-450 font-mono block mt-0.5">{item.date}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-emerald-600">+{item.pointsEarned} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Widget 10: Limited Time Offers */}
              <div className="px-6 pb-2">
                <div className="bg-slate-950 text-white rounded-[32px] p-6 relative overflow-hidden shadow-lg">
                  <span className="text-[9px] bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">LIMITED OFFER</span>
                  <h3 className="text-base font-display font-black mt-2">Plaza VIP Airport Lounge</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Redeem double entries for only 400 points total this holiday weekend.</p>
                  <button onClick={() => navigate('/rewards')} className="mt-4 px-4.5 py-2.5 bg-[#5B3DF5] text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    Claim Lounge Pass
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* STATE 4: LOYAL CUSTOMER (GOLD MEMBER PORTAL) */}
          {/* ========================================================= */}
          {stage === Stage.LOYAL_CUSTOMER && (
            <div className="space-y-8">
              
              {/* Widget 1: Continue Shopping */}
              {recentlyViewed.length === 0 && (
                <div>
                  <div className="px-6 mb-4">
                    <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Compass className="w-4.5 h-4.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                      Resume Luxury Search
                    </h3>
                  </div>
                  <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                    {travelProducts.slice(0, 3).map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleProductClick(prod.id)}
                        className="flex-none w-[180px] bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                        <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                          <div className="flex flex-col">
                            <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                            <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="text-right flex flex-col justify-end">
                            <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                            <span className="text-xs font-display font-black text-amber-500">
                              +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Widget 2: Recommended For You */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Recommended for Mohit</h3>
                </div>
                <div className="px-6 grid grid-cols-2 gap-4">
                  {PRODUCTS.filter(p => p.id === 'life-lamp' || p.id === 'fash-watch').map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                          <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                          <span className="text-xs font-display font-black text-emerald-600">
                            +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Your Favourite Categories */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Your Favourite Categories</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-3 px-6 pb-2">
                  {[
                    { name: 'Travel', count: '4 Luxury Picks', icon: Plane, color: 'bg-emerald-50 text-emerald-600' },
                    { name: 'Electronics', count: '4 Flagship Gears', icon: Laptop, color: 'bg-indigo-50 text-indigo-600' },
                    { name: 'Fashion', count: '3 Small-Batch', icon: Star, color: 'bg-amber-50 text-amber-600' }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="flex-none w-32 p-4 bg-white border border-slate-100 rounded-3xl text-left cursor-pointer transition-all shadow-2xs hover:bg-slate-50"
                      >
                        <div className={`p-2 rounded-2xl w-9 h-9 flex items-center justify-center ${cat.color} mb-3`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="block text-xs font-display font-black text-slate-900">{cat.name}</span>
                        <span className="block text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-1 leading-tight">{cat.count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Widget 4: Exclusive Member Rewards */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                    <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                    Exclusive Member Rewards
                  </h3>
                  <span className="text-[9px] bg-amber-400/20 text-amber-800 px-2 py-0.5 rounded-full font-bold">GOLD ONLY</span>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {PRODUCTS.filter(p => p.isPremium).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[240px] bg-slate-900 text-white rounded-3xl border border-amber-400/20 p-4 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 mb-3">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xs font-display font-black text-white line-clamp-1 leading-tight">{prod.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{prod.description}</p>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                          <span className="text-xs font-display font-black text-white">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="text-[8px] text-slate-500 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                          <span className="text-xs font-display font-black text-amber-400">
                            +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 5: Flash Deals */}
              <div className="px-6">
                <div className="bg-[#FFEAEA] border border-[#FFD2D2] rounded-[32px] p-5 flex items-center justify-between shadow-2xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#C62828] uppercase">FLASH POINT DEALS</span>
                    <h3 className="text-sm font-display font-black text-slate-900">Swiggy Vouchers 40% Off</h3>
                    <p className="text-[10px] text-slate-600 font-medium">Claim dine-in discounts starting from 150 points.</p>
                  </div>
                  <button onClick={() => navigate('/rewards')} className="flex-none h-10 px-4 bg-[#C62828] text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    Claim
                  </button>
                </div>
              </div>

              {/* Widget 6: Weekend Escapes */}
              <div className="px-6">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-lg flex flex-col justify-between h-52 border border-slate-900">
                  <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />
                  <div className="space-y-1">
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">WEEKEND RETREATS</span>
                    <h3 className="text-base font-display font-black mt-2">Michelin Fireside Overwater Chalets</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Book a bespoke 3-night chalet pass featuring luxury helicopter shuttle transfers.</p>
                  </div>
                  <button onClick={() => handleProductClick('gold-resort')} className="mt-2 w-full py-3 bg-amber-400 text-slate-950 rounded-2xl text-[10px] font-display font-black tracking-widest uppercase hover:bg-amber-300 transition-all">
                    Reserve Chalet
                  </button>
                </div>
              </div>

              {/* Widget 7: Travel Deals */}
              <div>
                <div className="px-6 mb-4 flex justify-between items-center">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Luxury Airport Lounges</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {REWARDS_ITEMS.filter(r => r.category === 'travel').map((reward) => (
                    <div
                      key={reward.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[170px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 mb-3">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{reward.name}</h4>
                      <p className="text-[9px] text-[#2E7D32] font-mono font-bold mt-1 uppercase">COST: {reward.pointsRequired} PTS</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 8: Recommended Gift Cards */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Recommended Vouchers</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {REWARDS_ITEMS.slice(0, 3).map((reward) => (
                    <div
                      key={reward.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[160px] bg-white rounded-3xl border border-slate-100 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 mb-2.5">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{reward.name}</h4>
                      <span className="text-[9px] text-slate-400 font-mono uppercase mt-0.5 block">{reward.provider}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 9: Based On Previous Purchases */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Based on Purchases</h3>
                </div>
                <div className="px-6 grid grid-cols-2 gap-4">
                  {PRODUCTS.filter(p => p.id === 'elec-keyboard' || p.id === 'fash-sneakers').map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="text-xs font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100/50">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">CASH PRICE</span>
                          <span className="text-xs font-display font-black text-slate-900">₹{prod.priceValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="text-[8px] text-slate-400 font-sans font-bold uppercase tracking-wider">POINTS EARNED</span>
                          <span className="text-xs font-display font-black text-emerald-600">
                            +{Math.round(prod.priceValue * (prod.category === 'Electronics' ? 0.15 : 0.05)).toLocaleString()} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 10: Buy Again */}
              <div className="px-6">
                <div className="border border-slate-100 rounded-[32px] bg-white p-5 flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-50 flex-none">
                      <img src={PRODUCTS[0].image} alt="Studio Ultra Headphones" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block">ORDER AGAIN</span>
                      <h4 className="text-xs font-display font-black text-slate-900 mt-0.5">Studio Ultra ANC Headphones</h4>
                    </div>
                  </div>
                  <button onClick={() => handleProductClick('elec-headphones')} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer transition-colors">
                    Reorder
                  </button>
                </div>
              </div>

              {/* Widget 11: Recently Redeemed */}
              {redeemedHistory.length > 0 && (
                <div>
                  <div className="px-6 mb-3">
                    <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Recently Redeemed</h3>
                  </div>
                  <div className="px-6 space-y-3">
                    {redeemedHistory.map((item) => (
                      <div key={item.id} className="bg-white border border-slate-100 rounded-3xl p-4 flex justify-between items-center shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="text-xs font-display font-black text-slate-900">{item.rewardName}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-slate-400 font-sans font-medium">{item.date}</span>
                              <span className="text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200/50 px-1.5 py-0.5 rounded-md font-bold">
                                {item.couponCode}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-display font-black text-rose-500">-{item.pointsSpent} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Widget 12: New From Brands You Like */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">New From Brands You Like</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {PRODUCTS.filter(p => p.tags.includes('Minimalist') || p.tags.includes('Handmade')).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleProductClick(prod.id)}
                      className="flex-none w-[150px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-2.5">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{prod.name}</h4>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">{prod.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 13: Early Access Rewards */}
              <div className="px-6">
                <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-[32px] p-5 flex items-center justify-between shadow-2xs">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-black tracking-widest text-[#F57F17] uppercase">EARLY PRIVILEGE</span>
                    <h3 className="text-sm font-display font-black text-slate-900">Chronos Titanium Smartwatch</h3>
                    <p className="text-[10px] text-slate-600 font-medium">Pre-release stock reserved exclusively for Gold Tier.</p>
                  </div>
                  <button onClick={() => handleProductClick('elec-watch')} className="flex-none h-10 px-4 bg-[#F57F17] text-white rounded-2xl text-[10px] font-display font-black tracking-wider uppercase hover:bg-opacity-95 transition-all">
                    Enter
                  </button>
                </div>
              </div>

              {/* Widget 14: Rewards Expiring Soon */}
              <div className="px-6">
                <div className="bg-[#FFF3E0] border border-[#FFE0B2] rounded-[32px] p-5 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-[#E65100]/10 text-[#E65100] flex items-center justify-center flex-none">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-black text-[#E65100] tracking-widest uppercase">EXPIRY NOTIFICATION</span>
                    <h4 className="text-xs font-display font-black text-slate-900 mt-0.5">250 Points Expiring Soon</h4>
                    <p className="text-[10px] text-slate-600 font-medium">Use your balance for gift vouchers or flights before Dec 31st.</p>
                  </div>
                </div>
              </div>

              {/* Widget 15: Points Worth Redeeming */}
              <div>
                <div className="px-6 mb-4">
                  <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">Best Vouchers For Your Balance</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar flex gap-4 px-6 pb-2">
                  {REWARDS_ITEMS.filter(r => r.pointsRequired <= rewardBalance).map((reward) => (
                    <div
                      key={reward.id}
                      onClick={() => navigate('/rewards')}
                      className="flex-none w-[170px] bg-white rounded-3xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-50 mb-3">
                        <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-[11px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{reward.name}</h4>
                      <p className="text-[9px] text-[#2E7D32] font-mono font-bold mt-1 uppercase">Redeem {reward.pointsRequired} pts</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </>
      )}

      {/* Premium Floating Action Button - VIP Concierge Support */}
      <div className="absolute bottom-24 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsConciergeOpen(true);
            setConciergeSent(false);
          }}
          className={`h-14 w-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(91,61,245,0.3)] cursor-pointer ${
            tier === 'Gold Member'
              ? 'bg-gradient-to-tr from-slate-950 via-amber-500 to-slate-900 text-amber-300 border border-amber-400/30 shadow-amber-500/20'
              : 'bg-primary text-white shadow-primary/30'
          }`}
        >
          <Headphones className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Concierge Dialog Modal */}
      <AnimatePresence>
        {isConciergeOpen && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col justify-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="bg-white rounded-t-[36px] border-t border-slate-100 p-6 flex flex-col justify-between max-h-[85%] shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-2xl ${tier === 'Gold Member' ? 'bg-amber-400/10 text-amber-600' : 'bg-primary/5 text-primary'}`}>
                    <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-black text-slate-900 tracking-tight uppercase">
                      {tier === 'Gold Member' ? 'Centurion Concierge Desk' : 'SmartRewards Assistant'}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider">SECURE DIRECT LINE • ACTIVE</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConciergeOpen(false)}
                  className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Dialog body */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-5">
                {conciergeSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-display font-black text-slate-900">Message Transmitted</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-medium">
                        Your secure inquiry has been routed directly to our dedicated lifestyle coordinator. Typical response time is under 15 seconds.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Welcome back, {tier === 'Gold Member' ? 'VIP Member' : 'valued member'}. As a {tier === 'Gold Member' ? 'Gold status holder' : 'SmartRewards participant'}, you have access to prioritized digital hospitality. Dispatches sent here go directly to our active support pool.
                    </p>

                    {/* Pre-packaged inquiries */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">SUGGESTED SERVICES</span>
                      {[
                        'Request Airport Lounge Access Escort',
                        'Inquire about Bespoke Suite Points Bonus',
                        'Request dedicated partner dining reservations',
                        'Contact technical support representative'
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setConciergeMsg(item)}
                          className="w-full text-left p-3.5 rounded-2xl border border-slate-100/70 hover:border-primary/40 bg-slate-50/50 hover:bg-white text-xs font-medium text-slate-700 transition-all cursor-pointer flex justify-between items-center group shadow-2xs hover:shadow-xs"
                        >
                          <span>{item}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>

                    {/* Chat field */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">SECURE DISPATCH</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={conciergeMsg}
                          onChange={(e) => setConciergeMsg(e.target.value)}
                          placeholder="Type secure message..."
                          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary/40 focus:bg-white transition-all shadow-2xs"
                        />
                        <button
                          onClick={() => {
                            if (conciergeMsg.trim()) {
                              setConciergeSent(true);
                            }
                          }}
                          disabled={!conciergeMsg.trim()}
                          className="p-3 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-opacity-95 cursor-pointer disabled:opacity-40 transition-all shadow-md shadow-primary/20"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
