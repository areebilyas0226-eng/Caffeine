import React from 'react';
import { Order } from '../types';
import { CheckCircle2, Clock, MapPin, Sparkles, X, MessageSquare, Utensils } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Caffeine Aligarh! I just placed order #${order.id} for ₹${order.total}. Could you please confirm estimated time?`
  );

  return (
    <div
      id="order-confirmation-modal"
      className="fixed inset-0 z-50 bg-[#0c0805]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="w-full max-w-lg bg-[#140d09] border border-[#d4a574]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative text-[#f6eee3]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/5 text-[#a9998c] hover:text-[#f6eee3]"
        >
          <X size={18} />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#16a34a]/20 border border-[#16a34a] text-[#16a34a] flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#d4a574] font-bold">
            <Sparkles size={12} />
            <span>Order Placed Successfully</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f6eee3]">
            Thank You, {order.customer}!
          </h3>
          <p className="font-mono text-sm text-[#d4a574] font-bold">
            Order Reference #{order.id}
          </p>
        </div>

        {/* Live Prep Status Indicator */}
        <div className="p-4 rounded-2xl bg-[#1b120c] border border-[#d4a574]/20 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#a9998c] uppercase tracking-wider font-semibold">
              Live Kitchen Status
            </span>
            <span className="flex items-center space-x-1 text-[#d4a574] font-bold">
              <Clock size={13} />
              <span>Est: {order.estimatedDelivery || '15-20 mins'}</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
            <div className="py-2 rounded-lg bg-[#d4a574] text-[#0c0805]">
              1. Received
            </div>
            <div className="py-2 rounded-lg bg-[#d4a574]/20 text-[#d4a574] border border-[#d4a574]/40 animate-pulse">
              2. Brewing
            </div>
            <div className="py-2 rounded-lg bg-[#120c08] text-[#786a5f]">
              3. Ready
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between pb-2 border-b border-white/5 text-[#a9998c]">
            <span>Fulfillment</span>
            <span className="text-[#f6eee3] font-semibold uppercase">
              {order.type} {order.table ? `(${order.table})` : ''}
            </span>
          </div>

          <div className="space-y-1.5 py-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>
                  {item.qty}x {item.name}
                </span>
                <span className="font-serif font-bold text-[#d4a574]">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 space-y-1">
            <div className="flex justify-between text-[#8f8073]">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-[#8f8073]">
              <span>GST (5%)</span>
              <span>₹{order.tax}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-[#8f8073]">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#d4a574] pt-1">
              <span>Total Paid ({order.payment.toUpperCase()})</span>
              <span className="font-serif text-base">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`https://wa.me/919897618833?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg"
          >
            <MessageSquare size={15} />
            <span>Track on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-[#d4a574]/40 hover:border-[#d4a574] text-[#f6eee3] text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Back to Café
          </button>
        </div>
      </div>
    </div>
  );
};
