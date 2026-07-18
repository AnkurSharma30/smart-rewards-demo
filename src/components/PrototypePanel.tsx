import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Stage } from '../types';
import { Cpu, RotateCcw, ChevronDown, ChevronUp, User, Eye, ShoppingCart, Award } from 'lucide-react';

export const PrototypePanel: React.FC = () => {
  const { state, setStage, resetPrototype } = useApp();
  const [isOpen, setIsOpen] = useState(true);

  const stagesList = [
    {
      key: Stage.NEW_USER,
      label: 'Stage 1: New User',
      icon: User,
      desc: '0 pts. Exploring stage where we are solving cold start problem.'
    },
    {
      key: Stage.BROWSING,
      label: 'Stage 2: Browsing',
      icon: Eye,
      desc: '2,500 pts. Customer has made some purchases and we have some behavioural history of user.'
    },
    {
      key: Stage.FIRST_PURCHASE,
      label: 'Stage 3: First Purchase',
      icon: ShoppingCart,
      desc: '8,500 pts. We will use ML insights to power personalization.'
    },
    {
      key: Stage.LOYAL_CUSTOMER,
      label: 'Stage 4: Loyal Customer',
      icon: Award,
      desc: '58,000 pts. Hyperpersonalization or 1-1 personalization stage.'
    }
  ];

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-white font-sans text-xs select-none">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
            SmartRewards Prototype Environment
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-block font-medium text-amber-400">
            Current: {state.stage}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              resetPrototype();
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors text-slate-300 font-medium"
            title="Reset simulation to Stage 1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset State
          </button>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-slate-950/80 grid grid-cols-1 sm:grid-cols-4 gap-3 border-t border-slate-900">
          {stagesList.map((stg) => {
            const Icon = stg.icon;
            const isActive = state.stage === stg.key;
            return (
              <button
                key={stg.key}
                onClick={() => setStage(stg.key)}
                className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between h-full group cursor-pointer ${
                  isActive 
                    ? 'bg-primary border-primary/40 text-white shadow-lg shadow-primary/15' 
                    : 'bg-slate-900/60 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className={`font-display font-semibold text-xs tracking-wide ${isActive ? 'text-white' : 'text-slate-100'}`}>
                      {stg.label}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-slate-300'}`} />
                  </div>
                  <p className={`mt-1 font-sans text-[11px] leading-relaxed ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {stg.desc}
                  </p>
                </div>
                {isActive && (
                  <span className="mt-2 text-[9px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
                    ACTIVE ENVIRONMENT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
