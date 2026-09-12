import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { ReservationRequest } from '../types';

export const ReservationScene: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: 'Today',
    time: '7:30 PM',
    people: 2,
    occasion: 'Casual Evening Coffee',
    note: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; whatsappLink: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dates = ['Today', 'Tomorrow', 'This Saturday', 'This Sunday'];
  const times = ['1:00 PM', '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM', '10:30 PM'];
  const occasions = ['Casual Evening Coffee', 'Quiet Study / Work', 'Coffee Date', 'Birthday Celebration', 'Friend Reunion'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const payload: ReservationRequest = {
        name: formData.name.trim(),
        phone: cleanPhone,
        date: formData.date,
        time: formData.time,
        people: Number(formData.people),
        occasion: formData.occasion,
        note: formData.note.trim()
      };

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit reservation');
      }

      setConfirmedBooking({
        id: data.booking.id,
        whatsappLink: data.whatsappLink
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Reservation failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reservation"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#090503] text-[#f6eee3] overflow-hidden flex items-center justify-center"
    >
      {/* Ambient Filmic Glows */}
      <div className="absolute top-0 left-0 right-0 h-28 scene-transition-top pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#d4a574]/4 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative & Hospitality Visual */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#d4a574] font-medium"
            >
              <Sparkles size={12} />
              <span>Scene VII · Hospitality</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl font-bold tracking-[0.08em] text-[#f6eee3] uppercase leading-tight"
            >
              RESERVE YOUR TABLE
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif italic text-lg sm:text-xl text-[#d4a574] font-light"
            >
              An intimate corner, study desk, or lively celebration.
            </motion.p>

            <p className="text-sm sm:text-base text-[#b8aba0] font-light leading-relaxed">
              We hold reserved tables for 20 minutes past your scheduled arrival. There are zero booking fees.
              Join us for freshly pulled espresso, comforting pasta, and the warmth of late-night Aligarh.
            </p>

            {/* Tactile Atmosphere Photograph (Framed without generic card) */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl mt-8 hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Cozy Table Setting at Caffeine Aligarh"
                className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.08]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090503] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-[#d8cfc5]">
                <span className="font-mono text-[11px] text-[#d4a574]">Square Tower · Marris Road</span>
                <span className="text-[#8e8176]">Complimentary WiFi</span>
              </div>
            </div>
          </div>

          {/* Right: Elegant Hospitality Booking Form (No giant enclosed box) */}
          <div className="lg:col-span-7">
            {confirmedBooking ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 sm:px-10 text-center space-y-6 rounded-2xl bg-[#120b07]/70 border border-[#d4a574]/25 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-[#16a34a]/20 border border-[#16a34a] text-[#16a34a] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4a574] font-bold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#f6eee3]">
                    Your Table Awaits
                  </h3>
                  <p className="font-mono text-sm text-[#d4a574] font-semibold">
                    Reference #{confirmedBooking.id}
                  </p>
                  <p className="text-xs sm:text-sm text-[#b8aba0] max-w-md mx-auto pt-2 font-light leading-relaxed">
                    We have reserved a table for {formData.people} guests on {formData.date} at {formData.time} under the name {formData.name}.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <a
                    href={confirmedBooking.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center space-x-2 transition-all shadow-xl"
                  >
                    <MessageSquare size={16} />
                    <span>Send WhatsApp Confirmation</span>
                  </a>
                  <button
                    onClick={() => setConfirmedBooking(null)}
                    className="px-8 py-3.5 rounded-full border border-[#d4a574]/40 hover:border-[#d4a574] text-[#f6eee3] text-xs uppercase tracking-[0.16em] font-medium transition-all cursor-pointer"
                  >
                    Book Another Table
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-3">
                    <AlertCircle size={16} className="text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-[#d4a574] font-medium flex items-center space-x-2">
                    <Calendar size={13} />
                    <span>Select Date</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dates.map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setFormData({ ...formData, date: d })}
                        className={`py-3 px-3 rounded-xl text-xs font-medium tracking-wide transition-all border cursor-pointer ${
                          formData.date === d
                            ? 'bg-[#d4a574] text-[#090503] border-[#d4a574] font-bold shadow-lg shadow-[#d4a574]/20'
                            : 'bg-[#140d08]/60 text-[#b8aba0] border-[#d4a574]/15 hover:border-[#d4a574]/40 hover:text-[#f6eee3]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-[#d4a574] font-medium flex items-center space-x-2">
                    <Clock size={13} />
                    <span>Select Arrival Time</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {times.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, time: t })}
                        className={`py-2.5 px-1 rounded-xl text-xs font-medium transition-all border text-center cursor-pointer ${
                          formData.time === t
                            ? 'bg-[#d4a574] text-[#090503] border-[#d4a574] font-bold shadow-lg shadow-[#d4a574]/20'
                            : 'bg-[#140d08]/60 text-[#b8aba0] border-[#d4a574]/15 hover:border-[#d4a574]/40 hover:text-[#f6eee3]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Party Size and Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#d4a574] font-medium flex items-center space-x-2">
                      <Users size={13} />
                      <span>Party Size</span>
                    </label>
                    <select
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: Number(e.target.value) })}
                      className="w-full py-3 px-4 rounded-xl bg-[#140d08] border border-[#d4a574]/25 text-[#f6eee3] text-sm focus:border-[#d4a574] focus:outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                        <option key={num} value={num} className="bg-[#140d08] text-[#f6eee3]">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#d4a574] font-medium">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-[#140d08] border border-[#d4a574]/25 text-[#f6eee3] text-sm focus:border-[#d4a574] focus:outline-none cursor-pointer"
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ} className="bg-[#140d08] text-[#f6eee3]">
                          {occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#d4a574] font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Areeb Ilyas"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-[#140d08] border border-[#d4a574]/25 text-[#f6eee3] text-sm placeholder-[#64564b] focus:border-[#d4a574] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-[#d4a574] font-medium flex items-center space-x-2">
                      <Phone size={13} />
                      <span>10-Digit Mobile</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9897618833"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-[#140d08] border border-[#d4a574]/25 text-[#f6eee3] text-sm placeholder-[#64564b] focus:border-[#d4a574] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Special Request */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-[#786b60] font-medium">
                    Special Seating Request (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Corner table near power outlet, quiet study area"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full py-3 px-4 rounded-xl bg-[#140d08] border border-[#d4a574]/15 text-[#f6eee3] text-xs placeholder-[#64564b] focus:border-[#d4a574] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4a574] to-[#b8864e] text-[#090503] text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-[#d4a574]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Confirming Your Table...' : 'Confirm Table Reservation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Seamless Transition Overlay into Scene 08 */}
      <div className="absolute bottom-0 left-0 right-0 h-28 scene-transition-bottom pointer-events-none" />
    </section>
  );
};
