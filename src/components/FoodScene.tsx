import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { Sparkles, ArrowRight, Plus, Check } from 'lucide-react';

interface FoodSceneProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenMenu: () => void;
}

interface CulinaryHighlight {
  id: string;
  name: string;
  category: string;
  price: number;
  badge: string;
  description: string;
  accent: string;
  image: string;
}

const CULINARY_HIGHLIGHTS: CulinaryHighlight[] = [
  {
    id: "pa2",
    name: "White Sauce Alfredo Pasta",
    category: "Pasta & Italian",
    price: 199,
    badge: "House Specialty",
    description: "Al dente penne smothered in freshly reduced parmesan cream, garlic-infused butter, and fragrant garden herbs.",
    accent: "Rich, Silky & Comforting",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281220?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "bg3",
    name: "Grilled Paneer Tower Burger",
    category: "Big-Boy Burgers",
    price: 129,
    badge: "Crowd Favorite",
    description: "Thick spiced cottage cheese steak seared over flame, crisp iceberg lettuce, caramelized onions, and house-blended herb mayo on a toasted brioche bun.",
    accent: "Char-Grilled & Juicy",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "su3",
    name: "Paneer Tikka Gourmet Sub",
    category: "Artisan Subs",
    price: 189,
    badge: "Savory Icon",
    description: "Freshly toasted bakery baguette loaded with tandoori-spiced paneer chunks, smokey chipotle dressing, melted cheddar, and crisp bell peppers.",
    accent: "Toasted Golden Crunch",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "br3",
    name: "Warm Fudge Brownie w/ Gelato",
    category: "Desserts & Bakes",
    price: 159,
    badge: "Midnight Indulgence",
    description: "Decadent dark chocolate brownie warmed till its molten center breaks, crowned with a scoop of slow-churned vanilla bean ice cream.",
    accent: "Molten Cacao & Sweet Cream",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1400&q=85"
  }
];

export const FoodScene: React.FC<FoodSceneProps> = ({ onAddToCart, onOpenMenu }) => {
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAdd = (dish: CulinaryHighlight) => {
    onAddToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      veg: true,
      category: dish.category,
      desc: dish.description,
      image: dish.image
    });
    setAddedItem(dish.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <section
      id="food"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden"
    >
      {/* Ambient Filmic Glows */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-[#d4a574]/4 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium mb-3"
          >
            <Sparkles size={12} />
            <span>Scene IV · Artisanal Kitchen</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-[0.08em] text-[#f6eee3] uppercase leading-none"
          >
            BEYOND COFFEE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif italic text-xl sm:text-2xl text-[#d4a574] mt-3 font-light max-w-xl"
          >
            Comforting Italian pastas, flame-grilled burgers, and molten bakes.
          </motion.p>
        </div>

        {/* Visual Alternating Sequence (IMAGE LEFT/TEXT RIGHT then TEXT LEFT/IMAGE RIGHT) */}
        <div className="space-y-28 sm:space-y-36">
          {CULINARY_HIGHLIGHTS.map((dish, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={dish.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Frame */}
                <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#120b07] shadow-2xl"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.1]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Depth Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                    {/* Floating Dish Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#090503]/80 backdrop-blur-md border border-[#d4a574]/30 text-[#d4a574] text-[10px] font-bold uppercase tracking-[0.2em]">
                        {dish.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-6 font-display text-4xl sm:text-5xl font-bold text-[#d4a574]/20 pointer-events-none">
                      0{idx + 1}
                    </div>
                  </motion.div>
                </div>

                {/* Editorial Typography Column */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[#d4a574] font-medium block">
                      {dish.category} · {dish.accent}
                    </span>

                    <h3 className="font-serif text-3xl sm:text-4xl text-[#f6eee3] font-bold leading-tight">
                      {dish.name}
                    </h3>

                    <p className="text-base text-[#b8aba0] font-light leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="pt-4 flex items-center space-x-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#786b60] block font-medium">
                          Serving
                        </span>
                        <span className="font-serif text-3xl font-bold text-[#f6eee3]">
                          ₹{dish.price}
                        </span>
                      </div>

                      <button
                        id={`add-food-btn-${dish.id}`}
                        onClick={() => handleAdd(dish)}
                        className={`px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-[0.18em] transition-all flex items-center space-x-2 cursor-pointer shadow-xl ${
                          addedItem === dish.id
                            ? 'bg-[#16a34a] text-white shadow-[#16a34a]/30'
                            : 'bg-[#d4a574] text-[#090503] hover:bg-[#e0b484] hover:scale-[1.02] active:scale-[0.98] shadow-[#d4a574]/20'
                        }`}
                      >
                        {addedItem === dish.id ? (
                          <>
                            <Check size={14} />
                            <span>Added</span>
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
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Menu Invitation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 sm:mt-36 text-center max-w-xl mx-auto space-y-4"
        >
          <p className="font-serif italic text-lg text-[#d4a574]">
            Over 119 culinary creations, hot beverages, and chilled quenchers.
          </p>
          <button
            id="food-explore-full-menu-btn"
            onClick={onOpenMenu}
            className="w-full sm:w-auto px-10 py-4 rounded-full border border-[#d4a574]/40 hover:border-[#d4a574] bg-[#140d08] hover:bg-[#d4a574]/15 text-[#f6eee3] hover:text-[#d4a574] text-xs font-bold uppercase tracking-[0.2em] transition-all inline-flex items-center justify-center space-x-3 group cursor-pointer shadow-2xl"
          >
            <span>Explore Full Menu</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Seamless Transition Overlay into Scene 05 */}
      <div className="absolute bottom-0 left-0 right-0 h-28 scene-transition-bottom pointer-events-none" />
    </section>
  );
};
