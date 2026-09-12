import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ambientAudio } from '../utils/audio';

export const AtmosphereScene: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const toggleSound = () => {
    const active = ambientAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <section
      ref={containerRef}
      id="atmosphere"
      className="relative w-full min-h-[90vh] py-32 sm:py-44 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden flex items-center justify-center"
    >
      {/* Immersive Panoramic Atmospheric Still with Slow Parallax Camera */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2400&q=90"
          alt="Caffeine Aligarh Interior Atmosphere and Warm Lighting"
          className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.15]"
          referrerPolicy="no-referrer"
        />

        {/* Ambient Film Vignette & Seamless Scene Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-[#090503]/50 to-[#090503]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090503]/80 via-transparent to-[#090503]/80" />
        <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
      </motion.div>

      {/* Atmospheric Spatial Content — Floating Editorial Typography, No Feature Cards */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium mb-6"
        >
          <Sparkles size={12} />
          <span>Scene V · The Sanctuary</span>
        </motion.div>

        {/* Grand Headline Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f6eee3] font-normal leading-[1.1] max-w-4xl tracking-tight"
        >
          “Come for the coffee. Stay for the company.”
        </motion.h2>

        {/* Editorial Subtitle Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg text-[#b8aba0] font-light leading-relaxed max-w-2xl mt-8"
        >
          Amber incandescent bulbs, curated lo-fi jazz, natural timber tables, and the gentle hum of
          freshly steamed milk. Designed equally for quiet midnight study sessions, deep conversations,
          and unhurried dates. Open daily until midnight.
        </motion.p>

        {/* Tactile Audio Immersion Badge Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-12"
        >
          <button
            id="atmosphere-audio-toggle-btn"
            onClick={toggleSound}
            className={`px-8 py-3.5 rounded-full font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center space-x-3 cursor-pointer shadow-2xl ${
              isPlaying
                ? 'bg-[#140d08] border border-[#d4a574] text-[#d4a574] shadow-[#d4a574]/20'
                : 'bg-gradient-to-r from-[#d4a574] to-[#b8864e] text-[#090503] hover:scale-[1.03] active:scale-[0.98] shadow-[#d4a574]/25'
            }`}
          >
            {isPlaying ? (
              <>
                <VolumeX size={15} />
                <span>Mute Café Soundscape</span>
              </>
            ) : (
              <>
                <Volume2 size={15} />
                <span>Listen to the Room (Soundscape)</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Seamless Transition Overlays */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 scene-transition-bottom pointer-events-none" />
    </section>
  );
};
