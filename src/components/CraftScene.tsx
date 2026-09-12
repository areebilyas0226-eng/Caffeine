import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { CRAFT_STEPS } from '../data/menuData';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export const CraftScene: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const current = CRAFT_STEPS[activeStep];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="craft"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden"
    >
      {/* Seamless Ambient Atmosphere Blends */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute top-1/3 left-1/10 w-[600px] h-[600px] rounded-full bg-[#d4a574]/4 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-[#c58b4b]/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Prologue */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium mb-4"
          >
            <Sparkles size={12} />
            <span>Scene II · The Making of a Moment</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.08em] text-[#f6eee3] uppercase leading-none"
          >
            THE CRAFT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif italic text-xl sm:text-2xl text-[#d4a574] mt-4 font-light max-w-xl"
          >
            Carefully sourced. Precisely extracted. Made to slow the world down.
          </motion.p>
        </div>

        {/* Spatial Stage Architecture — Expansive Macro Visual + Editorial Subtitles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Main Visual Dominant Frame */}
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ scale: imgScale }}
              className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-[#120c08] will-change-transform"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.12]"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Ambient Filmic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-[#090503]/20 pointer-events-none" />
              <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

              {/* In-Frame Cinematic Chapter Marker */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#f6eee3]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#d4a574] block">
                    Discipline {current.number} of 05
                  </span>
                  <span className="font-serif italic text-lg sm:text-xl text-[#f6eee3] font-light mt-0.5 block">
                    {current.subtitle}
                  </span>
                </div>
                <div className="text-right font-display text-2xl sm:text-3xl text-[#d4a574]/60 font-bold">
                  {current.number}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Editorial Narrative Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#d4a574] font-medium block">
                Stage {current.number} · {current.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#f6eee3] font-bold leading-tight">
                {current.title}
              </h3>
              <p className="text-base sm:text-lg text-[#b8aba0] font-light leading-relaxed pt-2">
                {current.description}
              </p>
            </div>

            {/* Barista Subtitle */}
            <div className="relative pl-5 border-l-2 border-[#d4a574]/40 space-y-1 py-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4a574] font-semibold block">
                The Barista's Discipline
              </span>
              <p className="font-serif italic text-sm text-[#e0d6cb] leading-relaxed">
                “{current.detail}”
              </p>
            </div>

            {/* Tactile Chapter Selector & Controls */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-2">
                {CRAFT_STEPS.map((step, idx) => (
                  <button
                    key={step.number}
                    id={`craft-scrub-${idx}`}
                    onClick={() => setActiveStep(idx)}
                    className={`group relative py-2 flex-1 text-left focus:outline-none transition-all`}
                  >
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        activeStep === idx
                          ? 'bg-[#d4a574]'
                          : 'bg-[#261a12] group-hover:bg-[#d4a574]/40'
                      }`}
                    />
                    <span
                      className={`block text-[10px] font-mono mt-2 transition-colors ${
                        activeStep === idx ? 'text-[#d4a574] font-bold' : 'text-[#64564b]'
                      }`}
                    >
                      {step.number}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-[#9e8e80] pt-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center space-x-1.5 hover:text-[#d4a574] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                <span className="font-mono text-[11px] text-[#786b60]">
                  {activeStep + 1} / {CRAFT_STEPS.length}
                </span>

                <button
                  disabled={activeStep === CRAFT_STEPS.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(CRAFT_STEPS.length - 1, prev + 1))}
                  className="inline-flex items-center space-x-1.5 hover:text-[#d4a574] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Transition Overlay into Scene 03 */}
      <div className="absolute bottom-0 left-0 right-0 h-28 scene-transition-bottom pointer-events-none" />
    </section>
  );
};
