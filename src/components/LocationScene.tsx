import React from 'react';
import { MapPin, Clock, Phone, Navigation, Sparkles, ExternalLink } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const LocationScene: React.FC = () => {
  return (
    <section
      id="location"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden"
    >
      {/* Ambient Filmic Glows */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-[#d4a574]/4 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Destination Narrative & Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium mb-3">
                <Sparkles size={12} />
                <span>Scene VIII · The Destination</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-[0.08em] text-[#f6eee3] uppercase leading-none">
                FIND CAFFEINE
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[#d4a574] mt-3 font-light">
                Square Tower, Marris Road · Begpur, Aligarh
              </p>
            </div>

            {/* Editorial Information Details */}
            <div className="space-y-6 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4a574] font-medium block">
                  Location & Landmark
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#f6eee3] font-normal">
                  {CAFE_INFO.address}
                </p>
                <p className="text-xs text-[#8e8176] pt-1">
                  Conveniently situated in Square Tower on Marris Road, easily reachable from Centre Point, Medical Road, and AMU Campus.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-[#d4a574]/15">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4a574] font-medium block">
                    Sanctuary Hours
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16a34a]/20 text-[#22c55e] border border-[#16a34a]/30">
                    Open Now
                  </span>
                </div>
                <p className="font-serif text-xl sm:text-2xl text-[#f6eee3] font-normal">
                  {CAFE_INFO.hours}
                </p>
                <p className="text-xs text-[#8e8176] pt-1">
                  Welcoming you seven days a week from morning pour-overs to midnight chocolate indulgences.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-[#d4a574]/15">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4a574] font-medium block">
                  Direct Inquiries & Celebrations
                </span>
                <p className="font-mono text-xl sm:text-2xl text-[#f6eee3] font-normal">
                  {CAFE_INFO.phone}
                </p>
                <p className="text-xs text-[#8e8176] pt-1">
                  Dial for custom decor setups, catering queries, or instant table directions.
                </p>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={CAFE_INFO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-[#d4a574] text-[#090503] text-xs uppercase tracking-[0.18em] font-bold flex items-center justify-center space-x-2.5 hover:bg-[#e0b484] shadow-xl shadow-[#d4a574]/20 transition-all cursor-pointer"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="px-8 py-3.5 rounded-full border border-[#d4a574]/50 hover:border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574]/10 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Phone size={14} />
                <span>Call Café</span>
              </a>
            </div>
          </div>

          {/* Exterior Visual & Location Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#120b07] relative group">
              <img
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1400&q=85"
                alt="Square Tower Marris Road Exterior"
                className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08] group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-black/25 pointer-events-none" />
              <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

              {/* In-Frame Pin Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#090503]/85 backdrop-blur-md border border-[#d4a574]/25 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#d4a574] text-[#090503] flex items-center justify-center font-bold">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-[#f6eee3] text-sm">
                      Square Tower, Begpur
                    </h5>
                    <span className="text-[11px] text-[#d4a574]">Aligarh, UP 202001</span>
                  </div>
                </div>

                <a
                  href={CAFE_INFO.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-[#d4a574] hover:underline font-bold"
                >
                  View Map →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
