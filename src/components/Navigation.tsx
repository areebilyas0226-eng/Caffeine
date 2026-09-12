import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ambientAudio } from '../utils/audio';

interface NavigationProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenReserve: () => void;
  onOpenAdmin: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  onOpenReserve,
  onOpenAdmin
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = ambientAudio.toggle();
    setAudioActive(state);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-nav-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0c0805]/90 backdrop-blur-md border-b border-[#d4a574]/15 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0c0805]/80 via-[#0c0805]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-start text-left focus:outline-none"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#f6eee3] group-hover:text-[#d4a574] transition-colors">
              CAFFEINE
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4a574]/80 -mt-1 font-medium">
              Aligarh · Square Tower
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              id="nav-link-story"
              onClick={() => scrollToSection('arrival')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Story
            </button>
            <button
              id="nav-link-craft"
              onClick={() => scrollToSection('craft')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Craft
            </button>
            <button
              id="nav-link-signatures"
              onClick={() => scrollToSection('signatures')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Signatures
            </button>
            <button
              id="nav-link-food"
              onClick={() => scrollToSection('food')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Food
            </button>
            <button
              id="nav-link-atmosphere"
              onClick={() => scrollToSection('atmosphere')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Atmosphere
            </button>
            <button
              id="nav-link-reviews"
              onClick={() => scrollToSection('reviews')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Reviews
            </button>
            <button
              id="nav-link-visit"
              onClick={() => scrollToSection('location')}
              className="px-3 py-1.5 text-xs tracking-wider uppercase text-[#c3b6a9] hover:text-[#f6eee3] transition-colors font-medium"
            >
              Visit
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Audio Toggle */}
            <button
              id="nav-sound-toggle"
              onClick={toggleSound}
              title={audioActive ? 'Mute ambient café sounds' : 'Play ambient café soundscape'}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-[#d4a574]/20 text-[#d4a574] hover:border-[#d4a574]/40 hover:bg-[#d4a574]/10 transition-all text-xs"
            >
              {audioActive ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
              <span className="text-[11px] font-medium tracking-wide">
                {audioActive ? 'Ambience On' : 'Café Ambience'}
              </span>
            </button>

            {/* Complete Menu Button */}
            <button
              id="nav-open-menu-btn"
              onClick={onOpenMenu}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#d4a574]/30 hover:border-[#d4a574] bg-[#1a120c]/60 text-[#f6eee3] text-xs font-semibold tracking-wide transition-all hover:bg-[#d4a574]/15"
            >
              <Sparkles size={13} className="text-[#d4a574]" />
              <span>Full Menu</span>
            </button>

            {/* Table Reservation Button */}
            <button
              id="nav-reserve-table-btn"
              onClick={onOpenReserve}
              className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-transparent border border-[#d4a574]/60 text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0c0805] text-xs font-bold tracking-wider transition-all duration-300 uppercase"
            >
              <Calendar size={13} />
              <span>Reserve</span>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d4a574] to-[#b8864e] text-[#0c0805] text-xs font-bold tracking-wide shadow-lg shadow-[#d4a574]/20 hover:shadow-[#d4a574]/40 hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag size={14} />
              <span className="hidden sm:inline font-bold">Order</span>
              {cartCount > 0 && (
                <span className="bg-[#0c0805] text-[#d4a574] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#c3b6a9] hover:text-[#f6eee3] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-0 z-30 bg-[#0c0805]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 transition-all"
        >
          <div className="space-y-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4a574] font-semibold mb-2">
              The Journey Through Caffeine
            </p>
            {[
              { id: 'arrival', label: 'Story & Arrival' },
              { id: 'craft', label: 'The Craft' },
              { id: 'signatures', label: 'Signature Brews' },
              { id: 'food', label: 'Artisan Food' },
              { id: 'atmosphere', label: 'The Room & Ambience' },
              { id: 'reviews', label: 'Guest Reviews' },
              { id: 'location', label: 'Find Us in Begpur' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full py-2.5 text-lg font-serif tracking-wide text-[#e8dfd5] hover:text-[#d4a574] border-b border-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-[#d4a574]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMenu();
              }}
              className="w-full py-3 rounded-xl bg-[#1d140e] border border-[#d4a574]/40 text-[#f6eee3] font-bold text-sm tracking-wider flex items-center justify-center space-x-2"
            >
              <Sparkles size={16} className="text-[#d4a574]" />
              <span>Explore Complete Menu (120+ Items)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-3 rounded-xl border border-[#d4a574] text-[#d4a574] font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2"
            >
              <Calendar size={16} />
              <span>Reserve Table</span>
            </button>

            <div className="flex justify-between items-center pt-2 text-xs text-[#8f8073]">
              <button onClick={toggleSound} className="flex items-center space-x-1 text-[#d4a574]">
                {audioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{audioActive ? 'Ambience Playing' : 'Enable Ambience'}</span>
              </button>
              <button onClick={onOpenAdmin} className="underline hover:text-[#d4a574]">
                Staff Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
