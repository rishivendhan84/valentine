import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

const HeartAffirmation = ({ onComplete }) => {
  const { instruction, unlockMessage, affirmations } = config.heartAffirmation;
  const [tapCount, setTapCount] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [ripples, setRipples] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleHeartTap = useCallback(() => {
    if (isUnlocked) return;

    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Show affirmation
    setCurrentAffirmation(affirmations[Math.min(newCount - 1, affirmations.length - 1)]);

    // Add ripple effect
    const rippleId = Date.now();
    setRipples(prev => [...prev, rippleId]);
    setTimeout(() => {
      setRipples(prev => prev.filter(id => id !== rippleId));
    }, 1000);

    // Check if complete
    if (newCount >= 5) {
      setTimeout(() => {
        setIsUnlocked(true);
        setTimeout(onComplete, 2000);
      }, 1500);
    }
  }, [tapCount, isUnlocked, onComplete]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(216, 167, 177, 0.2) 0%, transparent 60%),
          linear-gradient(180deg, #F6F1EB 0%, #FFF8F5 50%, #F9E8E8 100%)
        `
      }}
    >
      {/* Floating background orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[15%] w-40 h-40 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(216, 167, 177, 0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Instruction text */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="body-sans text-muted-wine/60 text-center mb-8"
        style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
      >
        {instruction}
      </motion.p>

      {/* Progress dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-2 mb-8"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i < tapCount ? 1 : 0.8,
              backgroundColor: i < tapCount ? '#D8A7B1' : 'rgba(216, 167, 177, 0.3)',
            }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </motion.div>

      {/* Affirmation text */}
      <div className="h-16 flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {currentAffirmation && (
            <motion.p
              key={currentAffirmation}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="heading-serif-italic text-warm-cocoa text-center"
              style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)' }}
            >
              {currentAffirmation}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Heart Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex items-center justify-center"
      >
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map(id => (
            <motion.div
              key={id}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(216, 167, 177, 0.4) 0%, transparent 70%)',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Glow behind heart */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(216, 167, 177, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* The Heart */}
        <motion.button
          onClick={handleHeartTap}
          whileTap={{ scale: 0.95 }}
          animate={isUnlocked ? {
            scale: [1, 1.1, 0],
            opacity: [1, 1, 0],
          } : {
            scale: [1, 1.05, 1],
          }}
          transition={isUnlocked ? {
            duration: 1.5,
            times: [0, 0.4, 1],
            ease: 'easeInOut',
          } : {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative cursor-pointer select-none focus:outline-none"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(122, 78, 87, 0.2))' }}
        >
          {/* Heart SVG - Premium 3D-style design */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8B4BC" />
                <stop offset="50%" stopColor="#D8A7B1" />
                <stop offset="100%" stopColor="#B8868F" />
              </linearGradient>
              <linearGradient id="heartShine" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feOffset in="blur" dx="2" dy="3" result="offsetBlur" />
                <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
              </filter>
            </defs>

            {/* Main heart shape */}
            <path
              d="M50 88C50 88 12 62 12 36C12 22 24 12 38 12C44 12 50 16 50 16C50 16 56 12 62 12C76 12 88 22 88 36C88 62 50 88 50 88Z"
              fill="url(#heartGradient)"
            />

            {/* Shine overlay */}
            <path
              d="M50 88C50 88 12 62 12 36C12 22 24 12 38 12C44 12 50 16 50 16C50 16 56 12 62 12C76 12 88 22 88 36C88 62 50 88 50 88Z"
              fill="url(#heartShine)"
              opacity="0.6"
            />

            {/* Inner highlight */}
            <ellipse
              cx="35"
              cy="32"
              rx="8"
              ry="6"
              fill="rgba(255,255,255,0.3)"
              transform="rotate(-20 35 32)"
            />
          </svg>

          {/* Crack effect when unlocked */}
          <AnimatePresence>
            {isUnlocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-1 h-24 origin-center"
                  style={{
                    background: 'linear-gradient(180deg, transparent, #FFF8F5, transparent)',
                    filter: 'blur(2px)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Unlock message */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 heading-serif-italic text-muted-wine"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}
          >
            {unlockMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default HeartAffirmation;
