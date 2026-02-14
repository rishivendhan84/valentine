import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const timelineEvents = [
  {
    id: 1,
    title: "The Beginning",
    text: "When our story started to unfold...",
    date: "Day One",
  },
  {
    id: 2,
    title: "First Butterflies",
    text: "That moment I knew you were special.",
    date: "Soon After",
  },
  {
    id: 3,
    title: "Growing Closer",
    text: "Every conversation made me fall harder.",
    date: "With Time",
  },
  {
    id: 4,
    title: "The Realization",
    text: "I couldn't imagine life without you.",
    date: "One Day",
  },
  {
    id: 5,
    title: "Now",
    text: "And here we are, still choosing each other.",
    date: "Today",
  },
];

const TimelineEvent = ({ event, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      className="flex-shrink-0 w-72 md:w-80 px-4"
    >
      <motion.button
        onClick={() => onClick(event.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-6 rounded-2xl transition-all duration-500 ${
          isActive
            ? 'glass shadow-elevated'
            : 'bg-transparent hover:bg-pearl-glow/30'
        }`}
        style={{
          border: isActive ? '1px solid rgba(216, 167, 177, 0.3)' : '1px solid transparent',
        }}
      >
        {/* Date badge */}
        <motion.span
          animate={{
            color: isActive ? '#7A4E57' : 'rgba(122, 78, 87, 0.5)',
          }}
          className="body-sans text-xs uppercase tracking-widest"
        >
          {event.date}
        </motion.span>

        {/* Title */}
        <motion.h3
          animate={{
            color: isActive ? '#4A2E2A' : 'rgba(74, 46, 42, 0.6)',
          }}
          className="heading-serif text-xl md:text-2xl mt-3 mb-3"
        >
          {event.title}
        </motion.h3>

        {/* Animated underline */}
        <motion.div
          animate={{
            width: isActive ? '3rem' : '1.5rem',
            backgroundColor: isActive ? '#D8A7B1' : 'rgba(216, 167, 177, 0.4)',
          }}
          transition={{ duration: 0.4 }}
          className="h-0.5 rounded-full mb-4"
        />

        {/* Text - only visible when active */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="heading-serif-italic text-muted-wine/80 text-base"
            >
              {event.text}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

const LoveTimeline = ({ onComplete }) => {
  const [activeId, setActiveId] = useState(1);
  const [viewedIds, setViewedIds] = useState([1]);
  const scrollContainerRef = useRef(null);

  const handleEventClick = (id) => {
    setActiveId(id);
    if (!viewedIds.includes(id)) {
      const newViewedIds = [...viewedIds, id];
      setViewedIds(newViewedIds);

      // Check if all events have been viewed
      if (newViewedIds.length === timelineEvents.length) {
        setTimeout(onComplete, 2000);
      }
    }
  };

  // Scroll to active event
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeElement = container.children[activeId - 1];
      if (activeElement) {
        const containerWidth = container.offsetWidth;
        const elementLeft = activeElement.offsetLeft;
        const elementWidth = activeElement.offsetWidth;
        const scrollTo = elementLeft - (containerWidth / 2) + (elementWidth / 2);
        container.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    }
  }, [activeId]);

  const progress = viewedIds.length / timelineEvents.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 70%, rgba(216, 167, 177, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 30%, rgba(122, 78, 87, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, #F6F1EB 0%, #FFF8F5 50%, #F6F1EB 100%)
        `
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-6 px-6"
      >
        <h2
          className="heading-serif text-warm-cocoa mb-2"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}
        >
          Our story
        </h2>
        <p className="body-sans text-muted-wine/60 text-sm">
          Swipe through our journey
        </p>
      </motion.div>

      {/* Timeline dots indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3 mb-8"
      >
        {timelineEvents.map((event, i) => (
          <motion.button
            key={event.id}
            onClick={() => handleEventClick(event.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-1"
          >
            <motion.div
              animate={{
                scale: activeId === event.id ? 1 : 0.7,
                backgroundColor: viewedIds.includes(event.id)
                  ? activeId === event.id ? '#7A4E57' : '#D8A7B1'
                  : 'rgba(216, 167, 177, 0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="w-2.5 h-2.5 rounded-full"
            />
            {activeId === event.id && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(216, 167, 177, 0.4) 0%, transparent 70%)',
                  transform: 'scale(2)',
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Horizontal scroll container */}
      <div className="w-full max-w-4xl overflow-hidden">
        <motion.div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Leading spacer */}
          <div className="flex-shrink-0 w-8 md:w-20" />

          {timelineEvents.map((event, index) => (
            <div key={event.id} className="snap-center">
              <TimelineEvent
                event={event}
                index={index}
                isActive={activeId === event.id}
                onClick={handleEventClick}
              />
            </div>
          ))}

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-8 md:w-20" />
        </motion.div>
      </div>

      {/* Swipe hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 mt-6"
      >
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-muted-wine/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </motion.div>
        <span className="body-sans text-muted-wine/50 text-xs">Swipe or tap</span>
        <motion.div
          animate={{ x: [5, -5, 5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-muted-wine/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-32 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(216, 167, 177, 0.2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #D8A7B1, #7A4E57)' }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Completion message */}
      <AnimatePresence>
        {viewedIds.length === timelineEvents.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-16 text-center"
          >
            <p className="heading-serif-italic text-muted-wine" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              And the best chapters are yet to come...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default LoveTimeline;
