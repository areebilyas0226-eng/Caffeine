import React, { useState, useEffect } from 'react';
import { Order, ReservationRequest } from '../types';
import { Lock, LogOut, CheckCircle2, Clock, AlertCircle, RefreshCw, X, Utensils, Calendar, IndianRupee } from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AdminStats {
  totalRevenue: number;
  orderCount: number;
  activeOrders: number;
  confirmedBookings: number;
  todayGuests: number;
}

interface AdminBooking extends ReservationRequest {
  id: string;
  status: 'pending' | 'confirmed' | 'seated' | 'cancelled';
  createdAt: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState('');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('caffeine_admin_token'));
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings'>('orders');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = async (authToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${authToken}` };

      const [ordersRes, bookingsRes, statsRes] = await Promise.all([
        fetch('/api/admin/orders', { headers }),
        fetch('/api/admin/bookings', { headers }),
        fetch('/api/admin/stats', { headers })
      ]);

      if (ordersRes.status === 401 || bookingsRes.status === 401) {
        handleLogout();
        throw new Error('Session expired. Please sign in again.');
      }

      const ordersData = await ordersRes.json();
      const bookingsData = await bookingsRes.json();
      const statsData = await statsRes.json();

      setOrders(ordersData.orders || []);
      setBookings(bookingsData.bookings || []);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch admin data';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      fetchAdminData(token);
    }
  }, [isOpen, token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      setToken(data.token);
      localStorage.setItem('caffeine_admin_token', data.token);
      setPin('');
      fetchAdminData(data.token);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('caffeine_admin_token');
    setOrders([]);
    setBookings([]);
    setStats(null);
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: AdminBooking['status']) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="admin-portal-modal"
      className="fixed inset-0 z-50 bg-[#0c0805]/95 backdrop-blur-xl flex flex-col overflow-hidden text-[#f6eee3]"
    >
      {/* Top Header */}
      <div className="p-5 border-b border-[#d4a574]/20 bg-[#140d09] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#d4a574]/20 border border-[#d4a574] text-[#d4a574] flex items-center justify-center">
            <Lock size={15} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#f6eee3]">
              Caffeine Aligarh Staff Portal
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-[#d4a574]">
              Begpur Kitchen & Floor Management
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {token && (
            <>
              <button
                onClick={() => fetchAdminData(token)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#a9998c] hover:text-[#f6eee3]"
                title="Refresh"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-[#a9998c] hover:text-[#f6eee3]"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {!token ? (
          /* Authentication Screen */
          <div className="max-w-sm mx-auto py-16 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/30 text-[#d4a574] flex items-center justify-center mx-auto">
              <Lock size={28} />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-2xl font-bold text-[#f6eee3]">Staff Verification</h4>
              <p className="text-xs text-[#a9998c]">
                Please enter the 4-digit staff PIN to access orders and reservations.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                placeholder="Enter Staff PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full py-3 px-4 text-center tracking-[0.3em] font-mono text-xl rounded-xl bg-[#1a120c] border border-[#d4a574]/30 text-[#f6eee3] focus:border-[#d4a574] focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#d4a574] text-[#0c0805] text-xs uppercase tracking-widest font-bold hover:bg-[#e0b484] transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Unlock Staff Console'}
              </button>

              <div className="p-3 rounded-lg bg-[#140d09] border border-white/5 text-[11px] text-[#8f8073]">
                <span>Default Demo Staff PIN: </span>
                <span className="font-mono text-[#d4a574] font-bold">8833</span>
                <span className="block text-[10px] mt-0.5">(Caffeine Aligarh phone line tail)</span>
              </div>
            </form>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="space-y-8">
            {/* Real-time KPIs */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#140d09] border border-[#d4a574]/20 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-[#a9998c]">
                    <IndianRupee size={13} className="text-[#d4a574]" />
                    <span>Live Revenue</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#d4a574]">
                    ₹{stats.totalRevenue}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#140d09] border border-[#d4a574]/20 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-[#a9998c]">
                    <Utensils size={13} className="text-[#d4a574]" />
                    <span>Active Orders</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#f6eee3]">
                    {stats.activeOrders}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#140d09] border border-[#d4a574]/20 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-[#a9998c]">
                    <Calendar size={13} className="text-[#d4a574]" />
                    <span>Booked Tables</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#f6eee3]">
                    {stats.confirmedBookings}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#140d09] border border-[#d4a574]/20 space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs text-[#a9998c]">
                    <Clock size={13} className="text-[#d4a574]" />
                    <span>Total Orders</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#f6eee3]">
                    {stats.orderCount}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Controls */}
            <div className="flex space-x-2 border-b border-[#d4a574]/15 pb-3">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#d4a574] text-[#0c0805]'
                    : 'bg-[#18110b] text-[#a9998c] hover:text-[#f6eee3]'
                }`}
              >
                Orders ({orders.length})
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-[#d4a574] text-[#0c0805]'
                    : 'bg-[#18110b] text-[#a9998c] hover:text-[#f6eee3]'
                }`}
              >
                Table Reservations ({bookings.length})
              </button>
            </div>

            {/* Orders Tab Content */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-sm text-[#8f8073]">No orders recorded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl bg-[#140d09] border border-[#d4a574]/20 flex flex-col justify-between space-y-4 shadow-xl"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-[#d4a574]">
                              {order.id}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                                order.status === 'new'
                                  ? 'bg-blue-900/30 text-blue-300 border-blue-500/40'
                                  : order.status === 'preparing'
                                  ? 'bg-amber-900/30 text-amber-300 border-amber-500/40'
                                  : order.status === 'ready'
                                  ? 'bg-emerald-900/30 text-emerald-300 border-emerald-500/40'
                                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm text-[#f6eee3]">
                              {order.customer} · {order.phone}
                            </h4>
                            <p className="text-xs text-[#a9998c]">
                              {order.type.toUpperCase()}{' '}
                              {order.table ? `· ${order.table}` : ''}
                            </p>
                            {order.address && (
                              <p className="text-xs text-[#a9998c] truncate">
                                Addr: {order.address}
                              </p>
                            )}
                          </div>

                          <div className="py-2 border-t border-b border-white/5 space-y-1 text-xs">
                            {order.items.map((it, i) => (
                              <div key={i} className="flex justify-between">
                                <span>
                                  {it.qty}x {it.name}
                                </span>
                                <span>₹{it.price * it.qty}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between text-xs font-bold text-[#d4a574]">
                            <span>Total ({order.payment.toUpperCase()})</span>
                            <span className="font-serif text-sm">₹{order.total}</span>
                          </div>
                        </div>

                        {/* Status Actions */}
                        <div className="flex space-x-1.5 pt-2 border-t border-white/5">
                          {(['new', 'preparing', 'ready', 'served', 'cancelled'] as Order['status'][]).map(
                            (st) => (
                              <button
                                key={st}
                                onClick={() => updateOrderStatus(order.id, st)}
                                className={`flex-1 py-1 text-[10px] uppercase font-bold rounded transition-colors ${
                                  order.status === st
                                    ? 'bg-[#d4a574] text-[#0c0805]'
                                    : 'bg-[#1a120c] text-[#a9998c] hover:bg-white/10 hover:text-[#f6eee3]'
                                }`}
                              >
                                {st}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bookings Tab Content */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-sm text-[#8f8073]">No bookings recorded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-5 rounded-2xl bg-[#140d09] border border-[#d4a574]/20 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#d4a574]">
                            {booking.id}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-900/30 text-emerald-300 border-emerald-500/40'
                                : 'bg-amber-900/30 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-[#f6eee3]">{booking.name}</h4>
                          <p className="text-xs text-[#d4a574] font-mono">{booking.phone}</p>
                        </div>

                        <div className="text-xs text-[#a9998c] space-y-1 py-2 border-t border-b border-white/5">
                          <p>
                            Date & Time:{' '}
                            <strong className="text-[#f6eee3]">
                              {booking.date} at {booking.time}
                            </strong>
                          </p>
                          <p>
                            Party Size:{' '}
                            <strong className="text-[#f6eee3]">{booking.people} Guests</strong>
                          </p>
                          <p>
                            Occasion: <span className="text-[#d8cfc5]">{booking.occasion}</span>
                          </p>
                          {booking.note && (
                            <p className="italic text-[#8f8073]">"{booking.note}"</p>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-1">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="flex-1 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase hover:bg-emerald-900/60"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'seated')}
                            className="flex-1 py-1.5 rounded-lg bg-[#d4a574]/20 border border-[#d4a574]/40 text-[#d4a574] text-[11px] font-bold uppercase hover:bg-[#d4a574]/30"
                          >
                            Seated
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="flex-1 py-1.5 rounded-lg bg-red-900/40 border border-red-500/30 text-red-300 text-[11px] font-bold uppercase hover:bg-red-900/60"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
