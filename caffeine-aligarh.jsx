import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MENU = {
  "Hot Brews": [
    { id: "hb1", name: "Espresso 30ml", price: 89, veg: true },
    { id: "hb2", name: "Espresso 60ml", price: 99, veg: true },
    { id: "hb3", name: "Regular Hot Coffee", price: 99, veg: true },
    { id: "hb4", name: "Americano", price: 109, veg: true },
    { id: "hb5", name: "Cappuccino (S/L)", price: 129, veg: true, bestseller: true },
    { id: "hb6", name: "Café Latte", price: 129, veg: true },
    { id: "hb7", name: "Café Mocha", price: 149, veg: true },
    { id: "hb8", name: "Irish Coffee", price: 149, veg: true },
    { id: "hb9", name: "Caramel/Vanilla Coffee", price: 149, veg: true },
    { id: "hb10", name: "Hazelnut Coffee", price: 149, veg: true },
    { id: "hb11", name: "Hot Chocolate", price: 149, veg: true, bestseller: true, desc: "Best hot chocolate in town — rich, velvety, and soul-warming." },
    { id: "hb12", name: "Butter Chocolate", price: 149, veg: true },
    { id: "hb13", name: "Caramel Latte", price: 149, veg: true },
    { id: "hb14", name: "Biscoff Latte", price: 179, veg: true },
  ],
  "Cold Brews": [
    { id: "cb1", name: "Iced Americano", price: 119, veg: true },
    { id: "cb2", name: "Iced Cappuccino", price: 129, veg: true },
    { id: "cb3", name: "Classic Cold Coffee", price: 139, veg: true, bestseller: true },
    { id: "cb4", name: "Caramel/Vanilla", price: 159, veg: true },
    { id: "cb5", name: "Hazelnut/Irish", price: 159, veg: true },
    { id: "cb6", name: "Chocolate Cold Coffee", price: 169, veg: true },
    { id: "cb7", name: "Caffeine Overload", price: 169, veg: true },
    { id: "cb8", name: "Shahi Thandai", price: 179, veg: true },
    { id: "cb9", name: "Vietnamese Style Cold Coffee", price: 199, veg: true, bestseller: true, desc: "Our signature — silky, strong, impossibly smooth." },
  ],
  "Iced Lattes": [
    { id: "il1", name: "Iced Latte", price: 129, veg: true },
    { id: "il2", name: "Biscoff Iced Latte", price: 189, veg: true },
    { id: "il3", name: "Nutella Iced Latte", price: 189, veg: true },
    { id: "il4", name: "Blueberry Iced Latte", price: 189, veg: true },
    { id: "il5", name: "Strawberry Iced Latte", price: 189, veg: true },
  ],
  "Affogato": [
    { id: "af1", name: "Classic Affogato", price: 129, veg: true },
    { id: "af2", name: "Chocolate Affogato", price: 149, veg: true },
    { id: "af3", name: "Strawberry Affogato", price: 149, veg: true },
    { id: "af4", name: "Biscoff Affogato", price: 169, veg: true },
    { id: "af5", name: "Nutella Affogato", price: 169, veg: true },
  ],
  "Mocktails": [
    { id: "mc1", name: "Classic Virgin Mojito", price: 129, veg: true },
    { id: "mc2", name: "Strawberry Mojito", price: 129, veg: true },
    { id: "mc3", name: "Cucumber Mint", price: 129, veg: true },
    { id: "mc4", name: "Kala Khatta", price: 129, veg: true },
    { id: "mc5", name: "Electric Blue", price: 129, veg: true },
    { id: "mc6", name: "Lychee Fizz", price: 129, veg: true },
    { id: "mc7", name: "Mix Berry", price: 129, veg: true },
    { id: "mc8", name: "Kaccha Aam", price: 129, veg: true },
  ],
  "Milkshakes": [
    { id: "ms1", name: "Classic Vanilla", price: 149, veg: true },
    { id: "ms2", name: "Rich Chocolate", price: 149, veg: true },
    { id: "ms3", name: "Strawberry Delight", price: 149, veg: true },
    { id: "ms4", name: "Creamy Oreo", price: 169, veg: true, bestseller: true },
    { id: "ms5", name: "KitKat Heaven", price: 169, veg: true },
    { id: "ms6", name: "Biscoff Shake", price: 199, veg: true },
    { id: "ms7", name: "Nutty Nutella", price: 199, veg: true },
    { id: "ms8", name: "Brownie Shake", price: 199, veg: true },
  ],
  "Boba Soda": [
    { id: "bs1", name: "Very Berry", price: 169, veg: true },
    { id: "bs2", name: "Peachy-Lychee", price: 169, veg: true },
    { id: "bs3", name: "Sparkling Grape", price: 169, veg: true },
    { id: "bs4", name: "Passion Fruit Magic", price: 169, veg: true },
  ],
  "Iced Teas": [
    { id: "it1", name: "Lemon", price: 129, veg: true },
    { id: "it2", name: "Peach", price: 129, veg: true },
    { id: "it3", name: "Hibiscus Raspberry", price: 149, veg: true },
    { id: "it4", name: "Cranberry", price: 149, veg: true },
  ],
  "Big-Boy Burgers": [
    { id: "bg1", name: "Crispy Veg Burger", price: 99, veg: true, desc: "Juicy veg in-house patty with secret dressing in soft buns." },
    { id: "bg2", name: "Mexican Burger", price: 119, veg: true, desc: "Spicy vegetarian patty with nachos and salsa." },
    { id: "bg3", name: "Grilled Paneer Burger", price: 129, veg: true, bestseller: true, desc: "Smoky grilled cottage cheese with barbeque sauce." },
    { id: "bg4", name: "Cheese Lava Burger", price: 149, veg: true, desc: "Juicy veg patty with melted cheese and in-house sauce." },
  ],
  "Pasta": [
    { id: "pa1", name: "Red Sauce Pasta", price: 189, veg: true, desc: "Velvety in-house tomato sauce over perfectly cooked penne." },
    { id: "pa2", name: "Cheesy White Sauce Pasta", price: 199, veg: true, bestseller: true, desc: "Italian herbs, creamy white sauce, gourmet veggies." },
    { id: "pa3", name: "Pink Sauce Pasta", price: 199, veg: true },
    { id: "pa4", name: "Creamy Mushroom Pasta", price: 199, veg: true },
    { id: "pa5", name: "Baked Pasta (Red/White/Pink)", price: 249, veg: true, desc: "Extra creamy penne baked with mozzarella and Italian herbs." },
  ],
  "Pizzas": [
    { id: "pz1", name: "Classic Margherita", price: 199, veg: true },
    { id: "pz2", name: "Farmhouse", price: 229, veg: true },
    { id: "pz3", name: "Exotica", price: 229, veg: true },
    { id: "pz4", name: "Paneer Tikka Pizza", price: 249, veg: true, bestseller: true },
    { id: "pz5", name: "Caffeine Special Cheese Loaded", price: 279, veg: true },
  ],
  "Garlic Breads": [
    { id: "gb1", name: "Classic Garlic Bread", price: 79, veg: true, bestseller: true, desc: "Butter toast topped with melted cheese." },
    { id: "gb2", name: "Chilli Cheese Toast", price: 89, veg: true },
    { id: "gb3", name: "Corn & Mushroom Toast", price: 99, veg: true },
    { id: "gb4", name: "Paneer Tikka Toast", price: 99, veg: true },
  ],
  "Sandwiches": [
    { id: "sw1", name: "Classic Vegetable", price: 99, veg: true },
    { id: "sw2", name: "Peri-Peri Double Cheese", price: 129, veg: true },
    { id: "sw3", name: "Paneer Tikka & Corn", price: 149, veg: true, bestseller: true },
    { id: "sw4", name: "Grilled Paneer", price: 149, veg: true },
    { id: "sw5", name: "Cheesy Pizza Sandwich", price: 149, veg: true },
  ],
  "Nachos": [
    { id: "na1", name: "Veg Loaded Nachos", price: 129, veg: true },
    { id: "na2", name: "Corn & Peanut Nachos", price: 149, veg: true },
    { id: "na3", name: "Chatpati Nachos Bhel", price: 159, veg: true },
    { id: "na4", name: "Loaded Paneer Nachos", price: 169, veg: true },
    { id: "na5", name: "Cheese Loaded Baked Nachos", price: 199, veg: true },
  ],
  "Momos (5 pcs)": [
    { id: "mo1", name: "Steam Veg", price: 99, veg: true },
    { id: "mo2", name: "Steam Paneer", price: 109, veg: true },
    { id: "mo3", name: "Crispy Fried Veg", price: 129, veg: true },
    { id: "mo4", name: "Crispy Fried Paneer", price: 139, veg: true },
    { id: "mo5", name: "Chilli Garlic Pan Fried Veg", price: 139, veg: true },
    { id: "mo6", name: "Cheese Loaded Creamy Paneer", price: 159, veg: true, bestseller: true },
  ],
  "Gourmet Subs": [
    { id: "su1", name: "Mix-Veg Crispy Sub", price: 179, veg: true },
    { id: "su2", name: "Corn & Mushroom Sub", price: 179, veg: true },
    { id: "su3", name: "Paneer Tikka Sub", price: 189, veg: true, bestseller: true, desc: "Tandoori paneer with sauces in freshly baked bread." },
    { id: "su4", name: "Crunchy Mexican Sub", price: 189, veg: true },
    { id: "su5", name: "Smoked BBQ Paneer Sub", price: 189, veg: true },
    { id: "su6", name: "Falafel Sub", price: 189, veg: true },
  ],
  "Yumilicious Fries": [
    { id: "fr1", name: "Classic French Fries", price: 119, veg: true },
    { id: "fr2", name: "Peri-Peri Fries", price: 129, veg: true },
    { id: "fr3", name: "Tandoori French Fries", price: 149, veg: true },
    { id: "fr4", name: "Cheese Overloaded Fries", price: 149, veg: true, bestseller: true },
    { id: "fr5", name: "Crispy Honey Chilli Potato", price: 169, veg: true },
    { id: "fr6", name: "Chunky Chilli Paneer", price: 199, veg: true },
  ],
  "Brownies": [
    { id: "br1", name: "Walnut Brownie", price: 119, veg: true },
    { id: "br2", name: "Biscoff Brownie", price: 139, veg: true },
    { id: "br3", name: "Brownie with Ice-Cream", price: 159, veg: true, bestseller: true, desc: "Warm fudgy brownie, cold vanilla ice cream. Pure magic." },
  ],
  "Cake Slice": [
    { id: "cs1", name: "Pineapple Slice", price: 55, veg: true },
    { id: "cs2", name: "Blackforest Slice", price: 65, veg: true },
    { id: "cs3", name: "Butterscotch Slice", price: 65, veg: true },
    { id: "cs4", name: "Chocolate Truffle Slice", price: 89, veg: true, bestseller: true },
    { id: "cs5", name: "Triple Chocolate Slice", price: 99, veg: true },
  ],
  "Cookies": [
    { id: "ck1", name: "Chocochip Nutella Cookie", price: 49, veg: true },
    { id: "ck2", name: "Choco Walnut Cookie", price: 49, veg: true },
    { id: "ck3", name: "Oatmeal Cookie", price: 49, veg: true },
    { id: "ck4", name: "Red Velvet Cookie", price: 49, veg: true },
  ],
  "Specials": [
    { id: "sp1", name: "Cappuccino with Flowers", price: 299, veg: true, bestseller: true },
    { id: "sp2", name: "Cold Coffee with Flowers", price: 349, veg: true },
    { id: "sp3", name: "Bento Cake with Rose", price: 449, veg: true },
    { id: "sp4", name: "Bento with Flowers Hamper", price: 699, veg: true },
  ],
};

