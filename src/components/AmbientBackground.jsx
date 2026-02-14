import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AmbientBackground = ({ stage }) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Track mouse position for light follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = Math.min(30, Math.floor((width * height) / 40000));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Slow floating movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.phase += 0.01;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Pulsing opacity
        const pulseOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(particle.phase));

        // Draw particle with soft glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );

        // Color based on stage
        const isDark = stage === 5;
        const color = isDark ? '216, 167, 177' : '122, 78, 87';

        gradient.addColorStop(0, `rgba(${color}, ${pulseOpacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stage]);

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Mouse follow light effect */}
      <motion.div
        className="fixed pointer-events-none z-0"
        animate={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: stage === 5
            ? 'radial-gradient(circle, rgba(216, 167, 177, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(216, 167, 177, 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(74, 46, 42, 0.08) 100%)',
        }}
      />
    </>
  );
};

export default AmbientBackground;
