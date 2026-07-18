import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { 
  User, Shield, Bell, Heart, History, Sparkles, Share2, Settings, ChevronRight, Check, Award
} from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { state, removeFromWishlist } = useApp();
  const navigate = useNavigate();
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [emailPref, setEmailPref] = useState(state.notificationPreferences.email);
  const [pushPref, setPushPref] = useState(state.notificationPreferences.push);

  const referralCode = 'SMART-MEMBER-GOLD-770';

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const wishlistProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen bg-brand-bg pb-24 font-sans text-slate-900 select-none overflow-x-hidden"
    >
      
      {/* 1. Profile Header block */}
      <div className="bg-white px-6 pt-8 pb-6 border-b border-slate-100 flex flex-col items-center text-center">
        {/* Avatar badge */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg relative overflow-hidden">
            <User className="w-10 h-10 text-slate-300 animate-pulse" />
            {state.tier === 'Gold Member' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 to-amber-500/30 pointer-events-none" />
            )}
          </div>
          
          {state.tier === 'Gold Member' && (
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-slate-900 shadow-sm animate-pulse">
              <Award className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
            </div>
          )}
        </div>

        <h2 className="mt-4 text-lg font-display font-black text-slate-900 tracking-tight">
          Mohit Sharma
        </h2>
        <span className="text-[10px] text-slate-400 font-mono tracking-wider">
          VIP Member ID: {state.tier === 'Gold Member' ? '0077-GOLD' : '8892-SLV'}
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">STATUS:</span>
          <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${
            state.tier === 'Gold Member' ? 'text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200' : 'text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200'
          }`}>
            {state.tier}
          </span>
        </div>

        {/* Balance metrics */}
        <div className="grid grid-cols-2 gap-4 w-full mt-6 max-w-sm">
          <div className="bg-[#F8F9FC] rounded-3xl p-4 border border-gray-100 text-center">
            <span className="text-[9px] text-slate-400 font-mono block uppercase font-bold tracking-wider">accumulated</span>
            <span className="text-base font-display font-black text-slate-900 mt-1 block leading-none">
              <AnimatedCounter value={state.rewardBalance} /> pts
            </span>
          </div>
          <div className="bg-[#F8F9FC] rounded-3xl p-4 border border-gray-100 text-center">
            <span className="text-[9px] text-slate-400 font-mono block uppercase font-bold tracking-wider">active tier</span>
            <span className="text-xs font-display font-black text-primary mt-1.5 flex items-center justify-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
              {state.tier === 'Gold Member' ? 'Gold' : 'Standard'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Saved / Personalization Interests */}
      <div className="px-6 mt-8">
        <h3 className="font-display font-black text-xs uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          My Interest Profiles
        </h3>
        <p className="text-[11px] text-slate-400 mb-3.5 leading-relaxed font-medium">
          Dynamic tags auto-compiled by your secure search actions
        </p>
        <div className="flex flex-wrap gap-2">
          {state.savedInterests.length > 0 ? (
            state.savedInterests.map((interest, idx) => (
              <span 
                key={idx} 
                className="px-3.5 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-black text-primary font-display uppercase tracking-widest shadow-xs"
              >
                {interest}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 font-sans italic">
              Explore custom categories or details to trigger initial learning.
            </span>
          )}
        </div>
      </div>

      {/* 3. Dynamic Wishlist Section */}
      <div className="px-6 mt-8">
        <h3 className="font-display font-black text-xs uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" />
          My Saved Wishlist
        </h3>
        
        {wishlistProducts.length > 0 ? (
          <div className="space-y-3">
            {wishlistProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-[#F8F9FC] border border-gray-100 p-3.5 rounded-3xl flex gap-3 items-center hover:shadow-xs transition-all cursor-pointer"
              >
                <img 
                  src={p.image} 
                  alt={p.name} 
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-2xl object-cover" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-display font-black text-slate-900 truncate leading-tight">{p.name}</h4>
                  <span className="text-[10px] text-primary font-mono font-black block mt-1">{p.pointsRequired} pts</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(p.id);
                  }}
                  className="px-3.5 py-2 bg-white border border-slate-200/50 hover:bg-slate-100 rounded-3xl text-[10px] text-slate-600 font-display font-black uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F9FC] border border-gray-100 rounded-3xl p-6 text-center text-xs text-slate-400 italic font-medium leading-relaxed">
            Your wishlist is empty. Save items from the catalog.
          </div>
        )}
      </div>

      {/* 4. Notification Settings panel */}
      <div className="px-6 mt-8">
        <h3 className="font-display font-black text-xs uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-slate-500" />
          Communication Preferences
        </h3>
        
        <div className="bg-[#F8F9FC] rounded-3xl border border-gray-100 p-5 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <span className="block text-xs font-black text-slate-900">Email Special Bulletins</span>
              <span className="block text-[10px] text-slate-400 font-medium">Monthly curated high-tier selections</span>
            </div>
            <button
              onClick={() => setEmailPref(!emailPref)}
              className={`w-10 h-6 rounded-full p-1 transition-all ${emailPref ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-all transform ${emailPref ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="w-full h-[1px] bg-slate-200/55" />

          <div className="flex justify-between items-center">
            <div>
              <span className="block text-xs font-black text-slate-900">Instant Push Notifications</span>
              <span className="block text-[10px] text-slate-400 font-medium">Immediate warnings on points redemptions</span>
            </div>
            <button
              onClick={() => setPushPref(!pushPref)}
              className={`w-10 h-6 rounded-full p-1 transition-all ${pushPref ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-all transform ${pushPref ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Purchase History log */}
      <div className="px-6 mt-8">
        <h3 className="font-display font-black text-xs uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
          <History className="w-4 h-4 text-slate-500" />
          Marketplace Purchase History
        </h3>

        {state.purchaseHistory.length > 0 ? (
          <div className="space-y-3">
            {state.purchaseHistory.map((history) => (
              <div key={history.id} className="bg-[#F8F9FC] border border-gray-100 rounded-3xl p-4 flex gap-3 items-center shadow-xs">
                <img 
                  src={history.image} 
                  alt={history.productName} 
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-2xl object-cover flex-none bg-gray-200" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-display font-black text-slate-900 truncate leading-tight">{history.productName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">{history.date}</span>
                </div>
                <div className="text-right flex flex-col justify-center">
                  <span className="text-[8px] text-slate-400 block font-mono font-bold tracking-wider">CREDITED</span>
                  <span className="text-xs font-display font-black text-emerald-600">+{history.pointsEarned} pts</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F9FC] border border-gray-100 rounded-3xl p-6 text-center text-xs text-slate-400 italic font-medium leading-relaxed">
            You have not bought any products yet.
          </div>
        )}
      </div>

      {/* 6. Referral Program card */}
      <div className="px-6 mt-8">
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-5 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-amber-400">
            <Share2 className="w-4 h-4 stroke-[2.5]" />
            <span className="font-mono text-[9px] tracking-widest font-black uppercase">REFERRAL PROGRAM</span>
          </div>
          <h4 className="text-sm font-display font-black mt-2 tracking-tight">Give 500, Get 500 Points</h4>
          <p className="text-[10.5px] text-slate-300 mt-1 leading-relaxed font-sans font-medium">
            Invite your peers to SmartRewards. Once they perform their first catalog redemption, both of you are credited 500 bonus points.
          </p>
          
          <div className="mt-4 flex gap-2">
            <div className="bg-white/10 border border-white/10 px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold text-slate-200 select-all flex-1 text-center truncate">
              {referralCode}
            </div>
            <button
              onClick={handleCopyReferral}
              className={`px-5 rounded-2xl text-xs font-display font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all ${
                copiedReferral ? 'bg-emerald-600 text-white' : 'bg-primary text-white hover:bg-opacity-90'
              }`}
            >
              {copiedReferral ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : null}
              <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. Settings section */}
      <div className="px-6 mt-8">
        <h3 className="font-display font-black text-xs uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-slate-500" />
          App Preferences & Settings
        </h3>

        <div className="bg-[#F8F9FC] rounded-3xl border border-gray-100 p-2 divide-y divide-slate-100/30 shadow-xs">
          {[
            { name: 'Security Verification', desc: 'Secure FaceID or biometric prompt settings' },
            { name: 'Privacy Ledger Statement', desc: 'Manage your local data learning variables' },
            { name: 'Help & Concierge Support', desc: '24/7 dedicated support representative' },
            { name: 'Developer Mode Information', desc: 'Prototypes, metadata triggers, sandbox specs' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex justify-between items-center hover:bg-white/40 transition-colors cursor-pointer rounded-2xl">
              <div>
                <span className="block text-xs font-black text-slate-900 leading-tight">{item.name}</span>
                <span className="block text-[10px] text-slate-400 mt-1 font-medium">{item.desc}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
