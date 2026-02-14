import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

const { notes } = config.loveNotes;

const envelopeColors = [
  { bg: 'linear-gradient(135deg, #E8B4BC 0%, #D8A7B1 100%)', flap: '#C9949D', inner: '#FFF8F5' },
  { bg: 'linear-gradient(135deg, #D8A7B1 0%, #C9949D 100%)', flap: '#B8848D', inner: '#FFF5F0' },
  { bg: 'linear-gradient(135deg, #EDD5D9 0%, #E8B4BC 100%)', flap: '#D8A7B1', inner: '#FFFAF8' },
  { bg: 'linear-gradient(135deg, #C9949D 0%, #B8848D 100%)', flap: '#A8747D', inner: '#FFF8F5' },
  { bg: 'linear-gradient(135deg, #E0C0C6 0%, #D0A0A8 100%)', flap: '#C09098', inner: '#FFF6F3' },
  { bg: 'linear-gradient(135deg, #D5B0B8 0%, #C5909A 100%)', flap: '#B58088', inner: '#FFF8F5' },
];

const NoteCard = ({ note, index, isOpened, onOpen }) => {
  const colors = envelopeColors[index % envelopeColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 + 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="relative cursor-pointer"
      onClick={() => !isOpened && onOpen(note.id)}
    >
      <motion.div
        className="relative w-full rounded-2xl overflow-visible shadow-soft"
        animate={isOpened ? { scale: 1.02 } : { scale: 1 }}
        whileHover={!isOpened ? { scale: 1.04, y: -4 } : {}}
        whileTap={!isOpened ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ perspective: '800px' }}
      >
        {/* Envelope body */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            background: colors.bg,
            minHeight: isOpened ? 'auto' : '120px',
          }}
        >
          {/* Envelope flap (triangle) */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-10"
            style={{ transformOrigin: 'top center' }}
            animate={{
              rotateX: isOpened ? 180 : 0,
              zIndex: isOpened ? 0 : 10,
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <svg viewBox="0 0 200 60" className="w-full block" preserveAspectRatio="none">
              <polygon
                points="0,0 200,0 100,60"
                fill={colors.flap}
              />
            </svg>
            {/* Seal */}
            <AnimatePresence>
              {!isOpened && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                  style={{ bottom: '-8px' }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #7A4E57, #5C3A42)',
                      border: '2px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <span className="text-xs">💌</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Inner content (the note) */}
          <AnimatePresence>
            {isOpened ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative z-5 mx-3 mb-3 rounded-xl p-5"
                style={{
                  background: colors.inner,
                  marginTop: '28px',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {/* Decorative top line */}
                <div
                  className="w-8 h-px mx-auto mb-4"
                  style={{ background: 'linear-gradient(90deg, transparent, #D8A7B1, transparent)' }}
                />

                <p
                  className="heading-serif-italic text-center text-warm-cocoa"
                  style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', lineHeight: 1.6 }}
                >
                  {note.message}
                </p>

                {/* Decorative bottom line */}
                <div
                  className="w-8 h-px mx-auto mt-4"
                  style={{ background: 'linear-gradient(90deg, transparent, #D8A7B1, transparent)' }}
                />
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center justify-center py-10 pt-16"
                exit={{ opacity: 0 }}
              >
                <motion.p
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="body-sans text-white/70 text-xs tracking-wider uppercase"
                >
                  Tap to open
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LoveNotes = ({ onComplete }) => {
  const { heading, subtitle, completionMessage } = config.loveNotes;
  const [openedIds, setOpenedIds] = useState([]);

  const handleOpen = useCallback((id) => {
    setOpenedIds(prev => {
      const newIds = [...prev, id];
      if (newIds.length === notes.length) {
        setTimeout(onComplete, 2000);
      }
      return newIds;
    });
  }, [onComplete]);

  const progress = openedIds.length / notes.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-10 flex flex-col items-center overflow-y-auto px-4 py-8"
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
        className="text-center mb-4 pt-4 flex-shrink-0"
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
        className="w-48 h-1 rounded-full mb-6 overflow-hidden flex-shrink-0"
        style={{ background: 'rgba(216, 167, 177, 0.2)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #D8A7B1, #7A4E57)' }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

      {/* Notes Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg w-full flex-shrink-0">
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            index={index}
            isOpened={openedIds.includes(note.id)}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {openedIds.length === notes.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-center flex-shrink-0"
          >
            <div className="text-3xl mb-3">💕</div>
            <p
              className="heading-serif-italic text-muted-wine"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}
            >
              {completionMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default LoveNotes;
