import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSceneProps {
  onOpenMenu: () => void;
  onOpenReserve: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onOpenMenu, onOpenReserve }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll-linked camera mechanics: scrolling is the camera
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Layered parallax transformations
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const brandY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const ctaY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollToCraft = () => {
    const el = document.getElementById('craft');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="arrival"
      className="relative w-full h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#090503]"
    >
      {/* Background Depth Plane: Panoramic Environmental Still with Slow Parallax Camera */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
        initial={{ scale: 1.18, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2400&q=90"
          alt="Caffeine Aligarh Café Interior Environment"
          className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.15] saturate-[1.12]"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        {/* Film Bloom, Vignette, and Atmospheric Darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-[#090503]/45 to-[#090503]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090503]/85 via-transparent to-[#090503]/85" />
        <div className="absolute inset-0 ambient-glow-gold pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
      </motion.div>

      {/* Floating Spatial Atmosphere Layer */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4a574]/4 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c58b4b]/4 blur-[160px]" />
      </div>

      {/* Foreground Film Title & Narrative Typography */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-16 sm:pt-20"
      >
        {/* Step 1: Subtle Location & Heritage Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2.5 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#d4a574] font-medium mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574]" />
          <span>Square Tower · Marris Road · Begpur</span>
          <span className="text-[#d4a574]/40">•</span>
          <span>Aligarh</span>
        </motion.div>

        {/* Step 2: Monumental Brand Title — CAFFEINE ALIGARH */}
        <motion.div
          style={{ y: brandY }}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-2 select-none"
        >
          <h1
            id="hero-main-title"
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.16em] text-[#f6eee3] uppercase leading-[0.88] drop-shadow-2xl"
          >
            CAFFEINE
          </h1>
          <span className="block font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#d4a574] tracking-normal font-light">
            Aligarh
          </span>
        </motion.div>

        {/* Step 3: Evocative Sensory Statement */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-xl mx-auto space-y-2.5"
        >
          <p className="font-serif italic text-base sm:text-xl text-[#f6eee3] font-light leading-relaxed">
            “Where coffee, food, conversations and atmosphere meet.”
          </p>
          <p className="text-xs sm:text-sm text-[#9e8e80] font-light leading-relaxed tracking-wider max-w-md mx-auto">
            A slow sanctuary on Marris Road. Estate Arabica, artisan kitchen plates, and late-night hot chocolate cravings.
          </p>
        </motion.div>

        {/* Step 4: Primary & Secondary Actions */}
        <motion.div
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button
            id="hero-explore-menu-btn"
            onClick={onOpenMenu}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#d4a574] text-[#090503] text-xs font-bold uppercase tracking-[0.18em] shadow-xl shadow-[#d4a574]/20 hover:bg-[#e0b484] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Discover Menu</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-reserve-table-btn"
            onClick={onOpenReserve}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#d4a574]/50 hover:border-[#d4a574] text-[#f6eee3] hover:text-[#d4a574] hover:bg-[#d4a574]/10 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer"
          >
            Reserve Your Table
          </button>
        </motion.div>

        {/* Live Status Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.35 }}
          className="mt-8 flex items-center justify-center space-x-2.5 text-[11px] text-[#786b60]"
        >
          <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block animate-pulse" />
          <span className="text-[#b5a698]">Open Daily</span>
          <span className="text-[#55463b]">•</span>
          <span>10:00 AM to 12:00 AM Midnight</span>
          <span className="text-[#55463b]">•</span>
          <span className="text-[#d4a574]">4.8★ (520+ Reviews)</span>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Cue Indicator */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={scrollToCraft}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer focus:outline-none"
        aria-label="Scroll to discover the craft"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4a574]/80 group-hover:text-[#d4a574] font-medium mb-2 transition-colors">
          The Craft Awaits
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="text-[#d4a574]/70 group-hover:text-[#d4a574]"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      {/* Seamless Transition Overlay into Scene 02 (Zero Hard Border) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 scene-transition-bottom pointer-events-none z-10" />
    </section>
  );
};
