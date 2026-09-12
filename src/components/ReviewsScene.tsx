import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/menuData';
import { Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const ReviewsScene: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = REVIEWS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  return (
    <section
      id="reviews"
      className="relative w-full min-h-[80vh] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Filmic Glows */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#d4a574]/3 blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium mb-10">
          <Sparkles size={12} />
          <span>Scene VI · Community & Word of Mouth</span>
        </div>

        {/* Aggregate Verification Pill */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#d4a574]/20 bg-[#120b07]/80 backdrop-blur-md">
            <div className="flex text-[#d4a574]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#d4a574]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#f6eee3]">4.8 / 5.0</span>
            <span className="text-[11px] text-[#786b60]">· 520+ Verified Local Guests</span>
          </div>
        </div>

        {/* The Dominant Editorial Quotation (No card box) */}
        <div className="min-h-[220px] sm:min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <blockquote className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-[#f6eee3] font-light leading-snug sm:leading-relaxed">
                “{current.text}”
              </blockquote>

              <div className="pt-2">
                <p className="font-display text-sm tracking-[0.2em] text-[#d4a574] uppercase font-bold">
                  {current.name}
                </p>
                <span className="text-xs text-[#786b60] tracking-wider block mt-1">
                  Verified Guest · Aligarh
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Nav Controls */}
        <div className="mt-14 flex items-center justify-center space-x-8">
          <button
            id="review-prev-btn"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#d4a574]/30 hover:border-[#d4a574] text-[#d4a574] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous review"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex space-x-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                id={`review-dot-${i}`}
                onClick={() => setCurrentIdx(i)}
                aria-label={`View review ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIdx === i ? 'w-8 bg-[#d4a574]' : 'w-2 bg-[#2a1d15] hover:bg-[#d4a574]/40'
                }`}
              />
            ))}
          </div>

          <button
            id="review-next-btn"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#d4a574]/30 hover:border-[#d4a574] text-[#d4a574] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next review"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Seamless Transition Overlay into Scene 07 */}
      <div className="absolute bottom-0 left-0 right-0 h-28 scene-transition-bottom pointer-events-none" />
    </section>
  );
};