const POPULAR_ITEMS = [
  { id: "hb11", name: "Hot Chocolate", price: 149, emoji: "☕", tag: "Best Seller" },
  { id: "hb5", name: "Cappuccino", price: 129, emoji: "☕", tag: "Fan Favourite" },
  { id: "cb9", name: "Vietnamese Cold Coffee", price: 199, emoji: "🧋", tag: "Must Try" },
  { id: "pa2", name: "White Sauce Pasta", price: 199, emoji: "🍝", tag: "Top Pick" },
  { id: "gb1", name: "Classic Garlic Bread", price: 79, emoji: "🥖", tag: "Crowd Favourite" },
  { id: "su3", name: "Paneer Tikka Sub", price: 189, emoji: "🥙", tag: "Bestseller" },
  { id: "bg3", name: "Grilled Paneer Burger", price: 129, emoji: "🍔", tag: "Popular" },
  { id: "br3", name: "Brownie with Ice-Cream", price: 159, emoji: "🍫", tag: "Dessert Star" },
];

const REVIEWS = [
  { name: "Areena Fatima", rating: 5, text: "Best hot chocolate in town with a cosy, warm ambience. Absolutely loved every sip!", avatar: "AF" },
  { name: "Sahil Ahuja", rating: 5, text: "One of the best Instagrammable cafés in Aligarh. Cozy space to hang out with friends and great food!", avatar: "SA" },
  { name: "Ekansh Gupta", rating: 5, text: "Perfect for coffee dates! White sauce pasta was yummy and the cappuccinos were warm and justified the café name.", avatar: "EG" },
  { name: "Kuldeep Sharma", rating: 5, text: "One of the best places in Aligarh. Really high quality food — the staff behaviour and service is commendable!", avatar: "KS" },
  { name: "Vineet Sharma", rating: 5, text: "Best café in Aligarh — hot chocolate is a must try. Highly recommend!", avatar: "VS" },
  { name: "Ananya Rastogi", rating: 5, text: "Such a cozy and welcoming vibe. The food was fresh, flavorful, and beautifully presented.", avatar: "AR" },
  { name: "Abuzar Khan", rating: 5, text: "Perfectly made cappuccino and an amazing playlist that suits every mood. Great atmosphere!", avatar: "AK" },
  { name: "Naima Nazir", rating: 5, text: "I love the Vietnamese styled cold coffee. Just in love with the cozy vibes every single time.", avatar: "NN" },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <div style={{ display: "flex", color: "#D4A574" }}>
        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)} />)}
      </div>
      <span style={{ color: "#D4A574", fontWeight: "700", fontSize: "14px" }}>{rating}</span>
      {count && <span style={{ color: "#9CA3AF", fontSize: "13px" }}>({count} reviews)</span>}
    </div>
  );
}

