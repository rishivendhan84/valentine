import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import AmbientBackground from './components/AmbientBackground';
import CinematicEntry from './components/CinematicEntry';
import HeartAffirmation from './components/HeartAffirmation';
import MemoryGallery from './components/MemoryGallery';
import LoveTimeline from './components/LoveTimeline';
import FinalReveal from './components/FinalReveal';

// Stage constants
const STAGES = {
  ENTRY: 1,
  HEART: 2,
  MEMORY: 3,
  TIMELINE: 4,
  REVEAL: 5,
  CELEBRATION: 6,
};

function App() {
  const [currentStage, setCurrentStage] = useState(STAGES.ENTRY);

  const goToStage = useCallback((stage) => {
    setCurrentStage(stage);
  }, []);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-warm-beige">
      {/* Ambient background effects */}
      <AmbientBackground stage={currentStage} />

      {/* Stage components with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {currentStage === STAGES.ENTRY && (
          <CinematicEntry
            key="entry"
            onOpen={() => goToStage(STAGES.HEART)}
          />
        )}

        {currentStage === STAGES.HEART && (
          <HeartAffirmation
            key="heart"
            onComplete={() => goToStage(STAGES.MEMORY)}
          />
        )}

        {currentStage === STAGES.MEMORY && (
          <MemoryGallery
            key="memory"
            onComplete={() => goToStage(STAGES.TIMELINE)}
          />
        )}

        {currentStage === STAGES.TIMELINE && (
          <LoveTimeline
            key="timeline"
            onComplete={() => goToStage(STAGES.REVEAL)}
          />
        )}

        {currentStage === STAGES.REVEAL && (
          <FinalReveal
            key="reveal"
            onYes={() => goToStage(STAGES.CELEBRATION)}
          />
        )}

        {currentStage === STAGES.CELEBRATION && (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>
    </div>
  );
}

// Final celebration screen with particle effects
function Celebration() {
  // Pre-compute random values for floating hearts
  const floatingHearts = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      id: i,
      left: `${(i * 8.3 + 5) % 100}%`,
      top: `${(i * 7.7 + 10) % 100}%`,
      delay: `${(i * 0.4) % 5}s`,
      duration: `${6 + (i % 4)}s`,
      size: `${1 + (i % 3) * 0.5}rem`,
    })), []);

  return (
    <div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(216, 167, 177, 0.25) 0%, transparent 60%),
          linear-gradient(180deg, #5C3A42 0%, #4A2E2A 50%, #3D2424 100%)
        `
      }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float opacity-20"
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Pulsing glow */}
      <div
        className="absolute w-96 h-96 rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(216, 167, 177, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div
          className="text-6xl mb-8 animate-breathe"
          style={{ filter: 'drop-shadow(0 0 20px rgba(216, 167, 177, 0.5))' }}
        >
          💝
        </div>

        <h1
          className="heading-serif-italic mb-6"
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            color: '#F9E8E8',
            textShadow: '0 0 40px rgba(216, 167, 177, 0.4)',
          }}
        >
          Thank you for being mine.
        </h1>

        <p
          className="body-sans max-w-sm mx-auto"
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            color: 'rgba(237, 213, 217, 0.7)',
          }}
        >
          Here's to us, to every moment past and every moment yet to come.
        </p>

        <div
          className="mt-12 w-16 h-px mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, #D8A7B1, transparent)' }}
        />

        <p
          className="mt-6 heading-serif-italic"
          style={{
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            color: 'rgba(216, 167, 177, 0.6)',
          }}
        >
          Forever yours
        </p>
      </div>
    </div>
  );
}

export default App;
