import React, { useState, useMemo } from 'react';
import { ALL_MENU_CATEGORIES, ALL_MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';
import { X, Search, Plus, Check, Sparkles, Filter } from 'lucide-react';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Record<string, number>;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  cartItemIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.veg;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [selectedCategory, searchQuery, vegOnly]);

  if (!isOpen) return null;

  return (
    <div
      id="full-menu-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#0c0805]/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="border-b border-[#d4a574]/20 bg-[#120c08]/90 px-4 sm:px-8 py-4 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles size={14} className="text-[#d4a574]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f6eee3] tracking-wide">
              THE CAFFEINE MENU
            </h3>
          </div>
          <p className="text-xs text-[#a9998c] font-light">
            119 Handcrafted Brews, Artisan Pastas, Burgers & Bakes · Begpur, Aligarh
          </p>
        </div>

        <button
          id="close-menu-modal-btn"
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#1e150e] hover:bg-[#d4a574] text-[#d4a574] hover:text-[#0c0805] transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Controls: Search and Categories */}
      <div className="px-4 sm:px-8 py-4 bg-[#140d09]/70 border-b border-[#d4a574]/15 shrink-0 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Field */}
          <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7d71]" />
            <input
              type="text"
              placeholder="Search espresso, pasta, biscoff latte, brownie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b120c] border border-[#d4a574]/20 text-[#f6eee3] text-xs placeholder-[#7c6d62] focus:border-[#d4a574] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a9998c] hover:text-[#f6eee3]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Pure Veg Filter Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center space-x-2 border transition-all ${
              vegOnly
                ? 'bg-[#16a34a]/20 border-[#16a34a] text-[#22c55e]'
                : 'bg-[#1b120c] border-[#d4a574]/20 text-[#a9998c] hover:text-[#f6eee3]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full border border-current flex items-center justify-center p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </span>
            <span>100% Vegetarian Filter</span>
          </button>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#d4a574] text-[#0c0805] font-bold shadow-md shadow-[#d4a574]/20'
                : 'bg-[#1a120c] text-[#a9998c] hover:text-[#f6eee3] border border-[#d4a574]/15'
            }`}
          >
            All Categories ({ALL_MENU_ITEMS.length})
          </button>
          {ALL_MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4a574] text-[#0c0805] font-bold shadow-md shadow-[#d4a574]/20'
                  : 'bg-[#1a120c] text-[#a9998c] hover:text-[#f6eee3] border border-[#d4a574]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-[#8f8073]">
            <Filter size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-serif text-lg text-[#d4a574]">No items found</p>
            <p className="text-xs mt-1">Try another keyword or select All Categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const inCartQty = cartItemIds[item.id] || 0;
              return (
                <div
                  key={item.id}
                  id={`menu-item-card-${item.id}`}
                  className="p-4 rounded-2xl bg-[#140d08] border border-[#d4a574]/20 hover:border-[#d4a574]/50 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {item.veg ? (
                          <span
                            title="Vegetarian"
                            className="w-3.5 h-3.5 rounded border border-[#22c55e] flex items-center justify-center p-0.5 shrink-0"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                          </span>
                        ) : (
                          <span
                            title="Non-Veg"
                            className="w-3.5 h-3.5 rounded border border-[#ef4444] flex items-center justify-center p-0.5 shrink-0"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                          </span>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-[#d4a574] font-semibold">
                          {item.category}
                        </span>
                      </div>
                      {item.bestseller && (
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#d4a574]/20 text-[#d4a574] border border-[#d4a574]/40 font-bold">
                          Bestseller
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#f6eee3] group-hover:text-[#d4a574] transition-colors">
                      {item.name}
                    </h4>

                    {item.desc && (
                      <p className="text-xs text-[#a9998c] line-clamp-2 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#d4a574]/10 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#d4a574]">
                        ₹{item.price}
                      </span>
                    </div>

                    <button
                      id={`btn-add-menu-${item.id}`}
                      onClick={() => onAddToCart(item)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        inCartQty > 0
                          ? 'bg-[#16a34a] text-white'
                          : 'bg-[#d4a574] text-[#0c0805] hover:bg-[#e0b484] active:scale-95'
                      }`}
                    >
                      {inCartQty > 0 ? (
                        <>
                          <Check size={12} />
                          <span>{inCartQty} in Cart</span>
                        </>
                      ) : (
                        <>
                          <Plus size={12} />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer bar showing items found count */}
      <div className="px-4 sm:px-8 py-3 bg-[#100a07] border-t border-[#d4a574]/15 flex items-center justify-between text-xs text-[#8f8073]">
        <span>Showing {filteredItems.length} curated café items</span>
        <button
          onClick={onClose}
          className="text-[#d4a574] hover:underline uppercase tracking-wider font-semibold"
        >
          Return to Experience
        </button>
      </div>
    </div>
  );
};
