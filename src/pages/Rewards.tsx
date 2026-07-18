import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { REWARDS_ITEMS } from '../data';
import { RewardItem } from '../types';
import { Ticket, Gift, Sparkles, Plane, Coffee, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const Rewards: React.FC = () => {
  const { state, redeemReward } = useApp();
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'voucher' | 'travel' | 'lifestyle' | 'entertainment'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredRewards = REWARDS_ITEMS.filter((rew) => {
    return activeCategory === 'all' || rew.category === activeCategory;
  });

  const handleRedeemClick = (reward: RewardItem) => {
    setSelectedReward(reward);
  };

  const confirmRedemption = () => {
    if (!selectedReward) return;

    setIsRedeeming(true);
    setTimeout(() => {
      const success = redeemReward(selectedReward);
      setIsRedeeming(false);
      setSelectedReward(null);
    }, 1500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voucher': return Gift;
      case 'travel': return Plane;
      case 'entertainment': return Ticket;
      case 'lifestyle': return Coffee;
      default: return Sparkles;
    }
  };

  const RewardSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-[#F8F9FC] rounded-3xl border border-slate-100/70 p-4.5 flex gap-4 h-[120px] animate-pulse">
          <div className="h-20 w-20 rounded-2xl bg-slate-200 flex-none" />
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-2">
              <div className="h-2.5 w-1/4 bg-slate-200 rounded-md" />
              <div className="h-4.5 w-3/4 bg-slate-200 rounded-md" />
            </div>
            <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
              <div className="h-2.5 w-1/3 bg-slate-200 rounded-md" />
              <div className="h-4 w-1/4 bg-slate-200 rounded-md" />
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
      className="min-h-screen bg-brand-bg pb-24 font-sans text-slate-900 select-none overflow-x-hidden"
    >
      
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-display font-black tracking-tight text-slate-900">Redeem Rewards</h1>
            <p className="text-xs text-slate-400 mt-0.5">Use your accumulated points for premium partner vouchers</p>
          </div>
          <span className="text-[8px] font-mono font-black text-[#5B3DF5] uppercase bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/80 flex-none mt-1">
            POWERED BY REWARDSTACC
          </span>
        </div>

        {/* Current points balance */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500 font-medium">AVAILABLE BALANCE</span>
          </div>
          <span className="text-base font-display font-black text-primary">
            <AnimatedCounter value={state.rewardBalance} /> <span className="text-xs font-semibold">Points</span>
          </span>
        </div>

        {/* Stage-based Personalized Experience advice banner */}
        <div className="mt-3 p-4.5 rounded-3xl bg-slate-950 text-white relative overflow-hidden border border-white/10">
          <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
          {state.stage === 'Stage 1: New User' && (
            <div>
              <div className="flex items-center gap-1.5 text-[8.5px] text-amber-400 font-mono font-black tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Welcome Offer • Stage 1
              </div>
              <h4 className="text-xs font-display font-black mt-1">Unlock 2,500 Welcome points on your first transaction!</h4>
              <p className="text-[10px] text-slate-350 font-medium mt-1 leading-relaxed">Your points balance is currently zero. Explore the commerce hub directories to perform your first transaction and activate high-yield automatic point tracking.</p>
            </div>
          )}
          {state.stage === 'Stage 2: Browsing' && (
            <div>
              <div className="flex items-center gap-1.5 text-[8.5px] text-indigo-400 font-mono font-black tracking-wider uppercase">
                <Coffee className="w-3.5 h-3.5" />
                Aesthetic Balance Matching • Stage 2
              </div>
              <h4 className="text-xs font-display font-black mt-1">Your 2,500 points fit digital cards perfectly!</h4>
              <p className="text-[10px] text-slate-350 font-medium mt-1 leading-relaxed">Based on your recent search patterns, your current points balance is an ideal fit for Swiggy and Starbucks gift cards. Redeem below for instant premium dining benefits.</p>
            </div>
          )}
          {state.stage === 'Stage 3: First Purchase' && (
            <div>
              <div className="flex items-center gap-1.5 text-[8.5px] text-amber-400 font-mono font-black tracking-wider uppercase animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI ML Predictive recommendation • Stage 3
              </div>
              <h4 className="text-xs font-display font-black mt-1">94.7% Match: Amazon Pay India Instant Voucher</h4>
              <p className="text-[10px] text-slate-350 font-medium mt-1 leading-relaxed">Our ML models suggest spending 5,000 points on Amazon Pay vouchers to acquire companion storage and power accessories for your newly acquired studio sound gear.</p>
            </div>
          )}
          {state.stage === 'Stage 4: Loyal Customer' && (
            <div>
              <div className="flex items-center gap-1.5 text-[8.5px] text-amber-300 font-mono font-black tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Centurion Prescriptive advice • Stage 4
              </div>
              <h4 className="text-xs font-display font-black mt-1">Prescribed Action: Taj Lake Palace Udaipur Stay</h4>
              <p className="text-[10px] text-slate-350 font-medium mt-1 leading-relaxed">Welcome Centurion Elite. We prescribe transferring 50,000 points to our luxury stay program to enjoy a completely free, premium heritage stay with VIP helicopter transfers.</p>
            </div>
          )}
        </div>

        {/* Categories filters */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mt-4 pb-1">
          {[
            { id: 'all', name: 'All Vouchers' },
            { id: 'voucher', name: 'Digital Cards' },
            { id: 'travel', name: 'Airport & Travel' },
            { id: 'entertainment', name: 'Cinema' },
            { id: 'lifestyle', name: 'Dining' }
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex-none px-4 py-1.5 rounded-full text-xs font-display font-bold border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200/50 text-slate-600'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="px-6 py-6 space-y-4">
        {isLoading ? (
          <RewardSkeleton />
        ) : (
          filteredRewards.map((reward) => {
            const isAffordable = state.rewardBalance >= reward.pointsRequired;
            const CatIcon = getCategoryIcon(reward.category);

            return (
            <div
              key={reward.id}
              onClick={() => isAffordable && handleRedeemClick(reward)}
              className={`bg-[#F8F9FC] rounded-3xl border p-4.5 flex gap-4 shadow-xs transition-all relative overflow-hidden ${
                isAffordable 
                  ? 'border-gray-100 hover:shadow-md cursor-pointer group' 
                  : 'border-slate-100 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Image box */}
              <div className="h-20 w-20 rounded-2xl overflow-hidden bg-gray-250 flex-none relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                />
                <div className="absolute top-1 left-1 p-1 bg-black/60 rounded-lg text-white">
                  <CatIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Info area */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase font-bold">
                      {reward.provider}
                    </span>
                    {!isAffordable && (
                      <span className="text-[8px] bg-red-50 text-red-500 font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                        Points short
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-display font-black text-slate-900 mt-0.5 leading-snug line-clamp-1">
                    {reward.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans mt-1 line-clamp-2 leading-normal font-medium">
                    {reward.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100/50">
                  <span className="text-[9px] text-slate-400 font-sans uppercase font-bold tracking-wider">points cost</span>
                  <span className={`text-xs font-display font-black ${isAffordable ? 'text-primary' : 'text-slate-400'}`}>
                    {reward.pointsRequired} pts
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>

      {/* Redemption Confirmation Modal Dialog */}
      <AnimatePresence>
        {selectedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-100 shadow-xl relative overflow-hidden"
            >
              <h3 className="text-base font-display font-black text-slate-900 uppercase tracking-wider">Confirm Redemption</h3>
              <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed font-medium">
                Are you sure you want to spend <span className="font-black text-primary">{selectedReward.pointsRequired} points</span> to redeem:
                <span className="block font-black text-slate-900 mt-1">"{selectedReward.name}"</span>
              </p>

              {/* Point deduction breakdown */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-sans space-y-2 font-medium">
                <div className="flex justify-between text-slate-500">
                  <span>Current balance:</span>
                  <span className="font-bold">{state.rewardBalance} pts</span>
                </div>
                <div className="flex justify-between text-rose-500 font-bold">
                  <span>Redemption cost:</span>
                  <span>-{selectedReward.pointsRequired} pts</span>
                </div>
                <div className="w-full h-[1px] bg-slate-200/60 my-2" />
                <div className="flex justify-between text-slate-800 font-black">
                  <span>Remaining balance:</span>
                  <span>{state.rewardBalance - selectedReward.pointsRequired} pts</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedReward(null)}
                  disabled={isRedeeming}
                  className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-3xl font-display font-black text-xs uppercase tracking-wider border border-slate-200/50 cursor-pointer disabled:opacity-55"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedemption}
                  disabled={isRedeeming}
                  className="flex-1 py-3.5 bg-primary text-white rounded-3xl font-display font-black text-xs uppercase tracking-wider shadow-md shadow-primary/25 hover:bg-opacity-95 cursor-pointer disabled:opacity-55 flex items-center justify-center gap-1.5"
                >
                  {isRedeeming ? (
                    <>
                      <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <span>Redeem Now</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Redeemed History log at the bottom if any */}
      {state.redeemedHistory.length > 0 && (
        <div className="px-6 pb-6 pt-4 border-t border-slate-100">
          <h3 className="font-display font-black text-xs uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
            Active Redemption Coupons
          </h3>
          <div className="space-y-3">
            {state.redeemedHistory.map((item) => (
              <div key={item.id} className="bg-[#F8F9FC] border border-gray-100 rounded-3xl p-4.5 flex justify-between items-center shadow-xs">
                <div>
                  <h4 className="text-xs font-display font-black text-slate-900 leading-tight">{item.rewardName}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-slate-400 font-sans font-medium">{item.date}</span>
                    <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-black">
                      CODE: {item.couponCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block font-mono font-bold tracking-wider">DEDUCTION</span>
                  <span className="text-xs font-display font-black text-rose-500">-{item.pointsSpent} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
};
