import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_PRODUCTS } from '../data/menuData';
import { MenuItem } from '../types';
import { Plus, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface SignaturesSceneProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenMenu: () => void;
}

export const SignaturesScene: React.FC<SignaturesSceneProps> = ({ onAddToCart, onOpenMenu }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const current = SIGNATURE_PRODUCTS[activeIndex];

  const handleAdd = (item: typeof current) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      veg: true,
      category: item.category,
      desc: item.desc,
      image: item.image
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % SIGNATURE_PRODUCTS.length);
  };

  const prevProduct = () => {
    setActiveIndex((prev) => (prev === 0 ? SIGNATURE_PRODUCTS.length - 1 : prev - 1));
  };

  return (
    <section
      id="signatures"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Filmic Glows */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[700px] h-[700px] rounded-full bg-[#d4a574]/4 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium mb-3">
              <Sparkles size={12} />
              <span>Scene III · Iconic Brews</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-[0.08em] text-[#f6eee3] uppercase leading-none">
              SIGNATURES
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#d4a574] mt-2 font-light">
              Distinguished recipes developed and refined exclusively at Caffeine.
            </p>
          </div>

          {/* Full Menu Fast Trigger */}
          <button
            id="signatures-open-full-menu-btn"
            onClick={onOpenMenu}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-[#d4a574]/35 hover:border-[#d4a574] text-xs uppercase tracking-[0.2em] font-semibold text-[#f6eee3] hover:text-[#d4a574] hover:bg-[#d4a574]/10 transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>View Full Menu (119 Items)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Spatial Luxury Showcase: The Image Dominates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Dominant Visual Showcase Frame (GIANT IMAGE) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#120b07] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  initial={{ opacity: 0, scale: 1.15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(2px)' }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08]"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Inset Gradient & Film Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

              {/* Floating Sensory Tag */}
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 rounded-full bg-[#090503]/75 backdrop-blur-md border border-[#d4a574]/30 text-[#d4a574] text-[10px] font-bold uppercase tracking-[0.2em]">
                  {current.tag}
                </span>
              </div>

              {/* Big Numerals */}
              <div className="absolute bottom-4 right-6 font-display text-4xl sm:text-5xl font-bold text-[#d4a574]/30 pointer-events-none">
                0{activeIndex + 1}
              </div>
            </div>
          </div>

          {/* Editorial Product Showcase Typography */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Small Category Label */}
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#d4a574] font-medium block">
                  {current.category} · {current.subtitle}
                </span>

                {/* Giant Product Name */}
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f6eee3] font-bold leading-tight">
                  {current.name}
                </h3>

                {/* Sensory Description */}
                <p className="text-base text-[#b8aba0] font-light leading-relaxed">
                  {current.desc}
                </p>

                {/* Sensory Notes */}
                {current.notes && current.notes.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {current.notes.map((note) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 rounded-full bg-[#160e09] border border-[#d4a574]/20 text-[10px] uppercase tracking-wider text-[#d4a574]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Add to Order */}
                <div className="pt-4 flex items-center space-x-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#786b60] block font-medium">
                      Price
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#f6eee3]">
                      ₹{current.price}
                    </span>
                  </div>

                  <button
                    id={`signature-add-btn-${current.id}`}
                    onClick={() => handleAdd(current)}
                    className={`px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-[0.18em] transition-all flex items-center space-x-2 cursor-pointer shadow-xl ${
                      addedItem === current.id
                        ? 'bg-[#16a34a] text-white shadow-[#16a34a]/30'
                        : 'bg-[#d4a574] text-[#090503] hover:bg-[#e0b484] hover:scale-[1.02] active:scale-[0.98] shadow-[#d4a574]/20'
                    }`}
                  >
                    {addedItem === current.id ? (
                      <>
                        <Check size={14} />
                        <span>Added to Order</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Switcher: Prev / Next + Item Chips */}
            <div className="pt-6 border-t border-[#d4a574]/15 flex items-center justify-between">
              <div className="flex space-x-2 overflow-x-auto py-1 max-w-[200px] sm:max-w-xs no-scrollbar">
                {SIGNATURE_PRODUCTS.map((item, idx) => (
                  <button
                    key={item.id}
                    id={`signature-thumb-${item.id}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? 'w-8 bg-[#d4a574]'
                        : 'w-2 bg-[#261a12] hover:bg-[#d4a574]/40'
                    }`}
                    aria-label={`Show ${item.name}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  id="signature-prev-btn"
                  onClick={prevProduct}
                  className="w-10 h-10 rounded-full border border-[#d4a574]/30 hover:border-[#d4a574] text-[#d4a574] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous signature brew"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  id="signature-next-btn"
                  onClick={nextProduct}
                  className="w-10 h-10 rounded-full border border-[#d4a574]/30 hover:border-[#d4a574] text-[#d4a574] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next signature brew"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Transition Overlay into Scene 04 */}
      <div className="absolute bottom-0 left-0 right-0 h-28 scene-transition-bottom pointer-events-none" />
    </section>
  );
};
