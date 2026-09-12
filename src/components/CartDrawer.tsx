import React, { useState } from 'react';
import { CartItem, Order, OrderType, PaymentMethod } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertCircle, Utensils, Bike, Package } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOrderSuccess
}) => {
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4 (Window)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [orderNote, setOrderNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = orderType === 'delivery' ? (subtotal > 500 ? 0 : 40) : 0;
  const grandTotal = subtotal + tax + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your cart is empty. Please add some items.');
      return;
    }

    if (!customerName.trim() || customerName.trim().length < 2) {
      setError('Please provide your name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit phone number.');
      return;
    }

    if (orderType === 'delivery' && (!deliveryAddress.trim() || deliveryAddress.trim().length < 5)) {
      setError('Please enter your complete delivery address in Aligarh.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customer: customerName.trim(),
        phone: cleanPhone,
        type: orderType,
        table: orderType === 'dine-in' ? tableNumber : undefined,
        address: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
        payment: paymentMethod,
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        note: orderNote.trim()
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order');
      }

      onClearCart();
      onOrderSuccess(data.order);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Checkout failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#0c0805]/80 backdrop-blur-sm flex justify-end transition-opacity"
    >
      <div className="w-full max-w-md bg-[#120c08] border-l border-[#d4a574]/20 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#d4a574]/15 bg-[#17100b] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={18} className="text-[#d4a574]" />
            <h3 className="font-serif text-lg font-bold text-[#f6eee3]">Your Café Order</h3>
            <span className="text-xs bg-[#d4a574]/20 text-[#d4a574] px-2 py-0.5 rounded-full font-mono">
              {items.reduce((sum, i) => sum + i.qty, 0)} items
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-[#a9998c] hover:text-[#f6eee3] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Middle Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle size={15} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Cart Item List */}
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-[#8f8073]">
              <ShoppingBag size={42} className="mx-auto opacity-30 text-[#d4a574]" />
              <p className="font-serif text-base text-[#d4a574]">Your tray is empty</p>
              <p className="text-xs">Add hand-crafted brews or gourmet food to begin your order.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#18110b] border border-[#d4a574]/15 flex items-center justify-between"
                >
                  <div className="space-y-0.5 flex-1 pr-3">
                    <h5 className="font-serif text-sm font-bold text-[#f6eee3] leading-snug">
                      {item.name}
                    </h5>
                    <span className="text-xs font-serif text-[#d4a574] font-bold">
                      ₹{item.price * item.qty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1.5 bg-[#0c0805] border border-[#d4a574]/20 rounded-full px-2 py-1">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="text-[#a9998c] hover:text-[#f6eee3] p-0.5"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-xs text-[#f6eee3] px-1 font-bold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="text-[#a9998c] hover:text-[#f6eee3] p-0.5"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8f8073] hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <form onSubmit={handleCheckout} className="space-y-5 pt-3 border-t border-[#d4a574]/15">
              {/* Order Mode Switcher */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#d4a574] font-bold">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center space-y-1 border transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-[#d4a574] text-[#0c0805] border-[#d4a574] font-bold'
                        : 'bg-[#18110b] text-[#a9998c] border-[#d4a574]/15'
                    }`}
                  >
                    <Utensils size={14} />
                    <span>Dine-In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center space-y-1 border transition-all ${
                      orderType === 'takeaway'
                        ? 'bg-[#d4a574] text-[#0c0805] border-[#d4a574] font-bold'
                        : 'bg-[#18110b] text-[#a9998c] border-[#d4a574]/15'
                    }`}
                  >
                    <Package size={14} />
                    <span>Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center space-y-1 border transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#d4a574] text-[#0c0805] border-[#d4a574] font-bold'
                        : 'bg-[#18110b] text-[#a9998c] border-[#d4a574]/15'
                    }`}
                  >
                    <Bike size={14} />
                    <span>Delivery</span>
                  </button>
                </div>
              </div>

              {/* Dine-in Table Selector */}
              {orderType === 'dine-in' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#a9998c]">
                    Table Assignment
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#18110b] border border-[#d4a574]/20 text-[#f6eee3] text-xs focus:border-[#d4a574] focus:outline-none"
                  >
                    <option value="Table 1 (Near Counter)">Table 1 (Near Counter)</option>
                    <option value="Table 2 (Study Corner)">Table 2 (Study Corner)</option>
                    <option value="Table 3 (Central Lounge)">Table 3 (Central Lounge)</option>
                    <option value="Table 4 (Window)">Table 4 (Window)</option>
                    <option value="Table 5 (Terrace)">Table 5 (Terrace)</option>
                    <option value="Table Assigned on Arrival">Table Assigned on Arrival</option>
                  </select>
                </div>
              )}

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#a9998c]">
                    Aligarh Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Hostel, Road name, Landmark"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#18110b] border border-[#d4a574]/20 text-[#f6eee3] text-xs placeholder-[#6b5c50] focus:border-[#d4a574] focus:outline-none"
                  />
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#a9998c]">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#18110b] border border-[#d4a574]/20 text-[#f6eee3] text-xs placeholder-[#6b5c50] focus:border-[#d4a574] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#a9998c]">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-[#18110b] border border-[#d4a574]/20 text-[#f6eee3] text-xs placeholder-[#6b5c50] focus:border-[#d4a574] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#d4a574] font-bold">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['upi', 'cash', 'card'] as PaymentMethod[]).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-2 rounded-xl text-xs uppercase font-bold tracking-wider border transition-all ${
                        paymentMethod === method
                          ? 'bg-[#d4a574] text-[#0c0805] border-[#d4a574]'
                          : 'bg-[#18110b] text-[#a9998c] border-[#d4a574]/15'
                      }`}
                    >
                      {method === 'upi' ? 'UPI / QR' : method === 'cash' ? 'Cash' : 'Card'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chef / Barista Note */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#8f8073]">Special Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot, oat milk substitute, less sweet"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-[#18110b] border border-[#d4a574]/15 text-[#f6eee3] text-xs placeholder-[#6b5c50] focus:border-[#d4a574] focus:outline-none"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3.5 rounded-xl bg-[#160f0a] border border-[#d4a574]/20 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#a9998c]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#a9998c]">
                  <span>GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#a9998c]">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#d4a574] pt-2 border-t border-[#d4a574]/15">
                  <span>Grand Total</span>
                  <span className="font-serif text-base">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4a574] to-[#b8864e] text-[#0c0805] text-xs uppercase tracking-[0.18em] font-bold shadow-xl shadow-[#d4a574]/20 hover:shadow-[#d4a574]/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Processing Securely...' : `Pay ₹${grandTotal} & Place Order`}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
