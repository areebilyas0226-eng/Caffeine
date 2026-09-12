import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navigation } from './components/Navigation';
import { HeroScene } from './components/HeroScene';
import { CraftScene } from './components/CraftScene';
import { SignaturesScene } from './components/SignaturesScene';
import { FoodScene } from './components/FoodScene';
import { AtmosphereScene } from './components/AtmosphereScene';
import { ReviewsScene } from './components/ReviewsScene';
import { ReservationScene } from './components/ReservationScene';
import { LocationScene } from './components/LocationScene';
import { Footer } from './components/Footer';
import { FullMenuModal } from './components/FullMenuModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AdminPortal } from './components/AdminPortal';
import { TailwindControlledTest } from './components/TailwindControlledTest';
import { CartItem, MenuItem, Order } from './types';

export function App() {
  // Smooth scroll orchestration
  useLenis();

  // Cart state persisted to sessionStorage for convenience
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = sessionStorage.getItem('caffeine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Sync cart to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('caffeine_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToReserve = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Map of item ID -> quantity in cart for instant indicator on menu
  const cartItemIds = cartItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.id] = item.qty;
    return acc;
  }, {});

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#0c0805] text-[#f6eee3] selection:bg-[#d4a574]/30 selection:text-[#fff4ea]">
      <TailwindControlledTest />
      {/* Top Floating Navigation Bar */}
      <Navigation
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReserve={handleScrollToReserve}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Narrative Sequence */}
      <main>
        {/* Scene 01: Arrival */}
        <HeroScene
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenReserve={handleScrollToReserve}
        />

        {/* Scene 02: The Craft */}
        <CraftScene />

        {/* Scene 03: Signature Coffee */}
        <SignaturesScene
          onAddToCart={handleAddToCart}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* Scene 04: Beyond Coffee (Food, Burgers, Pastas) */}
        <FoodScene
          onAddToCart={handleAddToCart}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* Scene 05: The Room & Atmosphere */}
        <AtmosphereScene />

        {/* Scene 06: Social Proof & Guest Stories */}
        <ReviewsScene />

        {/* Scene 07: Table Reservation */}
        <ReservationScene />

        {/* Scene 08: Find Caffeine in Begpur */}
        <LocationScene />
      </main>

      {/* Editorial Footer */}
      <Footer
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReserve={handleScrollToReserve}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Complete 21-Category Menu Explorer Modal */}
      <FullMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAddToCart={handleAddToCart}
        cartItemIds={cartItemIds}
      />

      {/* Transactional Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(order) => setConfirmedOrder(order)}
      />

      {/* Order Confirmation & Kitchen Live Tracker */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Protected Staff Administration Console */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default App;
