import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const revealLines = [
  "I don't just love you.",
  "I choose you.",
  "Every day.",
  "Again.",
];

const FinalReveal = ({ onYes }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [showPlayfulMessage, setShowPlayfulMessage] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [particles, setParticles] = useState([]);

  // Reveal lines sequentially
  useEffect(() => {
    if (currentLine < revealLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      // Show question after all lines
      const timer = setTimeout(() => {
        setShowQuestion(true);
        setTimeout(() => setShowButtons(true), 1000);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  // Handle No button - make it dodge
  const handleNoHover = useCallback(() => {
    const maxOffset = 150;
    const newX = (Math.random() - 0.5) * maxOffset * 2;
    const newY = (Math.random() - 0.5) * maxOffset * 2;
    setNoButtonOffset({ x: newX, y: newY });
    setShowPlayfulMessage(true);
    setTimeout(() => setShowPlayfulMessage(false), 1500);
  }, []);

  // Handle Yes - celebration!
  const handleYes = useCallback(() => {
    setAnswered(true);

    // Create celebration particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);

    setTimeout(onYes, 2500);
  }, [onYes]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(122, 78, 87, 0.3) 0%, transparent 60%),
          radial-gradient(ellipse at 30% 70%, rgba(92, 58, 66, 0.2) 0%, transparent 50%),
          linear-gradient(180deg, #5C3A42 0%, #4A2E2A 40%, #3D2424 100%)
        `
      }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(216, 167, 177, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Floating particles when answered */}
      <AnimatePresence>
        {answered && particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: '100vh',
              opacity: 0.8,
            }}
            animate={{
              y: '-20vh',
              opacity: 0,
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            className="fixed w-2 h-2 rounded-full pointer-events-none"
            style={{
              background: `rgba(216, 167, 177, ${0.4 + Math.random() * 0.4})`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Reveal lines container */}
      <div className="flex flex-col items-center justify-center min-h-[200px] mb-8">
        <AnimatePresence mode="wait">
          {!showQuestion && revealLines.slice(0, currentLine).map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="heading-serif-italic text-center mb-3"
              style={{
                fontSize: index === revealLines.length - 1
                  ? 'clamp(1.4rem, 5vw, 2rem)'
                  : 'clamp(1.1rem, 4vw, 1.6rem)',
                color: index === revealLines.length - 1 ? '#F9E8E8' : 'rgba(237, 213, 217, 0.9)',
                textShadow: '0 0 40px rgba(216, 167, 177, 0.3)',
              }}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>

        {/* The Big Question */}
        <AnimatePresence>
          {showQuestion && !answered && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="heading-serif text-center"
              style={{
                fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                color: '#F9E8E8',
                textShadow: '0 0 60px rgba(216, 167, 177, 0.4), 0 0 120px rgba(216, 167, 177, 0.2)',
              }}
            >
              Will you be my Valentine?
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Final message after Yes */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl mb-6"
              >
                💝
              </motion.div>
              <p
                className="heading-serif-italic"
                style={{
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  color: '#F9E8E8',
                  textShadow: '0 0 30px rgba(216, 167, 177, 0.3)',
                }}
              >
                You are my favorite chapter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <AnimatePresence>
        {showButtons && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-center relative"
          >
            {/* Yes Button with glow */}
            <div className="relative">
              <motion.div
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(216, 167, 177, 0.6), rgba(122, 78, 87, 0.4))',
                  transform: 'translateY(4px)',
                }}
              />
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-12 py-4 rounded-full font-medium text-warm-cocoa"
                style={{
                  background: 'linear-gradient(135deg, #E8B4BC 0%, #D8A7B1 50%, #C9949D 100%)',
                  boxShadow: '0 4px 30px rgba(216, 167, 177, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                Yes
              </motion.button>
            </div>

            {/* No Button - dodges on hover */}
            <motion.button
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              animate={{
                x: noButtonOffset.x,
                y: noButtonOffset.y,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="px-10 py-4 rounded-full font-medium"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(237, 213, 217, 0.3)',
                color: 'rgba(237, 213, 217, 0.7)',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                letterSpacing: '0.05em',
              }}
            >
              No
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playful message when No is hovered */}
      <AnimatePresence>
        {showPlayfulMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-24 heading-serif-italic text-soft-blush/70 text-sm"
          >
            Try again...
          </motion.p>
        )}
      </AnimatePresence>

      {/* Warm glow overlay when answered */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(216, 167, 177, 0.15) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default FinalReveal;