function VegBadge() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "3px",
      fontSize: "10px", fontWeight: "700", color: "#16a34a",
      border: "1.5px solid #16a34a", borderRadius: "3px",
      padding: "1px 5px", letterSpacing: "0.05em"
    }}>
      <span style={{ width: 7, height: 7, background: "#16a34a", borderRadius: "50%", display: "inline-block" }} />
      VEG
    </span>
  );
}

function BestsellerBadge() {
  return (
    <span style={{
      fontSize: "10px", fontWeight: "800", color: "#D4A574",
      background: "rgba(212,165,116,0.12)", border: "1px solid rgba(212,165,116,0.3)",
      borderRadius: "12px", padding: "2px 8px", letterSpacing: "0.08em"
    }}>
      ★ BESTSELLER
    </span>
  );
}

function MenuCard({ item, onAdd, qty, onInc, onDec }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "14px", padding: "16px", display: "flex", justifyContent: "space-between",
      alignItems: "flex-end", gap: "12px", transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(212,165,116,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
          {item.veg && <VegBadge />}
          {item.bestseller && <BestsellerBadge />}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: "600", color: "#F5F0E8", marginBottom: "3px", lineHeight: "1.3" }}>{item.name}</div>
        {item.desc && <div style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: "1.4", marginBottom: "4px" }}>{item.desc}</div>}
        <div style={{ fontWeight: "700", color: "#D4A574", fontSize: "15px" }}>₹{item.price}</div>
      </div>
      <div style={{ flexShrink: 0 }}>
        {qty > 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.3)", borderRadius: "24px", padding: "4px 10px" }}>
            <button onClick={onDec} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "none", background: "rgba(212,165,116,0.2)", color: "#D4A574", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>−</button>
            <span style={{ color: "#F5F0E8", fontWeight: "700", minWidth: "18px", textAlign: "center" }}>{qty}</span>
            <button onClick={onInc} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "none", background: "#D4A574", color: "#1A0F0A", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>+</button>
          </div>
        ) : (
          <button onClick={onAdd} style={{
            background: "transparent", border: "1.5px solid #D4A574", color: "#D4A574",
            borderRadius: "24px", padding: "6px 18px", fontSize: "13px", fontWeight: "700",
            cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.05em"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#D4A574"; e.currentTarget.style.color = "#1A0F0A"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#D4A574"; }}
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function CaffeineAligarh() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderType, setOrderType] = useState("dine-in");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [menuCategory, setMenuCategory] = useState("All");
  const [reservationDone, setReservationDone] = useState(false);
  const [reservation, setReservation] = useState({ date: "", time: "", people: "2", occasion: "casual", name: "", phone: "" });
  const [orderDetails, setOrderDetails] = useState({ name: "", phone: "", address: "", payment: "cash" });
  const [reviewIdx, setReviewIdx] = useState(0);
  const heroRef = useRef(null);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Review carousel
  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const addToCart = (item) => setCart(c => ({ ...c, [item.id]: { ...item, qty: (c[item.id]?.qty || 0) + 1 } }));
  const removeFromCart = (id) => setCart(c => { const n = { ...c }; if (n[id].qty > 1) n[id] = { ...n[id], qty: n[id].qty - 1 }; else delete n[id]; return n; });
  const clearCart = () => setCart({});

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);
  const subtotal = cartItems.reduce((a, i) => a + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const filteredMenu = Object.entries(MENU).reduce((acc, [cat, items]) => {
    if (menuCategory !== "All" && cat !== menuCategory) return acc;
    const filtered = items.filter(i =>
      i.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      (i.desc || "").toLowerCase().includes(menuSearch.toLowerCase())
    );
    if (filtered.length) acc[cat] = filtered;
    return acc;
  }, {});

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "order", label: "Order" },
    { id: "reserve", label: "Reserve" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ];

  const styles = {
    body: {
      fontFamily: "'DM Sans', sans-serif",
      background: "#0F0A07",
      color: "#F5F0E8",
      minHeight: "100vh",
      position: "relative",
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(15,10,7,0.92)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(212,165,116,0.1)",
      padding: "0 24px", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    logo: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "20px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.02em",
      cursor: "pointer"
    },
    navLinks: {
      display: "flex", gap: "4px", alignItems: "center"
    },
    navLink: (active) => ({
      background: "none", border: "none", cursor: "pointer",
      padding: "6px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "500",
      color: active ? "#D4A574" : "#9CA3AF", letterSpacing: "0.03em",
      transition: "all 0.2s",
      background: active ? "rgba(212,165,116,0.08)" : "transparent",
    }),
    cartBtn: {
      position: "relative", background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.3)",
      borderRadius: "10px", padding: "8px 14px", cursor: "pointer", color: "#D4A574",
      display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "700",
      transition: "all 0.2s",
    },
    primaryBtn: {
      background: "linear-gradient(135deg, #D4A574, #B8864E)",
      color: "#1A0F0A", border: "none", borderRadius: "12px", padding: "14px 28px",
      fontSize: "15px", fontWeight: "800", cursor: "pointer", letterSpacing: "0.03em",
      transition: "all 0.2s", boxShadow: "0 4px 20px rgba(212,165,116,0.3)",
    },
    outlineBtn: {
      background: "transparent", color: "#D4A574",
      border: "1.5px solid rgba(212,165,116,0.6)", borderRadius: "12px", padding: "13px 24px",
      fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.03em",
      transition: "all 0.2s",
    },
    section: {
      maxWidth: "1100px", margin: "0 auto", padding: "80px 24px",
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "700", color: "#F5F0E8",
      marginBottom: "8px", lineHeight: "1.2",
    },
    sectionSub: {
      color: "#9CA3AF", fontSize: "15px", marginBottom: "48px",
    },
    input: {
      width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "10px", padding: "12px 16px", color: "#F5F0E8", fontSize: "15px",
      outline: "none", boxSizing: "border-box",
      transition: "border-color 0.2s",
    },
    label: {
      display: "block", fontSize: "12px", fontWeight: "700", color: "#9CA3AF",
      marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase",
    },
  };

  // ─── PAGES ──────────────────────────────────────────────────────────────────

  const renderHome = () => (
    <div>
      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div ref={heroRef} style={{
          position: "absolute", inset: 0, willChange: "transform",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,165,116,0.08) 0%, transparent 70%)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(212,165,116,0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(139,90,43,0.08) 0%, transparent 50%)
            `,
          }} />
          {/* Coffee steam animation */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: "absolute",
              left: `${42 + i * 6}%`, bottom: "35%",
              width: "2px", height: "60px",
              background: "linear-gradient(to top, rgba(212,165,116,0.4), transparent)",
              borderRadius: "1px",
              animation: `steam ${2 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              transform: "translateX(-50%)",
            }} />
          ))}
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(15,10,7,0.3) 0%, rgba(15,10,7,0.2) 50%, rgba(15,10,7,0.9) 100%)"
        }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: "800px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: "24px", padding: "6px 16px", marginBottom: "24px" }}>
            <div style={{ width: "8px", height: "8px", background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "13px", color: "#D4A574", fontWeight: "600" }}>Open Now · Closes 12 AM</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 10vw, 80px)", fontWeight: "700", lineHeight: "1.1", marginBottom: "20px", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#F5F0E8" }}>Cozy Café Vibes,</span><br />
            <span style={{ background: "linear-gradient(135deg, #D4A574, #F5D9B8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Handcrafted Coffee</span>
          </div>
          <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#D1C5B8", marginBottom: "12px", lineHeight: "1.6" }}>
            Aligarh's most loved café — perfect for coffee dates, friends & work sessions.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "36px", flexWrap: "wrap" }}>
            <StarRating rating={4.8} count={775} />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <span style={{ color: "#9CA3AF", fontSize: "13px" }}>₹200–400 per person</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <span style={{ color: "#9CA3AF", fontSize: "13px" }}>Square Tower, Marris Rd</span>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={styles.primaryBtn} onClick={() => setPage("order")}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >☕ Order Now</button>
            <button style={styles.outlineBtn} onClick={() => setPage("reserve")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,165,116,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
            >Reserve a Table</button>
            <button style={{ ...styles.outlineBtn, borderColor: "rgba(255,255,255,0.2)", color: "#9CA3AF" }} onClick={() => setPage("menu")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
            >View Menu</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#6B7280", letterSpacing: "0.1em" }}>SCROLL</span>
          <div style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, rgba(212,165,116,0.5), transparent)" }} />
        </div>
      </div>

      {/* Quick Info Bar */}
      <div style={{ background: "rgba(212,165,116,0.05)", borderTop: "1px solid rgba(212,165,116,0.1)", borderBottom: "1px solid rgba(212,165,116,0.1)", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { icon: "📍", text: "Square Tower, Marris Rd, Aligarh" },
            { icon: "⏰", text: "Open daily · Closes 12 AM" },
            { icon: "💰", text: "₹200–400 per person" },
            { icon: "⭐", text: "4.8 · 775 reviews" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#D1C5B8" }}>
              <span>{item.icon}</span><span>{item.text}</span>
            </div>
          ))}
          <a href="tel:09897618833" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.25)", borderRadius: "20px", padding: "6px 14px", color: "#D4A574", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>
            <PhoneIcon /> Call Now
          </a>
        </div>
      </div>

      {/* Popular Items */}
      <div style={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>MOST LOVED</div>
          <h2 style={styles.sectionTitle}>Our Signature Favourites</h2>
          <p style={styles.sectionSub}>The items that keep our guests coming back for more.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {POPULAR_ITEMS.map(item => (
            <div key={item.id} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px", padding: "24px 20px", textAlign: "center", cursor: "pointer",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,165,116,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(212,165,116,0.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onClick={() => setPage("menu")}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{item.emoji}</div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.1em", marginBottom: "6px" }}>{item.tag}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#F5F0E8", marginBottom: "8px" }}>{item.name}</div>
              <div style={{ fontWeight: "700", color: "#D4A574", fontSize: "16px" }}>₹{item.price}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button style={styles.outlineBtn} onClick={() => setPage("menu")}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(212,165,116,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >Explore Full Menu →</button>
        </div>
      </div>

      {/* Why People Love Us */}
      <div style={{ background: "rgba(212,165,116,0.03)", borderTop: "1px solid rgba(212,165,116,0.08)", borderBottom: "1px solid rgba(212,165,116,0.08)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>WHY PEOPLE LOVE US</div>
            <h2 style={styles.sectionTitle}>More Than Just Coffee</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🛋️", title: "Cozy Ambience", desc: "Warm, intimate spaces perfect for relaxing or catching up." },
              { icon: "🤗", title: "Warm Hospitality", desc: "Staff that makes you feel genuinely welcome every visit." },
              { icon: "☕", title: "Great Coffee", desc: "Blue Tokai beans brewed with precision and heart." },
              { icon: "📸", title: "Instagram-Worthy", desc: "Every corner is a photo waiting to happen." },
              { icon: "💰", title: "Affordable Prices", desc: "Premium quality at pocket-friendly prices, always." },
              { icon: "🍝", title: "Comfort Food", desc: "Pasta, burgers, subs — food that hugs your soul." },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: "28px 16px" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", color: "#F5F0E8", marginBottom: "8px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: "#9CA3AF", lineHeight: "1.5" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Carousel */}
      <div style={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>WHAT GUESTS SAY</div>
          <h2 style={styles.sectionTitle}>4.8 Stars, 775 Reviews</h2>
        </div>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "48px 40px", maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "48px", color: "rgba(212,165,116,0.2)", fontFamily: "Georgia, serif", position: "absolute", top: "20px", left: "32px", lineHeight: 1 }}>"</div>
          <p style={{ fontSize: "18px", color: "#D1C5B8", lineHeight: "1.7", marginBottom: "24px", fontStyle: "italic", paddingTop: "16px" }}>
            {REVIEWS[reviewIdx].text}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #D4A574, #B8864E)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px", color: "#1A0F0A" }}>
              {REVIEWS[reviewIdx].avatar}
            </div>
            <div>
              <div style={{ fontWeight: "700", color: "#F5F0E8", fontSize: "15px" }}>{REVIEWS[reviewIdx].name}</div>
              <div style={{ display: "flex", color: "#D4A574" }}>{[1,2,3,4,5].map(i => <StarIcon key={i} filled={true} />)}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "24px" }}>
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setReviewIdx(i)} style={{ width: i === reviewIdx ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === reviewIdx ? "#D4A574" : "rgba(212,165,116,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button style={styles.outlineBtn} onClick={() => setPage("reviews")}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(212,165,116,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >Read All Reviews</button>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, rgba(212,165,116,0.1), rgba(139,90,43,0.08))", border: "1px solid rgba(212,165,116,0.15)", margin: "0 24px 80px", borderRadius: "24px", padding: "64px 40px", textAlign: "center", maxWidth: "1052px", marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "12px" }}>JOIN US TODAY</div>
        <h2 style={{ ...styles.sectionTitle, marginBottom: "12px" }}>Ready for Your Coffee Fix?</h2>
        <p style={{ color: "#9CA3AF", marginBottom: "32px", fontSize: "15px" }}>Order online, reserve your table, or just walk in. We're always ready.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={styles.primaryBtn} onClick={() => setPage("order")}>Order Now</button>
          <button style={styles.outlineBtn} onClick={() => setPage("reserve")}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(212,165,116,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >Reserve Table</button>
          <a href="https://maps.google.com?q=Caffeine+Aligarh+Square+Tower+Marris+Road" target="_blank" rel="noreferrer"
            style={{ ...styles.outlineBtn, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderColor: "rgba(255,255,255,0.2)", color: "#9CA3AF" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          ><MapIcon /> Get Directions</a>
        </div>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div style={{ ...styles.section, paddingTop: "100px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>EXPLORE</div>
        <h1 style={styles.sectionTitle}>Our Full Menu</h1>
        <p style={{ color: "#9CA3AF", fontSize: "15px" }}>All items are vegetarian. Prices inclusive of all charges.</p>
      </div>
      {/* Search */}
      <div style={{ position: "sticky", top: "60px", zIndex: 50, background: "rgba(15,10,7,0.95)", backdropFilter: "blur(10px)", paddingBottom: "16px", paddingTop: "16px", marginBottom: "8px" }}>
        <input
          style={{ ...styles.input, marginBottom: "12px" }}
          placeholder="Search menu items..."
          value={menuSearch}
          onChange={e => setMenuSearch(e.target.value)}
          onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {["All", ...Object.keys(MENU)].map(cat => (
            <button key={cat} onClick={() => setMenuCategory(cat)} style={{
              whiteSpace: "nowrap", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
              border: `1px solid ${menuCategory === cat ? "rgba(212,165,116,0.6)" : "rgba(255,255,255,0.1)"}`,
              background: menuCategory === cat ? "rgba(212,165,116,0.1)" : "transparent",
              color: menuCategory === cat ? "#D4A574" : "#9CA3AF", cursor: "pointer", transition: "all 0.2s",
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      {Object.entries(filteredMenu).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700", color: "#D4A574", marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(212,165,116,0.12)" }}>
            {cat}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
            {items.map(item => (
              <MenuCard
                key={item.id} item={item}
                qty={cart[item.id]?.qty || 0}
                onAdd={() => addToCart(item)}
                onInc={() => addToCart(item)}
                onDec={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
      {Object.keys(filteredMenu).length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#6B7280" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <p>No items found for "{menuSearch}"</p>
        </div>
      )}
    </div>
  );

  const renderOrder = () => {
    if (orderPlaced) return (
      <div style={{ ...styles.section, paddingTop: "120px", textAlign: "center" }}>
        <div style={{ fontSize: "80px", marginBottom: "24px" }}>🎉</div>
        <h2 style={{ ...styles.sectionTitle, marginBottom: "12px" }}>Order Placed!</h2>
        <p style={{ color: "#9CA3AF", marginBottom: "8px", fontSize: "16px" }}>Thank you, {orderDetails.name || "Guest"}! Your order is confirmed.</p>
        <p style={{ color: "#D4A574", marginBottom: "40px", fontSize: "15px" }}>We'll prepare your order with love ☕</p>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", maxWidth: "420px", margin: "0 auto 40px", textAlign: "left" }}>
          <div style={{ fontSize: "13px", color: "#9CA3AF", marginBottom: "16px", fontWeight: "700", letterSpacing: "0.08em" }}>ORDER STATUS</div>
          {[
            { status: "✅ Order Confirmed", done: true },
            { status: "⏳ Preparing your order...", done: false },
            { status: "🚀 Ready for pickup / delivery", done: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span>{s.status}</span>
            </div>
          ))}
          <div style={{ marginTop: "20px", padding: "16px", background: "rgba(212,165,116,0.06)", borderRadius: "10px" }}>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "4px" }}>ORDER TOTAL</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#D4A574" }}>₹{total}</div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>Payment: {orderDetails.payment === "cash" ? "Cash on Delivery" : "Online Payment"}</div>
          </div>
        </div>
        <button style={styles.primaryBtn} onClick={() => { setOrderPlaced(false); clearCart(); setPage("home"); }}>Back to Home</button>
      </div>
    );

    return (
      <div style={{ ...styles.section, paddingTop: "100px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>PLACE YOUR ORDER</div>
          <h1 style={styles.sectionTitle}>Order Online</h1>
          <p style={{ color: "#9CA3AF", fontSize: "15px" }}>Dine-in, takeaway, or delivery — we've got you.</p>
        </div>

        {/* Order type */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
          {["dine-in", "takeaway", "delivery"].map(type => (
            <button key={type} onClick={() => setOrderType(type)} style={{
              padding: "10px 20px", borderRadius: "24px", border: `1.5px solid ${orderType === type ? "#D4A574" : "rgba(255,255,255,0.1)"}`,
              background: orderType === type ? "rgba(212,165,116,0.1)" : "transparent",
              color: orderType === type ? "#D4A574" : "#9CA3AF", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize",
            }}>
              {type === "dine-in" ? "🪑 Dine-In" : type === "takeaway" ? "🥡 Takeaway" : "🛵 Delivery"}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: cartItems.length ? "1fr 360px" : "1fr", gap: "32px", alignItems: "start" }}>
          {/* Menu Browse */}
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8", marginBottom: "16px" }}>Add Items to Cart</div>
            <input
              style={{ ...styles.input, marginBottom: "16px" }}
              placeholder="Search menu..."
              value={menuSearch}
              onChange={e => setMenuSearch(e.target.value)}
              onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            {Object.entries(filteredMenu).slice(0, 6).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#D4A574", marginBottom: "10px", letterSpacing: "0.05em" }}>{cat}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {items.map(item => (
                    <MenuCard key={item.id} item={item} qty={cart[item.id]?.qty || 0}
                      onAdd={() => addToCart(item)} onInc={() => addToCart(item)} onDec={() => removeFromCart(item.id)} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart + Checkout */}
          {cartItems.length > 0 && (
            <div style={{ position: "sticky", top: "80px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8", marginBottom: "16px" }}>Your Order</div>
              <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "16px" }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <div style={{ fontSize: "14px", color: "#F5F0E8" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "#9CA3AF" }}>₹{item.price} × {item.qty}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#D4A574", fontWeight: "700" }}>₹{item.price * item.qty}</span>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "16px" }}>−</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#9CA3AF", marginBottom: "6px" }}>
                  <span>Subtotal</span><span>₹{subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#9CA3AF", marginBottom: "12px" }}>
                  <span>GST (5%)</span><span>₹{tax}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "800", color: "#F5F0E8", marginBottom: "20px" }}>
                  <span>Total</span><span style={{ color: "#D4A574" }}>₹{total}</span>
                </div>
              </div>
              {/* Customer Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={styles.label}>Your Name</label>
                  <input style={styles.input} placeholder="Enter your name" value={orderDetails.name} onChange={e => setOrderDetails(d => ({ ...d, name: e.target.value }))} onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label style={styles.label}>Phone Number</label>
                  <input style={styles.input} placeholder="10-digit mobile number" value={orderDetails.phone} onChange={e => setOrderDetails(d => ({ ...d, phone: e.target.value }))} onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                {orderType === "delivery" && (
                  <div>
                    <label style={styles.label}>Delivery Address</label>
                    <textarea style={{ ...styles.input, resize: "vertical", minHeight: "70px" }} placeholder="Enter your full address" value={orderDetails.address} onChange={e => setOrderDetails(d => ({ ...d, address: e.target.value }))} onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                )}
                <div>
                  <label style={styles.label}>Payment Method</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[{ id: "cash", label: "💵 Cash" }, { id: "upi", label: "📱 UPI" }, { id: "card", label: "💳 Card" }].map(pm => (
                      <button key={pm.id} onClick={() => setOrderDetails(d => ({ ...d, payment: pm.id }))} style={{
                        flex: 1, padding: "8px", borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                        border: `1px solid ${orderDetails.payment === pm.id ? "rgba(212,165,116,0.5)" : "rgba(255,255,255,0.1)"}`,
                        background: orderDetails.payment === pm.id ? "rgba(212,165,116,0.08)" : "transparent",
                        color: orderDetails.payment === pm.id ? "#D4A574" : "#9CA3AF", cursor: "pointer",
                      }}>{pm.label}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button style={{ ...styles.primaryBtn, width: "100%", justifyContent: "center", display: "flex" }}
                onClick={() => { if (orderDetails.name && orderDetails.phone) setOrderPlaced(true); else alert("Please enter your name and phone number."); }}>
                Place Order · ₹{total}
              </button>
            </div>
          )}
        </div>

        {cartItems.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px dashed rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛒</div>
            <p style={{ color: "#6B7280" }}>Your cart is empty. Browse the menu above to add items!</p>
          </div>
        )}
      </div>
    );
  };

  const renderReserve = () => {
    if (reservationDone) return (
      <div style={{ ...styles.section, paddingTop: "120px", textAlign: "center" }}>
        <div style={{ fontSize: "80px", marginBottom: "24px" }}>☕</div>
        <h2 style={{ ...styles.sectionTitle, marginBottom: "12px" }}>Table Reserved!</h2>
        <p style={{ color: "#9CA3AF", marginBottom: "8px", fontSize: "16px" }}>We're excited to have you, {reservation.name}!</p>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,165,116,0.15)", borderRadius: "16px", padding: "28px", maxWidth: "360px", margin: "24px auto 40px", textAlign: "left" }}>
          {[
            { label: "Date", value: reservation.date },
            { label: "Time", value: reservation.time },
            { label: "Guests", value: `${reservation.people} people` },
            { label: "Occasion", value: reservation.occasion.charAt(0).toUpperCase() + reservation.occasion.slice(1) },
            { label: "Phone", value: reservation.phone },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none", fontSize: "14px" }}>
              <span style={{ color: "#9CA3AF" }}>{row.label}</span>
              <span style={{ color: "#F5F0E8", fontWeight: "600" }}>{row.value}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#D4A574", marginBottom: "32px", fontSize: "13px" }}>We'll confirm via WhatsApp/call on {reservation.phone}</p>
        <button style={styles.primaryBtn} onClick={() => { setReservationDone(false); setPage("home"); }}>Back to Home</button>
      </div>
    );

    return (
      <div style={{ ...styles.section, paddingTop: "100px", maxWidth: "640px" }}>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>BOOK YOUR SPOT</div>
          <h1 style={styles.sectionTitle}>Reserve a Table</h1>
          <p style={{ color: "#9CA3AF", fontSize: "15px" }}>Perfect for dates, celebrations, and peaceful work sessions.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={styles.label}>Date</label>
              <input type="date" style={styles.input} value={reservation.date} min={new Date().toISOString().split("T")[0]} onChange={e => setReservation(r => ({ ...r, date: e.target.value }))} onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label style={styles.label}>Time</label>
              <select style={{ ...styles.input, cursor: "pointer" }} value={reservation.time} onChange={e => setReservation(r => ({ ...r, time: e.target.value }))}>
                <option value="">Select time</option>
                {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"].map(t => (
                  <option key={t} value={t} style={{ background: "#1A0F0A" }}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={styles.label}>Number of Guests</label>
              <select style={{ ...styles.input, cursor: "pointer" }} value={reservation.people} onChange={e => setReservation(r => ({ ...r, people: e.target.value }))}>
                {["1", "2", "3", "4", "5", "6", "7", "8"].map(n => (
                  <option key={n} value={n} style={{ background: "#1A0F0A" }}>{n} {n === "1" ? "person" : "people"}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={styles.label}>Occasion</label>
              <select style={{ ...styles.input, cursor: "pointer" }} value={reservation.occasion} onChange={e => setReservation(r => ({ ...r, occasion: e.target.value }))}>
                {["casual", "birthday", "anniversary", "date", "business", "family", "friends"].map(o => (
                  <option key={o} value={o} style={{ background: "#1A0F0A" }}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label style={styles.label}>Your Name</label>
            <input style={styles.input} placeholder="Enter your full name" value={reservation.name} onChange={e => setReservation(r => ({ ...r, name: e.target.value }))} onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <div>
            <label style={styles.label}>Phone Number</label>
            <input style={styles.input} placeholder="10-digit mobile number" value={reservation.phone} onChange={e => setReservation(r => ({ ...r, phone: e.target.value }))} onFocus={e => e.target.style.borderColor = "rgba(212,165,116,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <button style={{ ...styles.primaryBtn, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            onClick={() => {
              if (reservation.date && reservation.time && reservation.name && reservation.phone) setReservationDone(true);
              else alert("Please fill in all required fields.");
            }}>
            Confirm Reservation
          </button>
          <div style={{ display: "flex", gap: "16px", padding: "16px", background: "rgba(212,165,116,0.05)", borderRadius: "12px", border: "1px solid rgba(212,165,116,0.1)" }}>
            <div style={{ fontSize: "24px" }}>📞</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#D4A574", marginBottom: "4px" }}>Prefer to call?</div>
              <div style={{ fontSize: "13px", color: "#9CA3AF" }}>Reach us at <a href="tel:09897618833" style={{ color: "#D4A574" }}>098976 18833</a> or book via <a href="https://zomato.com" target="_blank" rel="noreferrer" style={{ color: "#D4A574" }}>Zomato</a> / <a href="https://eazydiner.com" target="_blank" rel="noreferrer" style={{ color: "#D4A574" }}>EazyDiner</a>.</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReviews = () => (
    <div style={{ ...styles.section, paddingTop: "100px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>GUEST REVIEWS</div>
        <h1 style={styles.sectionTitle}>What Our Guests Say</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
          <StarRating rating={4.8} count={775} />
          <div style={{ fontSize: "14px", color: "#9CA3AF" }}>Based on Google Reviews</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {REVIEWS.map((review, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,165,116,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", color: "#D4A574", marginBottom: "12px" }}>
              {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= review.rating} />)}
            </div>
            <p style={{ fontSize: "14px", color: "#D1C5B8", lineHeight: "1.6", marginBottom: "16px", fontStyle: "italic" }}>"{review.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #D4A574, #B8864E)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", color: "#1A0F0A" }}>
                {review.avatar}
              </div>
              <span style={{ fontWeight: "700", color: "#F5F0E8", fontSize: "14px" }}>{review.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "48px", textAlign: "center", background: "rgba(212,165,116,0.04)", borderRadius: "16px", padding: "32px", border: "1px solid rgba(212,165,116,0.1)" }}>
        <p style={{ color: "#9CA3AF", marginBottom: "16px" }}>Visited us? We'd love to hear from you!</p>
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ ...styles.primaryBtn, display: "inline-block", textDecoration: "none" }}>Write a Review on Google</a>
      </div>
    </div>
  );

  const renderContact = () => (
    <div style={{ ...styles.section, paddingTop: "100px" }}>
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "8px" }}>GET IN TOUCH</div>
        <h1 style={styles.sectionTitle}>Find Us & Contact</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "60px" }}>
        {[
          { icon: "📍", title: "Address", content: "Shop No. 1, Square Tower\nMarris Rd, Begpur\nAligarh, UP 202001", action: { label: "Get Directions", url: "https://maps.google.com?q=Caffeine+Aligarh+Square+Tower+Marris+Road+Aligarh" } },
          { icon: "📞", title: "Phone", content: "098976 18833\n\nCall us anytime!\nOpen daily · Closes 12 AM", action: { label: "Call Now", url: "tel:09897618833" } },
          { icon: "🕐", title: "Hours", content: "Monday – Sunday\nOpen Daily\n\nCloses at 12:00 AM midnight", action: null },
          { icon: "💰", title: "Pricing", content: "₹200 – ₹400\nper person\n\nAll items are vegetarian", action: { label: "View Menu", onClick: () => setPage("menu") } },
        ].map((card, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{card.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F5F0E8", marginBottom: "8px" }}>{card.title}</div>
            <div style={{ fontSize: "14px", color: "#9CA3AF", lineHeight: "1.7", whiteSpace: "pre-line", marginBottom: card.action ? "16px" : "0" }}>{card.content}</div>
            {card.action && (
              card.action.url ? (
                <a href={card.action.url} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "#D4A574", fontWeight: "700", textDecoration: "none" }}>{card.action.label} →</a>
              ) : (
                <button onClick={card.action.onClick} style={{ background: "none", border: "none", fontSize: "13px", color: "#D4A574", fontWeight: "700", cursor: "pointer", padding: 0 }}>{card.action.label} →</button>
              )
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: "60px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "12px" }}>FAQ</div>
        <h2 style={{ ...styles.sectionTitle, marginBottom: "32px", fontSize: "28px" }}>Common Questions</h2>
        {[
          { q: "Do you take reservations?", a: "Yes! You can reserve online via our website, call us directly, or book through Zomato and EazyDiner." },
          { q: "Do you offer delivery?", a: "Yes, we offer delivery through our website. You can also order via Zomato or other platforms." },
          { q: "Is your menu fully vegetarian?", a: "Yes, our entire menu is 100% vegetarian — perfect for everyone!" },
          { q: "What are your busiest times?", a: "Evenings (7–10 PM) tend to be busiest. We recommend visiting on weekday afternoons for a quieter experience." },
          { q: "Do you host birthday celebrations?", a: "Absolutely! We offer special arrangements for birthdays and anniversaries. Call us to plan ahead." },
          { q: "What payment methods do you accept?", a: "We accept cash, UPI, and card payments both in-store and for orders." },
        ].map((faq, i) => {
          const [open, setOpen] = useState(false);
          return (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "4px" }}>
              <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", textAlign: "left" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#F5F0E8" }}>{faq.q}</span>
                <span style={{ color: "#D4A574", fontSize: "20px", transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open && <p style={{ color: "#9CA3AF", fontSize: "14px", lineHeight: "1.6", paddingBottom: "16px", margin: 0 }}>{faq.a}</p>}
            </div>
          );
        })}
      </div>

      {/* About */}
      <div style={{ background: "rgba(212,165,116,0.04)", border: "1px solid rgba(212,165,116,0.1)", borderRadius: "20px", padding: "48px 40px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#D4A574", letterSpacing: "0.15em", marginBottom: "12px" }}>OUR STORY</div>
        <h2 style={{ ...styles.sectionTitle, fontSize: "28px", marginBottom: "16px" }}>Born from a Love of Coffee</h2>
        <p style={{ color: "#9CA3AF", lineHeight: "1.8", fontSize: "15px", maxWidth: "600px", marginBottom: "16px" }}>
          Caffeine Aligarh was born from a simple belief — that great coffee and genuine warmth can make any day better. 
          Nestled in Square Tower on Marris Road, we've become Aligarh's favourite café for coffee dates, 
          work sessions, celebrations, and late-night conversations.
        </p>
        <p style={{ color: "#9CA3AF", lineHeight: "1.8", fontSize: "15px", maxWidth: "600px" }}>
          We use premium Blue Tokai coffee beans, craft every item with care, and greet every guest like family. 
          With 775+ five-star reviews, we're not just a café — we're a community.
        </p>
      </div>
    </div>
  );

  // ─── CART DRAWER ─────────────────────────────────────────────────────────────

  const CartDrawer = () => (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setCartOpen(false)} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "#0F0A07", borderLeft: "1px solid rgba(212,165,116,0.1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8" }}>Your Cart ({cartCount})</span>
          <button onClick={() => setCartOpen(false)} style={{ background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "#9CA3AF" }}><CloseIcon /></button>
        </div>
        {cartItems.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>☕</div>
            <p style={{ color: "#6B7280", textAlign: "center" }}>Your cart is empty. Start adding some items!</p>
            <button style={{ ...styles.outlineBtn, marginTop: "20px" }} onClick={() => { setCartOpen(false); setPage("menu"); }}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", color: "#F5F0E8", fontWeight: "600", marginBottom: "4px" }}>{item.name}</div>
                    <div style={{ fontSize: "13px", color: "#D4A574" }}>₹{item.price}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button onClick={() => removeFromCart(item.id)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9CA3AF", cursor: "pointer", fontSize: "16px" }}>−</button>
                    <span style={{ color: "#F5F0E8", fontWeight: "700", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => addToCart(item)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "#D4A574", color: "#1A0F0A", cursor: "pointer", fontSize: "16px" }}>+</button>
                    <span style={{ color: "#9CA3AF", fontSize: "14px", minWidth: "50px", textAlign: "right" }}>₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px", color: "#9CA3AF" }}>
                <span>Subtotal</span><span>₹{subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#9CA3AF" }}>
                <span>GST (5%)</span><span>₹{tax}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "20px", fontWeight: "800", color: "#F5F0E8" }}>
                <span>Total</span><span style={{ color: "#D4A574" }}>₹{total}</span>
              </div>
              <button style={{ ...styles.primaryBtn, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => { setCartOpen(false); setPage("order"); }}>
                Proceed to Checkout
              </button>
              <button onClick={clearCart} style={{ width: "100%", background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "13px", marginTop: "12px", padding: "8px" }}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div style={styles.body}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,165,116,0.3); border-radius: 2px; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.7); }
        @keyframes steam {
          0%, 100% { transform: translateX(-50%) scaleX(1) translateY(0); opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.3; }
          100% { transform: translateX(-50%) scaleX(1.4) translateY(-40px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        select option { background: #1A0F0A !important; }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => setPage("home")}>Caffeine ☕</div>
        <div style={{ display: "flex", gap: "2px", alignItems: "center", overflowX: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={styles.navLink(page === item.id)}
              onMouseEnter={e => { if (page !== item.id) e.currentTarget.style.color = "#D4A574"; }}
              onMouseLeave={e => { if (page !== item.id) e.currentTarget.style.color = "#9CA3AF"; }}
            >{item.label}</button>
          ))}
        </div>
        <button style={styles.cartBtn} onClick={() => setCartOpen(true)}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,165,116,0.18)"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(212,165,116,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          <ShoppingBagIcon />
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#D4A574", color: "#1A0F0A", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
          )}
          {cartCount > 0 ? `₹${subtotal}` : "Cart"}
        </button>
      </nav>

      {/* PAGES */}
      <main>
        {page === "home" && renderHome()}
        {page === "menu" && renderMenu()}
        {page === "order" && renderOrder()}
        {page === "reserve" && renderReserve()}
        {page === "reviews" && renderReviews()}
        {page === "contact" && renderContact()}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "40px 24px", textAlign: "center", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#D4A574", marginBottom: "12px" }}>Caffeine Aligarh ☕</div>
        <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "8px" }}>Shop No. 1, Square Tower, Marris Rd, Begpur, Aligarh, UP 202001</p>
        <p style={{ color: "#6B7280", fontSize: "13px", marginBottom: "20px" }}>Open Daily · Closes 12 AM · 📞 098976 18833</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: "13px" }}>{item.label}</button>
          ))}
        </div>
        <p style={{ color: "#374151", fontSize: "12px", marginTop: "24px" }}>© 2026 Caffeine Aligarh. All rights reserved.</p>
      </footer>

      {/* FLOATING BUTTONS */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 90, display: "flex", flexDirection: "column", gap: "10px" }}>
        <a href="tel:09897618833" title="Call us" style={{
          width: "48px", height: "48px", borderRadius: "50%", background: "rgba(15,10,7,0.9)", border: "1px solid rgba(212,165,116,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A574", textDecoration: "none",
          backdropFilter: "blur(10px)", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#D4A574"; e.currentTarget.style.color = "#1A0F0A"; e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(15,10,7,0.9)"; e.currentTarget.style.color = "#D4A574"; e.currentTarget.style.transform = "scale(1)"; }}
        ><PhoneIcon /></a>
        <a href="https://maps.google.com?q=Caffeine+Aligarh+Square+Tower+Marris+Road" target="_blank" rel="noreferrer" title="Get directions" style={{
          width: "48px", height: "48px", borderRadius: "50%", background: "rgba(15,10,7,0.9)", border: "1px solid rgba(212,165,116,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A574", textDecoration: "none",
          backdropFilter: "blur(10px)", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#D4A574"; e.currentTarget.style.color = "#1A0F0A"; e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(15,10,7,0.9)"; e.currentTarget.style.color = "#D4A574"; e.currentTarget.style.transform = "scale(1)"; }}
        ><MapIcon /></a>
      </div>

      {/* CART DRAWER */}
      {cartOpen && <CartDrawer />}

      {/* MOBILE BOTTOM BAR */}
      {cartCount > 0 && !cartOpen && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 80,
          background: "rgba(15,10,7,0.97)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(212,165,116,0.2)", padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", letterSpacing: "0.05em" }}>{cartCount} item{cartCount !== 1 ? "s" : ""} in cart</div>
            <div style={{ fontWeight: "800", color: "#D4A574", fontSize: "18px" }}>₹{total}</div>
          </div>
          <button style={{ ...styles.primaryBtn, padding: "12px 24px" }} onClick={() => setCartOpen(true)}>View Cart</button>
        </div>
      )}
    </div>
  );
}
