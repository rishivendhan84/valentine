import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

const { memories } = config.memoryGallery;

const MemoryCard = ({ memory, index, isRevealed, onReveal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!isRevealed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  }, [isRevealed]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  }, []);

  // Asymmetric grid positions
  const gridPositions = [
    'col-span-1 row-span-1',
    'col-span-1 row-span-1 md:col-start-2 md:row-start-1',
    'col-span-1 row-span-1 md:col-start-1 md:row-start-2',
    'col-span-1 row-span-1 md:col-start-2 md:row-start-2',
  ];

  const sizes = [
    'aspect-[3/4]',
    'aspect-square',
    'aspect-[4/3]',
    'aspect-[3/4]',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 + 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`relative ${gridPositions[index]} ${sizes[index]} cursor-pointer`}
      onClick={() => !isRevealed && onReveal(memory.id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-soft">
        {/* Hidden image for load detection */}
        <img
          src={memory.image}
          alt=""
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />

        {/* Image or Placeholder */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: imageLoaded && !imageError ? `url(${memory.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            background: !imageLoaded || imageError
              ? `linear-gradient(135deg, #EDD5D9 0%, #D8A7B1 50%, #C9949D 100%)`
              : undefined,
          }}
          animate={{
            filter: isRevealed ? 'blur(0px) grayscale(0)' : 'blur(12px) grayscale(0.8)',
          }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Placeholder content when no image */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-40">💕</span>
            </div>
          )}
        </motion.div>

        {/* Overlay gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isRevealed ? 0.3 : 0.7,
          }}
          transition={{ duration: 0.8 }}
          style={{
            background: isRevealed
              ? 'linear-gradient(180deg, transparent 50%, rgba(74, 46, 42, 0.4) 100%)'
              : 'linear-gradient(135deg, rgba(216, 167, 177, 0.6), rgba(122, 78, 87, 0.5))',
          }}
        />

        {/* Tap hint */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-full glass flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-muted-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caption */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 p-4"
            >
              <p className="heading-serif-italic text-pearl-glow text-sm md:text-base drop-shadow-lg">
                {memory.caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover glow */}
        {isRevealed && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 248, 245, 0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

const MemoryGallery = ({ onComplete }) => {
  const { heading, subtitle, completionMessage } = config.memoryGallery;
  const [revealedIds, setRevealedIds] = useState([]);

  const handleReveal = useCallback((id) => {
    setRevealedIds(prev => {
      const newIds = [...prev, id];
      if (newIds.length === memories.length) {
        setTimeout(onComplete, 1500);
      }
      return newIds;
    });
  }, [onComplete]);

  const progress = revealedIds.length / memories.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-4 py-8"
      style={{
        background: `
          radial-gradient(ellipse at 20% 80%, rgba(216, 167, 177, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(122, 78, 87, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #FFF8F5 0%, #F6F1EB 50%, #F9E8E8 100%)
        `
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2
          className="heading-serif text-warm-cocoa mb-2"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}
        >
          {heading}
        </h2>
        <p className="body-sans text-muted-wine/60 text-sm">
          {subtitle}
        </p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-48 h-1 rounded-full mb-8 overflow-hidden"
        style={{ background: 'rgba(216, 167, 177, 0.2)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #D8A7B1, #7A4E57)' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg w-full">
        {memories.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={index}
            isRevealed={revealedIds.includes(memory.id)}
            onReveal={handleReveal}
          />
        ))}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {revealedIds.length === memories.length && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 heading-serif-italic text-muted-wine text-center"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}
          >
            {completionMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default MemoryGallery;
