import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, Sparkles, TrendingUp, TrendingDown, Clock, HelpCircle, 
  ChevronRight, Calendar, QrCode, Laptop, Plane, Gift, Percent
} from 'lucide-react';

export const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { rewardBalance, tier, purchaseHistory, redeemedHistory } = state;

  // Calculate total points earned & spent
  const totalEarned = purchaseHistory.reduce((sum, item) => sum + item.pointsEarned, 0);
  const totalRedeemed = redeemedHistory.reduce((sum, item) => sum + item.pointsSpent, 0);

  // Combine and sort transactions by date or ID
  const allTransactions = [
    ...purchaseHistory.map(item => ({
      id: item.id,
      title: item.productName,
      type: 'earn' as const,
      points: item.pointsEarned,
      date: item.date,
      category: 'Shopping'
    })),
    ...redeemedHistory.map(item => ({
      id: item.id,
      title: item.rewardName,
      type: 'redeem' as const,
      points: item.pointsSpent,
      date: item.date,
      category: 'Rewards'
    }))
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen bg-slate-950 text-white pb-12 font-sans select-none relative"
    >
      {/* Upper ambient glow to mimic premium Apple Wallet styling */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-[#5B3DF5]/15 to-transparent pointer-events-none" />

      {/* 1. Header */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-center relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex flex-col items-center">
          <span className="font-display font-black text-xs tracking-widest uppercase text-slate-350">
            SmartRewards Pass
          </span>
          <span className="text-[7.5px] text-indigo-400 font-mono tracking-widest uppercase mt-0.5 font-bold">
            POWERED BY REWARDSTACC
          </span>
        </div>
        <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 transition-colors cursor-pointer">
          <HelpCircle className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* 2. Apple Wallet Pass Container */}
      <div className="px-6 py-4 space-y-6 relative z-10">
        
        {/* Pass card layout */}
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative w-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-[32px] border border-white/10 p-6 shadow-2xl overflow-hidden flex flex-col justify-between h-[390px]"
        >
          {/* Card background glowing lines */}
          <div className="absolute right-[-20%] top-[-10%] w-64 h-64 rounded-full bg-[#5B3DF5]/10 blur-3xl pointer-events-none animate-pulse" />
          
          {/* Header Row */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#5B3DF5] to-[#7C5DFF] flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-black text-xs tracking-widest uppercase text-white">SmartRewards</span>
            </div>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="font-mono text-[9px] text-slate-300 font-extrabold tracking-widest uppercase">
                {tier === 'Gold Member' ? 'GOLD EXCLUSIVE' : 'STANDARD TIER'}
              </span>
            </div>
          </div>

          {/* Central Stats */}
          <div className="py-6 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">TOTAL REWARD BALANCE</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white">
                  {rewardBalance.toLocaleString()}
                </span>
                <span className="text-xs text-primary font-black uppercase tracking-wider">PTS</span>
              </div>
            </div>

            {/* Micro Badge for Status Tier */}
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-slate-500 font-mono tracking-widest uppercase font-bold">LEVEL</span>
              <span className={`text-xs font-display font-black tracking-widest mt-0.5 uppercase ${tier === 'Gold Member' ? 'text-amber-400' : 'text-slate-300'}`}>
                {tier}
              </span>
            </div>
          </div>

          {/* Substats Details */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 py-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block uppercase text-[8px] tracking-wider font-extrabold">POINTS ACCUMULATED</span>
              <span className="text-white text-sm font-black flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                +{totalEarned || 0}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[8px] tracking-wider font-extrabold">POINTS REDEEMED</span>
              <span className="text-white text-sm font-black flex items-center gap-1 mt-0.5">
                <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                -{totalRedeemed || 0}
              </span>
            </div>
          </div>

          {/* Pass Barcode / NFC representation at bottom */}
          <div className="border-t border-white/5 pt-4 flex flex-col items-center gap-2">
            <div className="h-10 bg-white/10 rounded-lg w-3/4 relative overflow-hidden flex items-center justify-center opacity-70">
              {/* Fake Barcode Lines */}
              <div className="absolute inset-y-0 inset-x-2 flex justify-between">
                {[2, 4, 1, 3, 2, 4, 1, 2, 3, 4, 1, 3, 2, 4, 1, 2, 3, 4, 1, 3, 2].map((w, i) => (
                  <div key={i} className="bg-white h-full" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
            <span className="text-[8px] text-slate-500 tracking-widest font-mono">PASS-ID: SRW-293-8842-184</span>
          </div>
        </motion.div>

        {/* 3. Upcoming Expiry Notice */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 flex items-start gap-4">
          <div className="h-10 w-10 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center flex-none">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-amber-400 font-extrabold tracking-widest uppercase">UPCOMING EXPIRY</span>
            <h4 className="text-xs font-display font-black text-slate-100 mt-0.5 leading-snug">
              250 Points Expiring in 45 Days
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-medium">
              Maintain active account transactions or redeem your balance for travel / vouchers before December 31st to avoid point expiration.
            </p>
          </div>
        </div>

        {/* 4. Ways To Earn More */}
        <div className="space-y-3">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">WAYS TO ACCUMULATE POINTS</span>
          <div className="space-y-3">
            {[
              { title: 'Shop Premium Electronics', desc: 'Earn 3x points per dollar spent on flagship devices', multiplier: '3X PTS', icon: Laptop, route: '/explore?category=Electronics' },
              { title: 'Book Luxury Travel Flights & Hotels', desc: 'Earn 5x points on curated flight and suite bookings', multiplier: '5X PTS', icon: Plane, route: '/explore?category=Travel' },
              { title: 'Purchase Digital Gift Cards', desc: 'Instantly earn up to 8% back in raw reward points', multiplier: '8% BACK', icon: Gift, route: '/explore?category=Gift Cards' },
              { title: 'Invite Partners & Refer Friends', desc: 'Bonus 500 points when friends activate their pass', multiplier: '+500 PTS', icon: Percent, route: '#' }
            ].map((way, i) => {
              const Icon = way.icon;
              return (
                <div
                  key={i}
                  onClick={() => way.route !== '#' && navigate(way.route)}
                  className="bg-white/5 hover:bg-white/80 hover:text-slate-900 border border-white/10 hover:border-transparent rounded-3xl p-4.5 flex justify-between items-center gap-4 transition-all cursor-pointer group"
                >
                  <div className="flex gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-none text-white group-hover:bg-slate-100 group-hover:text-slate-900 group-hover:border-slate-200 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-display font-black leading-tight text-white group-hover:text-slate-900 transition-colors">
                        {way.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors leading-relaxed font-medium">
                        {way.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex-none text-right">
                    <span className="px-2.5 py-1 rounded-xl bg-primary text-white text-[9px] font-mono font-black tracking-wider uppercase shadow-md shadow-primary/20">
                      {way.multiplier}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Transaction History */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">TRANSACTION LOG</span>
            <span className="text-[9px] text-slate-500 font-mono tracking-wider font-bold">SECURED</span>
          </div>

          <div className="space-y-2.5">
            {allTransactions.length > 0 ? (
              allTransactions.map((tx, i) => (
                <div
                  key={tx.id || i}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center gap-4"
                >
                  <div className="flex gap-3.5 items-center min-w-0">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-none border ${
                      tx.type === 'earn' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      {tx.type === 'earn' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-display font-black text-slate-100 truncate">
                        {tx.title}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-3 h-3" /> {tx.date} • {tx.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex-none text-right">
                    <span className={`font-mono text-xs font-black block ${tx.type === 'earn' ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {tx.type === 'earn' ? '+' : '-'}{tx.points}
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono block">PTS</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-xs text-slate-500 font-medium font-sans">No point activity on record.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
