import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, ArrowRightLeft, Send, Gift, ChevronRight, Bell, Percent, ShieldCheck, Landmark, PiggyBank } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Stage } from '../types';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { setStage } = useApp();

  const handleLaunchRewards = () => {
    // Immediately launch the SmartRewards ecosystem
    setStage(Stage.NEW_USER);
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-[#F8F9FC] flex flex-col justify-between font-sans text-slate-900 select-none overflow-x-hidden relative"
    >
      {/* Premium Ambient Lights */}
      <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[50%] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[40%] rounded-full bg-amber-400/5 blur-[90px] pointer-events-none" />

      {/* 1. BANKING HEADER */}
      <div className="px-6 pt-7 pb-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-md">
            <Landmark className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="font-display font-black text-xs tracking-wider text-slate-900 uppercase block">
              INFINIA PRIVATE
            </span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 block -mt-0.5">
              WEALTH PORTAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 relative cursor-pointer hover:bg-slate-50 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </div>
          <div className="px-3 py-1 bg-slate-100/80 rounded-full border border-slate-200/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span className="font-mono text-[8px] text-slate-600 font-extrabold tracking-wider uppercase">SECURED</span>
          </div>
        </div>
      </div>

      {/* 2. BANK ACCOUNTS & CARD */}
      <div className="flex-1 px-6 py-4 space-y-6 z-10 overflow-y-auto no-scrollbar">
        
        {/* Welcome message */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-black tracking-widest text-slate-400 uppercase">WELCOME BACK</span>
          <h1 className="text-2xl font-display font-black tracking-tight text-slate-900">
            Mohit Sharma
          </h1>
        </div>

        {/* Wealth Account balances */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                <Landmark className="w-3 h-3 text-slate-400" /> Infinia Savings
              </span>
              <span className="text-2xl font-display font-black tracking-tight text-slate-900 block mt-1">
                ₹4,28,500.00
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center justify-end gap-1">
                <PiggyBank className="w-3 h-3 text-slate-400" /> High-Yield Fixed Deposits
              </span>
              <span className="text-base font-display font-bold text-slate-800 block mt-1.5">
                ₹18,41,050.00
              </span>
            </div>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Total Liquid Assets</span>
            <span className="text-slate-900">₹22,69,550.00</span>
          </div>
        </div>

        {/* Premium Metallic Debit/Credit Card - Apple Wallet style */}
        <div className="space-y-3">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">ACTIVE CARDS</span>
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="w-full h-44 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-850 rounded-3xl p-6 shadow-xl border border-white/10 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient metallic sheen */}
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 rounded-full bg-[#5B3DF5]/15 blur-2xl pointer-events-none" />
            <div className="absolute left-[-5%] bottom-[-5%] w-24 h-24 rounded-full bg-amber-400/5 blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-start z-10">
              <div className="flex flex-col">
                <span className="text-[9px] text-amber-400 tracking-widest font-mono font-bold uppercase">INFINIA PRIVATE</span>
                <span className="text-white font-display font-black text-sm tracking-wide mt-0.5">METAL RESERVE</span>
              </div>
              <div className="w-8 h-6 bg-slate-800/40 rounded-md border border-slate-700/50 flex items-center justify-center">
                <div className="w-5 h-4 bg-amber-400/20 rounded-xs border border-amber-400/30" />
              </div>
            </div>

            <div className="z-10 flex justify-between items-end">
              <div>
                <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">CARDHOLDER</span>
                <span className="text-white text-xs font-display font-bold tracking-wider block mt-0.5">MOHIT SHARMA</span>
              </div>
              <span className="text-white font-mono text-xs tracking-wider">•••• 4882</span>
            </div>
          </motion.div>
        </div>

        {/* Payments & Transfers quick actions */}
        <div className="space-y-3">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">PAYMENTS & TRANSFERS</span>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Send Money', icon: Send },
              { label: 'Pay Bills', icon: CreditCard },
              { label: 'Transfer', icon: ArrowRightLeft },
              { label: 'Invest', icon: Landmark }
            ].map((act, i) => {
              const Icon = act.icon;
              return (
                <button
                  key={i}
                  className="bg-white rounded-2xl p-3 border border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-2xs group cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-xl bg-slate-50 text-slate-800 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all">
                    <Icon className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="text-[9px] font-sans font-black text-slate-700 text-center leading-tight">
                    {act.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlighted Rewards Portal Entry banner */}
        <div className="space-y-3 pt-1">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">LOYALTY BENEFITS</span>
          <motion.div
            whileHover={{ y: -2 }}
            onClick={handleLaunchRewards}
            className="relative w-full rounded-3xl p-5 bg-gradient-to-r from-[#5B3DF5] to-[#7C5DFF] text-white shadow-lg shadow-[#5B3DF5]/20 border border-white/10 flex items-center justify-between overflow-hidden cursor-pointer"
          >
            {/* Decorative white/purple transparent circles */}
            <div className="absolute right-[-10%] top-[-20%] w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none animate-pulse" />
            
            <div className="space-y-2.5 z-10 flex-1">
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
                <span className="font-mono text-[9px] text-amber-200 font-extrabold tracking-widest uppercase">SMARTREWARDS ACTIVATED</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-display font-black tracking-tight text-white">
                  Unlock Premium Marketplace
                </h3>
                <p className="text-[10px] text-slate-200 font-medium leading-relaxed max-w-[240px]">
                  Shop products, book luxury travel, and purchase retail gift cards to accumulate valuable reward points.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                <span className="text-[9px] font-mono font-black tracking-widest uppercase">LAUNCH PORTAL</span>
                <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-sm z-10">
              <Gift className="w-8 h-8 fill-amber-300/10 text-amber-300" />
            </div>
          </motion.div>
        </div>

      </div>

      {/* 3. SIMULATED BANKING TAB BAR */}
      <div className="bg-white border-t border-slate-100 h-20 flex justify-around items-center px-6 z-10 shadow-lg">
        {[
          { label: 'Accounts', icon: Landmark, active: true },
          { label: 'Cards', icon: CreditCard },
          { label: 'Payments', icon: ArrowRightLeft },
          { label: 'Offers', icon: Percent, isPortal: true },
          { label: 'Rewards', icon: Gift, isPortal: true }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                if (item.isPortal) {
                  handleLaunchRewards();
                }
              }}
              className={`flex flex-col items-center justify-center w-12 h-12 transition-all relative cursor-pointer ${
                item.active 
                  ? 'text-slate-900 opacity-100' 
                  : item.isPortal 
                    ? 'text-primary opacity-100 font-bold scale-102' 
                    : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item.isPortal && (
                <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
              <Icon className={`w-5 h-5 ${item.isPortal ? 'text-[#5B3DF5] stroke-[2.5]' : 'stroke-[2]'}`} />
              <span className={`text-[8.5px] font-display font-black mt-1 tracking-wider uppercase ${
                item.isPortal ? 'text-[#5B3DF5]' : ''
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
