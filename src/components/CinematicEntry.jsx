import { motion } from 'framer-motion';

const CinematicEntry = ({ onOpen }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(216, 167, 177, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(122, 78, 87, 0.1) 0%, transparent 50%),
          linear-gradient(165deg, #F6F1EB 0%, #FFF8F5 40%, #F9E8E8 70%, #F6F1EB 100%)
        `
      }}
    >
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(216, 167, 177, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[20%] right-[5%] w-80 h-80 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(122, 78, 87, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[60%] left-[60%] w-48 h-48 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(255, 248, 245, 0.8) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(246, 241, 235, 0.4) 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Subtle decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-16 h-px mb-12 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, #D8A7B1, transparent)' }}
        />

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="heading-serif-italic text-warm-cocoa mb-6"
          style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)' }}
        >
          I made something for you.
        </motion.h1>

        {/* Subtle subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="body-sans text-muted-wine/70 mb-16 max-w-xs"
          style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)' }}
        >
          Something small, but from the heart.
        </motion.p>

        {/* CTA Button with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative"
        >
          {/* Button glow */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(216, 167, 177, 0.5), rgba(122, 78, 87, 0.3))',
              transform: 'translateY(4px)',
            }}
          />

          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary relative"
          >
            Open it
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(180deg, #D8A7B1, transparent)' }}
        />
      </motion.div>
    </motion.section>
  );
};

export default CinematicEntry;
