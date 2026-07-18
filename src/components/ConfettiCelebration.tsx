import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimatedCounter } from './AnimatedCounter';

export const ConfettiCelebration: React.FC = () => {
  const { celebrationActive, setCelebrationActive, lastPointsChange } = useApp();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; delay: number; rot: number }>>([]);

  useEffect(() => {
    if (celebrationActive) {
      // Generate some nice premium metallic confetti particles
      const colors = ['#5B3DF5', '#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];
      const newParticles = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        y: -10 - Math.random() * 20, // start above
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6,
        delay: Math.random() * 0.4,
        rot: Math.random() * 360
      }));
      setParticles(newParticles);

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        setCelebrationActive(false);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [celebrationActive, setCelebrationActive]);

  if (!celebrationActive) return null;

  const isEarning = lastPointsChange ? lastPointsChange.to > lastPointsChange.from : true;
  const pointsDelta = lastPointsChange ? Math.abs(lastPointsChange.to - lastPointsChange.from) : 125;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        {/* Confetti particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: `${p.y}vh`, x: `${p.x}vw`, rotate: p.rot, opacity: 1 }}
              animate={{
                y: '110vh',
                x: `${p.x + (Math.random() * 15 - 7.5)}vw`,
                rotate: p.rot + 360,
                opacity: [1, 1, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: p.delay,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px'
              }}
            />
          ))}
        </div>

        {/* Success Card */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-sm overflow-hidden bg-white rounded-3xl shadow-2xl border border-gray-100"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-amber-400 to-indigo-600" />

          <div className="p-8 text-center flex flex-col items-center">
            {/* Animated Ring icon */}
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`p-4 rounded-full ${
                  isEarning ? 'bg-amber-50 text-amber-500' : 'bg-primary/5 text-primary'
                }`}
              >
                {isEarning ? (
                  <Award className="w-12 h-12" />
                ) : (
                  <CheckCircle2 className="w-12 h-12" />
                )}
              </motion.div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-dashed border-amber-300 rounded-full scale-125 opacity-40 pointer-events-none"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-display font-bold text-gray-900"
            >
              {isEarning ? 'Unlock Success!' : 'Redemption Confirmed'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-sm text-gray-500 font-sans"
            >
              {isEarning 
                ? 'Your premium rewards membership balance has been credited' 
                : 'Your premium voucher has been generated successfully!'}
            </motion.p>

            {/* Points showcase */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="my-6 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100/80 flex flex-col items-center"
            >
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                {isEarning ? 'POINTS EARNED' : 'POINTS REDEEMED'}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-4xl font-display font-black ${isEarning ? 'text-amber-500' : 'text-primary'}`}>
                  {isEarning ? '+' : '-'}
                  <AnimatedCounter value={pointsDelta} />
                </span>
                <Sparkles className={`w-5 h-5 ${isEarning ? 'text-amber-400' : 'text-primary/70'} animate-pulse`} />
              </div>

              <div className="w-full h-[1px] bg-gray-200/60 my-2.5" />

              <span className="text-xs text-gray-400 font-sans">
                New Balance:{' '}
                <span className="font-semibold text-gray-700">
                  <AnimatedCounter value={lastPointsChange?.to ?? 0} /> pts
                </span>
              </span>
            </motion.div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setCelebrationActive(false)}
              className="w-full py-4 text-sm font-display font-semibold text-white bg-primary rounded-2xl hover:bg-opacity-95 shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
