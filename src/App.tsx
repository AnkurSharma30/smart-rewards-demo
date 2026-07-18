/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PrototypePanel } from './components/PrototypePanel';
import { ConfettiCelebration } from './components/ConfettiCelebration';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { ProductDetails } from './pages/ProductDetails';
import { Rewards } from './pages/Rewards';
import { Profile } from './pages/Profile';
import { Wallet } from './pages/Wallet';
import { Home as HomeIcon, Compass, Gift, User, Zap } from 'lucide-react';

// Navigation layout helper
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Do not show bottom navigation bar on Welcome screen
  const showNav = currentPath !== '/';

  const navItems = [
    { path: '/home', label: 'Home', icon: HomeIcon },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/rewards', label: 'Rewards', icon: Gift },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between relative min-h-screen">
      {/* Top Core Banking Redirection Bar */}
      {showNav && (
        <div className="bg-slate-950 text-white py-2 px-4 flex justify-between items-center text-xs border-b border-white/10 z-50 flex-none">
          <div className="flex items-center gap-1.5 opacity-80">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[8.5px] tracking-wider uppercase">INFINIA SECURE CORE</span>
          </div>
          <Link
            to="/"
            className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-[9px] font-display font-black tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 hover:border-white/20 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>← Go to Bank Portal</span>
          </Link>
        </div>
      )}

      {/* Main Screen Scroll Area */}
      <div className={`flex-1 overflow-y-auto no-scrollbar ${showNav ? 'pb-24' : 'pb-6'}`}>
        {children}
      </div>

      {/* Floating/Absolute Bottom Tab Bar */}
      {showNav && (
        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-slate-100 h-20 flex justify-around items-center px-6 z-40 transition-all shadow-lg rounded-b-[36px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check if active (handle highlight)
            const isActive = currentPath === item.path || (item.path === '/explore' && currentPath.startsWith('/product'));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center w-14 h-12 group cursor-pointer transition-all ${
                  isActive ? 'opacity-100 scale-102' : 'opacity-40 hover:opacity-75'
                }`}
              >
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute top-[-2px] w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                
                <Icon className={`w-5 h-5 transition-transform duration-200 group-active:scale-90 ${
                  isActive ? 'text-primary stroke-[2.5]' : 'text-slate-900 stroke-[2]'
                }`} />
                <span className={`text-[10px] font-display font-black mt-1 tracking-wider uppercase ${
                  isActive ? 'text-primary' : 'text-slate-900 font-bold'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        {/* Mobile simulator viewport wrapper for wide screens */}
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-start sm:py-6">
          
          {/* Main App Container */}
          <div className="w-full max-w-md min-h-screen sm:min-h-[812px] sm:h-[812px] bg-brand-bg relative sm:rounded-[48px] shadow-[0_32px_64px_rgba(0,0,0,0.08)] border-[12px] border-white flex flex-col justify-between overflow-hidden">
            
            {/* Simulation Dev Controls */}
            <PrototypePanel />

            <Layout>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wallet" element={<Wallet />} />
              </Routes>
            </Layout>

            {/* Premium Full-Screen Celebrations Overlay */}
            <ConfettiCelebration />

          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

