import React from 'react';
import { CAFE_INFO } from '../data/menuData';
import { Instagram, Phone, MapPin, Sparkles, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenMenu: () => void;
  onOpenReserve: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenu, onOpenReserve, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative bg-[#080503] text-[#f6eee3] border-t border-[#d4a574]/20 pt-20 pb-12 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[#d4a574]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#d4a574]/15">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <h2 className="font-display text-3xl font-extrabold tracking-[0.16em] text-[#f6eee3]">
                CAFFEINE
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-[#d4a574] font-medium">
                Aligarh · Square Tower · Begpur
              </p>
            </div>

            <p className="font-serif italic text-[#c5b5a6] text-base leading-relaxed max-w-sm">
              “Where coffee, food, conversations and atmosphere meet. A tribute to unhurried time and artisanal craft in the heart of Aligarh.”
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-[#8f8073]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#16a34a]" />
              <span>Serving Aligarh Daily · 10 AM to 12 AM</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#d4a574] font-bold">
              The Journey
            </h4>
            <ul className="space-y-2 text-sm text-[#bdaea0]">
              <li>
                <button
                  onClick={() => scrollToSection('arrival')}
                  className="hover:text-[#f6eee3] transition-colors"
                >
                  Arrival & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('craft')}
                  className="hover:text-[#f6eee3] transition-colors"
                >
                  The Barista Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('signatures')}
                  className="hover:text-[#f6eee3] transition-colors"
                >
                  Signature Brews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('food')}
                  className="hover:text-[#f6eee3] transition-colors"
                >
                  Artisan Food & Bakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('atmosphere')}
                  className="hover:text-[#f6eee3] transition-colors"
                >
                  The Room & Ambience
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hover:text-[#f6eee3] transition-colors"
                >
                  Guest Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Experience & Reservations */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#d4a574] font-bold">
              Visit & Contact
            </h4>
            <div className="space-y-2 text-sm text-[#bdaea0]">
              <p className="flex items-start space-x-2">
                <MapPin size={16} className="text-[#d4a574] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} className="text-[#d4a574] shrink-0" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-[#f6eee3]">
                  {CAFE_INFO.phone}
                </a>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenMenu}
                className="px-4 py-2 rounded-full bg-[#18110b] border border-[#d4a574]/30 hover:border-[#d4a574] text-xs font-semibold text-[#f6eee3] transition-colors flex items-center space-x-1.5"
              >
                <Sparkles size={13} className="text-[#d4a574]" />
                <span>Full Menu</span>
              </button>

              <button
                onClick={onOpenReserve}
                className="px-4 py-2 rounded-full border border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0c0805] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Reserve Table
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786a5f]">
          <p>© {new Date().getFullYear()} Caffeine Aligarh. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <button
              id="footer-staff-login-btn"
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 text-[#8f8073] hover:text-[#d4a574] transition-colors"
            >
              <Lock size={12} />
              <span>Staff Console</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-[#f6eee3] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
