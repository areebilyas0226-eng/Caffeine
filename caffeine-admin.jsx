import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const genId = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const now = () => new Date();
const fmtTime = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
const ago = (d) => {
  const s = Math.floor((now() - d) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
};

const SEED_ORDERS = [
  { id: genId(), customer: "Areena Fatima", phone: "9876543210", type: "dine-in", status: "new", items: [{ name: "Hot Chocolate", qty: 2, price: 149 }, { name: "White Sauce Pasta", qty: 1, price: 199 }], total: 519, payment: "upi", note: "Extra cheese on pasta please", createdAt: new Date(Date.now() - 2 * 60000), table: "T3" },
  { id: genId(), customer: "Sahil Ahuja", phone: "9812345678", type: "takeaway", status: "preparing", items: [{ name: "Vietnamese Cold Coffee", qty: 1, price: 199 }, { name: "Garlic Bread", qty: 2, price: 79 }, { name: "Brownie w/ Ice Cream", qty: 1, price: 159 }], total: 516, payment: "cash", note: "", createdAt: new Date(Date.now() - 8 * 60000) },
  { id: genId(), customer: "Ekansh Gupta", phone: "9765432109", type: "delivery", status: "ready", items: [{ name: "Cappuccino (S/L)", qty: 2, price: 129 }, { name: "Paneer Tikka Sub", qty: 1, price: 189 }], total: 468, payment: "upi", note: "Ring bell twice", address: "12 Civil Lines, Aligarh", createdAt: new Date(Date.now() - 18 * 60000) },
  { id: genId(), customer: "Kuldeep Sharma", phone: "9654321098", type: "dine-in", status: "served", items: [{ name: "Grilled Paneer Burger", qty: 2, price: 129 }, { name: "Peri-Peri Fries", qty: 1, price: 129 }], total: 387, payment: "card", note: "", createdAt: new Date(Date.now() - 35 * 60000), table: "T1" },
  { id: genId(), customer: "Vineet Sharma", phone: "9543210987", type: "delivery", status: "completed", items: [{ name: "Oreo Milkshake", qty: 2, price: 169 }, { name: "Cheese Lava Burger", qty: 1, price: 149 }], total: 487, payment: "cash", note: "", address: "AMU Road, Aligarh", createdAt: new Date(Date.now() - 70 * 60000) },
  { id: genId(), customer: "Naima Nazir", phone: "9432109876", type: "dine-in", status: "new", items: [{ name: "Biscoff Latte", qty: 1, price: 179 }, { name: "Pink Sauce Pasta", qty: 1, price: 199 }, { name: "Brownie", qty: 2, price: 119 }], total: 616, payment: "upi", note: "Birthday — please add candle 🕯️", createdAt: new Date(Date.now() - 1 * 60000), table: "T5" },
];

const SEED_BOOKINGS = [
  { id: genId(), name: "Priya Gautam", phone: "9876501234", date: "Today", time: "7:00 PM", people: 4, occasion: "Birthday", status: "confirmed", note: "Wants window seat", createdAt: new Date(Date.now() - 5 * 60000) },
  { id: genId(), name: "Mehul Singh", phone: "9765012345", date: "Today", time: "8:30 PM", people: 2, occasion: "Date", status: "confirmed", note: "", createdAt: new Date(Date.now() - 20 * 60000) },
  { id: genId(), name: "Ananya Rastogi", phone: "9654012345", date: "Tomorrow", time: "1:00 PM", people: 6, occasion: "Family", status: "pending", note: "Might be late by 10 min", createdAt: new Date(Date.now() - 45 * 60000) },
  { id: genId(), name: "Aditya Singh", phone: "9543012345", date: "Tomorrow", time: "7:30 PM", people: 3, occasion: "Casual", status: "pending", note: "", createdAt: new Date(Date.now() - 90 * 60000) },
  { id: genId(), name: "Saheba Laskar", phone: "9432012345", date: "9 Apr", time: "6:00 PM", people: 2, occasion: "Anniversary", status: "confirmed", note: "Special decoration requested", createdAt: new Date(Date.now() - 3 * 3600000) },
  { id: genId(), name: "Kanishka Jain", phone: "9321012345", date: "9 Apr", time: "8:00 PM", people: 5, occasion: "Friends", status: "cancelled", note: "", createdAt: new Date(Date.now() - 5 * 3600000) },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────

const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  orders: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  bookings: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  clock: "M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2",
  truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  utensils: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  rupee: "M6 3h12M6 8h12M6 13l8.5 8L20 13M6 13h3a4.5 4.5 0 000-9",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  menu: "M3 12h18M3 6h18M3 18h18",
  trend: "M23 6l-9.5 9.5-5-5L1 18",
  calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  note: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2l6 6M14 2v6h6M16 13H8M16 17H8M10 9H8",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────

const ORDER_STATUSES = {
  new:       { label: "New",       color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  next: "preparing", nextLabel: "Start Preparing" },
  preparing: { label: "Preparing", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", next: "ready",     nextLabel: "Mark Ready" },
  ready:     { label: "Ready",     color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", next: "served",    nextLabel: "Mark Served/Out" },
  served:    { label: "Served",    color: "#10b981", bg: "rgba(16,185,129,0.12)", next: "completed", nextLabel: "Complete" },
  completed: { label: "Done",      color: "#6b7280", bg: "rgba(107,114,128,0.1)", next: null,        nextLabel: null },
  cancelled: { label: "Cancelled", color: "#ef4444", bg: "rgba(239,68,68,0.1)",   next: null,        nextLabel: null },
};

const BOOKING_STATUSES = {
  pending:   { label: "Pending",   color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  confirmed: { label: "Confirmed", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  cancelled: { label: "Cancelled", color: "#ef4444", bg: "rgba(239,68,68,0.1)"  },
  arrived:   { label: "Arrived",   color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
};

const TYPE_ICONS = { "dine-in": "🪑", "takeaway": "🥡", "delivery": "🛵" };

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function CaffeineAdmin() {
  const [authed, setAuthed]       = useState(false);
  const [pin, setPin]             = useState("");
  const [pinError, setPinError]   = useState(false);
  const [view, setView]           = useState("dashboard");
  const [orders, setOrders]       = useState(SEED_ORDERS);
  const [bookings, setBookings]   = useState(SEED_BOOKINGS);
  const [selectedOrder, setSelectedOrder]   = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus]     = useState("all");
  const [filterType, setFilterType]         = useState("all");
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [notifications, setNotifications]   = useState([]);
  const [tick, setTick]           = useState(0);
  const CORRECT_PIN = "1234";

  // Live clock tick
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  // Simulate incoming orders
  useEffect(() => {
    if (!authed) return;
    const names = ["Raj Kumar", "Zoya Naaz", "Arbaz Khan", "Meenal B", "Preeti Gupta"];
    const items  = [["Cappuccino", 2, 129], ["Hot Chocolate", 1, 149], ["Cold Coffee", 1, 139], ["Pasta", 1, 199], ["Burger", 2, 129]];
    const types  = ["dine-in", "takeaway", "delivery"];
    const t = setInterval(() => {
      if (Math.random() > 0.55) return;
      const name = names[Math.floor(Math.random() * names.length)];
      const item = items[Math.floor(Math.random() * items.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const newOrder = {
        id: genId(), customer: name, phone: `9${Math.floor(100000000 + Math.random() * 899999999)}`,
        type, status: "new",
        items: [{ name: item[0], qty: item[1], price: item[2] }],
        total: item[1] * item[2] + Math.round(item[1] * item[2] * 0.05),
        payment: ["cash", "upi", "card"][Math.floor(Math.random() * 3)],
        note: "", createdAt: new Date(),
        ...(type === "dine-in" ? { table: `T${Math.ceil(Math.random() * 6)}` } : {}),
        ...(type === "delivery" ? { address: "Aligarh, UP" } : {}),
      };
      setOrders(o => [newOrder, ...o]);
      setNotifications(n => [{ id: newOrder.id, text: `New ${type} order from ${name}`, time: new Date(), type: "order" }, ...n.slice(0, 9)]);
    }, 18000);
    return () => clearInterval(t);
  }, [authed]);

  const advanceOrder = (id) => {
    setOrders(os => os.map(o => {
      if (o.id !== id) return o;
      const next = ORDER_STATUSES[o.status]?.next;
      return next ? { ...o, status: next } : o;
    }));
    if (selectedOrder?.id === id) {
      setSelectedOrder(o => {
        const next = ORDER_STATUSES[o.status]?.next;
        return next ? { ...o, status: next } : o;
      });
    }
  };

  const cancelOrder = (id) => {
    setOrders(os => os.map(o => o.id === id ? { ...o, status: "cancelled" } : o));
    if (selectedOrder?.id === id) setSelectedOrder(o => ({ ...o, status: "cancelled" }));
  };

  const updateBooking = (id, status) => {
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
    if (selectedBooking?.id === id) setSelectedBooking(b => ({ ...b, status }));
  };

  // Stats
  const todayOrders   = orders.filter(o => o.status !== "cancelled");
  const activeOrders  = orders.filter(o => ["new", "preparing", "ready"].includes(o.status));
  const todayRevenue  = todayOrders.filter(o => o.status === "completed" || o.status === "served").reduce((a, o) => a + o.total, 0);
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const newOrders     = orders.filter(o => o.status === "new").length;

  const filteredOrders = orders.filter(o => {
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    if (filterType   !== "all" && o.type   !== filterType)   return false;
    return true;
  });

  // ─── PIN SCREEN ──────────────────────────────────────────────────────────────

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#0A0806", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <div style={{ textAlign: "center", padding: "40px 24px", maxWidth: "360px", width: "100%" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "linear-gradient(135deg, #D4A574, #8B5A2B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 24px" }}>☕</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#F5F0E8", marginBottom: "6px" }}>Staff Access</div>
        <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "40px" }}>Caffeine Aligarh · Operations</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "24px", justifyContent: "center" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ height: "12px", width: "12px", borderRadius: "50%", background: i < pin.length ? "#D4A574" : "rgba(255,255,255,0.1)", margin: "0 auto", transition: "background 0.2s" }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k, i) => (
            <button key={i} onClick={() => {
              if (k === "⌫") { setPin(p => p.slice(0,-1)); setPinError(false); return; }
              if (k === "") return;
              const np = pin + k;
              setPin(np);
              if (np.length === 4) {
                if (np === CORRECT_PIN) { setAuthed(true); setPin(""); }
                else { setPinError(true); setTimeout(() => { setPin(""); setPinError(false); }, 800); }
              }
            }} style={{
              height: "56px", borderRadius: "12px", fontSize: k === "⌫" ? "18px" : "20px", fontWeight: "600",
              background: k === "" ? "transparent" : pinError ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${pinError ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
              color: pinError ? "#ef4444" : "#F5F0E8", cursor: k === "" ? "default" : "pointer",
              transition: "all 0.15s",
            }}>
              {k}
            </button>
          ))}
        </div>
        {pinError && <p style={{ color: "#ef4444", fontSize: "13px" }}>Incorrect PIN. Try again.</p>}
        <p style={{ color: "#374151", fontSize: "11px", marginTop: "24px" }}>Demo PIN: 1234</p>
      </div>
    </div>
  );

  // ─── SIDEBAR ─────────────────────────────────────────────────────────────────

  const navItems = [
    { id: "dashboard", label: "Dashboard",   icon: icons.dashboard, badge: null },
    { id: "orders",    label: "Orders",      icon: icons.orders,    badge: newOrders || null },
    { id: "bookings",  label: "Bookings",    icon: icons.bookings,  badge: pendingBookings || null },
    { id: "menu",      label: "Menu Mgmt",   icon: icons.note,      badge: null },
  ];

  const Sidebar = () => (
    <div style={{
      width: sidebarOpen ? "220px" : "64px", minHeight: "100vh",
      background: "#080604", borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column", transition: "width 0.25s ease",
      position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 50, overflow: "hidden",
    }}>
      <div style={{ padding: sidebarOpen ? "20px 16px 16px" : "20px 8px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #D4A574, #8B5A2B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>☕</div>
        {sidebarOpen && (
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: "#F5F0E8", fontWeight: "700", whiteSpace: "nowrap" }}>Caffeine</div>
            <div style={{ fontSize: "10px", color: "#6B7280", whiteSpace: "nowrap" }}>Staff Dashboard</div>
          </div>
        )}
      </div>
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setView(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: "10px",
            padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer",
            background: view === item.id ? "rgba(212,165,116,0.12)" : "transparent",
            color: view === item.id ? "#D4A574" : "#6B7280",
            marginBottom: "2px", transition: "all 0.15s", position: "relative",
          }}
            onMouseEnter={e => { if (view !== item.id) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#9CA3AF"; } }}
            onMouseLeave={e => { if (view !== item.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6B7280"; } }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d={item.icon} />
            </svg>
            {sidebarOpen && <span style={{ fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}>{item.label}</span>}
            {item.badge && (
              <span style={{
                position: sidebarOpen ? "static" : "absolute", top: "6px", right: "6px",
                marginLeft: sidebarOpen ? "auto" : "0",
                background: "#D4A574", color: "#1A0F0A", borderRadius: "10px",
                padding: "1px 7px", fontSize: "10px", fontWeight: "800",
              }}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => setAuthed(false)} style={{
          width: "100%", display: "flex", alignItems: "center", gap: "10px",
          padding: "10px", borderRadius: "10px", border: "none", cursor: "pointer",
          background: "transparent", color: "#4B5563", transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "#ef4444"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4B5563"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d={icons.logout} />
          </svg>
          {sidebarOpen && <span style={{ fontSize: "13px", fontWeight: "600" }}>Logout</span>}
        </button>
      </div>
    </div>
  );

  // ─── TOP BAR ─────────────────────────────────────────────────────────────────

  const TopBar = ({ title }) => (
    <div style={{
      height: "56px", borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", background: "rgba(10,8,6,0.8)", backdropFilter: "blur(10px)",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => setSidebarOpen(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: "4px", display: "flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icons.menu} /></svg>
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F5F0E8", fontWeight: "600" }}>{title}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ fontSize: "12px", color: "#6B7280" }}>{new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</div>
        <div style={{ position: "relative" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#9CA3AF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icons.bell} /></svg>
          </div>
          {notifications.length > 0 && <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "16px", height: "16px", background: "#D4A574", borderRadius: "50%", fontSize: "9px", fontWeight: "800", color: "#1A0F0A", display: "flex", alignItems: "center", justifyContent: "center" }}>{notifications.length}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "20px", padding: "4px 12px" }}>
          <div style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%" }} />
          <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700" }}>OPEN</span>
        </div>
      </div>
    </div>
  );

  // ─── STATUS BADGE ─────────────────────────────────────────────────────────────

  const StatusBadge = ({ status, cfg }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em",
      color: cfg.color, background: cfg.bg, borderRadius: "20px",
      padding: "3px 10px", whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
      {cfg.label.toUpperCase()}
    </span>
  );

  // ─── ORDER CARD ───────────────────────────────────────────────────────────────

  const OrderCard = ({ order }) => {
    const cfg = ORDER_STATUSES[order.status];
    const isUrgent = order.status === "new" && (now() - order.createdAt) > 5 * 60000;
    return (
      <div onClick={() => setSelectedOrder(order)} style={{
        background: "rgba(255,255,255,0.03)", border: `1px solid ${isUrgent ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: "12px", padding: "14px 16px", cursor: "pointer",
        transition: "all 0.15s", marginBottom: "8px",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateX(2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateX(0)"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
              <span style={{ fontSize: "16px" }}>{TYPE_ICONS[order.type]}</span>
              <span style={{ fontWeight: "700", color: "#F5F0E8", fontSize: "14px" }}>{order.customer}</span>
              {isUrgent && <span style={{ fontSize: "9px", background: "rgba(239,68,68,0.2)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "1px 6px", fontWeight: "800" }}>URGENT</span>}
            </div>
            <span style={{ fontSize: "11px", color: "#6B7280" }}>#{order.id} · {ago(order.createdAt)}{order.table ? ` · ${order.table}` : ""}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <StatusBadge status={order.status} cfg={cfg} />
            <div style={{ fontSize: "15px", fontWeight: "800", color: "#D4A574", marginTop: "4px" }}>₹{order.total}</div>
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "8px" }}>
          {order.items.map(i => `${i.qty}× ${i.name}`).join(" · ")}
        </div>
        {order.note && (
          <div style={{ fontSize: "11px", color: "#D4A574", background: "rgba(212,165,116,0.06)", borderRadius: "6px", padding: "4px 8px" }}>
            📝 {order.note}
          </div>
        )}
        {cfg.next && (
          <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
            <button onClick={e => { e.stopPropagation(); advanceOrder(order.id); }} style={{
              flex: 1, padding: "7px 12px", borderRadius: "8px", border: "none",
              background: cfg.color, color: "#fff", fontSize: "12px", fontWeight: "700",
              cursor: "pointer", transition: "opacity 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              ✓ {cfg.nextLabel}
            </button>
            {order.status !== "completed" && order.status !== "cancelled" && (
              <button onClick={e => { e.stopPropagation(); cancelOrder(order.id); }} style={{
                padding: "7px 10px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)",
                background: "transparent", color: "#ef4444", fontSize: "12px", fontWeight: "700", cursor: "pointer",
              }}>✕</button>
            )}
          </div>
        )}
      </div>
    );
  };

  // ─── BOOKING CARD ─────────────────────────────────────────────────────────────

  const BookingCard = ({ booking }) => {
    const cfg = BOOKING_STATUSES[booking.status];
    return (
      <div onClick={() => setSelectedBooking(booking)} style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: "12px", padding: "14px 16px", cursor: "pointer",
        transition: "all 0.15s", marginBottom: "8px",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateX(2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateX(0)"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <div>
            <div style={{ fontWeight: "700", color: "#F5F0E8", fontSize: "14px", marginBottom: "2px" }}>{booking.name}</div>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>#{booking.id} · {ago(booking.createdAt)}</div>
          </div>
          <StatusBadge status={booking.status} cfg={cfg} />
        </div>
        <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#9CA3AF", marginBottom: "8px", flexWrap: "wrap" }}>
          <span>📅 {booking.date}</span>
          <span>🕐 {booking.time}</span>
          <span>👥 {booking.people} guests</span>
          <span>🎉 {booking.occasion}</span>
        </div>
        {booking.note && <div style={{ fontSize: "11px", color: "#D4A574", background: "rgba(212,165,116,0.06)", borderRadius: "6px", padding: "4px 8px", marginBottom: "8px" }}>📝 {booking.note}</div>}
        {booking.status === "pending" && (
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={e => { e.stopPropagation(); updateBooking(booking.id, "confirmed"); }} style={{ flex: 1, padding: "7px", borderRadius: "8px", border: "none", background: "#10b981", color: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>✓ Confirm</button>
            <button onClick={e => { e.stopPropagation(); updateBooking(booking.id, "cancelled"); }} style={{ flex: 1, padding: "7px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>✕ Cancel</button>
          </div>
        )}
        {booking.status === "confirmed" && (
          <button onClick={e => { e.stopPropagation(); updateBooking(booking.id, "arrived"); }} style={{ width: "100%", padding: "7px", borderRadius: "8px", border: "none", background: "#3b82f6", color: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>👋 Mark Arrived</button>
        )}
      </div>
    );
  };

  // ─── DETAIL MODAL ─────────────────────────────────────────────────────────────

  const OrderModal = ({ order }) => {
    const cfg = ORDER_STATUSES[order.status];
    const subtotal = order.items.reduce((a, i) => a + i.price * i.qty, 0);
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={() => setSelectedOrder(null)} />
        <div style={{ position: "relative", background: "#0F0A07", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px", width: "min(480px, 92vw)", maxHeight: "85vh", overflowY: "auto" }}>
          <button onClick={() => setSelectedOrder(null)} style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "#9CA3AF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icons.x} /></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ fontSize: "24px" }}>{TYPE_ICONS[order.type]}</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8" }}>{order.customer}</div>
              <div style={{ fontSize: "12px", color: "#6B7280" }}>Order #{order.id} · {fmtTime(order.createdAt)} on {fmtDate(order.createdAt)}</div>
            </div>
          </div>

          {/* Status Steps */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", alignItems: "center" }}>
            {["new","preparing","ready","served","completed"].map((s, i, arr) => {
              const statuses = ["new","preparing","ready","served","completed"];
              const currIdx = statuses.indexOf(order.status);
              const thisIdx = statuses.indexOf(s);
              const done = thisIdx < currIdx || order.status === "completed";
              const active = thisIdx === currIdx && order.status !== "completed";
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: s !== "completed" ? "1" : "0" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", background: done ? "#D4A574" : active ? "rgba(212,165,116,0.2)" : "rgba(255,255,255,0.06)", color: done ? "#1A0F0A" : active ? "#D4A574" : "#6B7280", border: active ? "2px solid #D4A574" : "none", transition: "all 0.3s" }}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span style={{ fontSize: "9px", color: active ? "#D4A574" : done ? "#9CA3AF" : "#4B5563", whiteSpace: "nowrap", fontWeight: active ? "700" : "500" }}>{ORDER_STATUSES[s].label}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: "2px", background: done ? "#D4A574" : "rgba(255,255,255,0.06)", margin: "0 4px 16px", transition: "background 0.3s" }} />}
                </div>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {[
              { label: "Type", value: order.type.charAt(0).toUpperCase() + order.type.slice(1) },
              { label: "Payment", value: order.payment.toUpperCase() },
              ...(order.table ? [{ label: "Table", value: order.table }] : []),
              ...(order.address ? [{ label: "Address", value: order.address }] : []),
              { label: "Phone", value: order.phone },
            ].map((row, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px 12px" }}>
                <div style={{ fontSize: "10px", color: "#6B7280", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "2px" }}>{row.label.toUpperCase()}</div>
                <div style={{ fontSize: "13px", color: "#F5F0E8", fontWeight: "600" }}>{row.value}</div>
              </div>
            ))}
          </div>

          {order.note && (
            <div style={{ background: "rgba(212,165,116,0.06)", border: "1px solid rgba(212,165,116,0.15)", borderRadius: "10px", padding: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#D4A574", fontWeight: "700", marginBottom: "4px" }}>CUSTOMER NOTE</div>
              <div style={{ fontSize: "13px", color: "#D1C5B8" }}>{order.note}</div>
            </div>
          )}

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "16px", marginBottom: "20px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#6B7280", letterSpacing: "0.08em", marginBottom: "10px" }}>ORDER ITEMS</div>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "14px" }}>
                <span style={{ color: "#F5F0E8" }}>{item.qty}× {item.name}</span>
                <span style={{ color: "#9CA3AF" }}>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "13px", color: "#6B7280" }}>
              <span>GST (5%)</span><span>₹{Math.round(subtotal * 0.05)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "18px", color: "#D4A574", paddingTop: "8px" }}>
              <span>Total</span><span>₹{order.total}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {cfg.next && (
              <button onClick={() => advanceOrder(order.id)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: cfg.color, color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                ✓ {cfg.nextLabel}
              </button>
            )}
            {order.status !== "completed" && order.status !== "cancelled" && (
              <button onClick={() => cancelOrder(order.id)} style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>Cancel</button>
            )}
            <a href={`tel:${order.phone}`} style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icons.phone} /></svg>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const BookingModal = ({ booking }) => {
    const cfg = BOOKING_STATUSES[booking.status];
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={() => setSelectedBooking(null)} />
        <div style={{ position: "relative", background: "#0F0A07", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px", width: "min(440px, 92vw)" }}>
          <button onClick={() => setSelectedBooking(null)} style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "#9CA3AF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icons.x} /></svg>
          </button>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8", marginBottom: "4px" }}>{booking.name}</div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "20px" }}>Booking #{booking.id} · {ago(booking.createdAt)}</div>
          <StatusBadge status={booking.status} cfg={cfg} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "16px 0" }}>
            {[
              { label: "Date", value: booking.date },
              { label: "Time", value: booking.time },
              { label: "Guests", value: `${booking.people} people` },
              { label: "Occasion", value: booking.occasion },
              { label: "Phone", value: booking.phone },
            ].map((row, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px 12px" }}>
                <div style={{ fontSize: "10px", color: "#6B7280", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "2px" }}>{row.label.toUpperCase()}</div>
                <div style={{ fontSize: "13px", color: "#F5F0E8", fontWeight: "600" }}>{row.value}</div>
              </div>
            ))}
          </div>
          {booking.note && (
            <div style={{ background: "rgba(212,165,116,0.06)", border: "1px solid rgba(212,165,116,0.15)", borderRadius: "10px", padding: "12px", marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#D4A574", fontWeight: "700", marginBottom: "4px" }}>NOTE</div>
              <div style={{ fontSize: "13px", color: "#D1C5B8" }}>{booking.note}</div>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px" }}>
            {booking.status === "pending" && <>
              <button onClick={() => updateBooking(booking.id, "confirmed")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#10b981", color: "#fff", fontWeight: "700", cursor: "pointer" }}>✓ Confirm</button>
              <button onClick={() => updateBooking(booking.id, "cancelled")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.3)", background: "transparent", color: "#ef4444", fontWeight: "700", cursor: "pointer" }}>✕ Cancel</button>
            </>}
            {booking.status === "confirmed" && (
              <button onClick={() => updateBooking(booking.id, "arrived")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#3b82f6", color: "#fff", fontWeight: "700", cursor: "pointer" }}>👋 Mark Arrived</button>
            )}
            <a href={`tel:${booking.phone}`} style={{ padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icons.phone} /></svg>
            </a>
          </div>
        </div>
      </div>
    );
  };

  // ─── VIEWS ────────────────────────────────────────────────────────────────────

  const renderDashboard = () => {
    const hourlyData = [12, 8, 5, 4, 6, 9, 18, 24, 31, 28, 22, 19];
    const hours = ["10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm"];
    const maxVal = Math.max(...hourlyData);
    return (
      <div style={{ padding: "24px" }}>
        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
          {[
            { label: "Active Orders", value: activeOrders.length, icon: icons.orders, color: "#f59e0b", sub: `${newOrders} need action` },
            { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, icon: icons.rupee, color: "#10b981", sub: `${todayOrders.filter(o=>o.status==="completed"||o.status==="served").length} completed` },
            { label: "Bookings Today", value: bookings.filter(b=>b.date==="Today").length, icon: icons.bookings, color: "#3b82f6", sub: `${pendingBookings} pending` },
            { label: "Avg Order Value", value: `₹${todayOrders.length ? Math.round(todayOrders.reduce((a,o)=>a+o.total,0)/todayOrders.length) : 0}`, icon: icons.star, color: "#D4A574", sub: `${todayOrders.length} orders today` },
          ].map((stat, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `rgba(${stat.color === "#10b981" ? "16,185,129" : stat.color === "#3b82f6" ? "59,130,246" : stat.color === "#f59e0b" ? "245,158,11" : "212,165,116"},0.12)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={stat.icon} /></svg>
                </div>
              </div>
              <div style={{ fontSize: "26px", fontWeight: "800", color: "#F5F0E8", marginBottom: "2px" }}>{stat.value}</div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#6B7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>{stat.label}</div>
              <div style={{ fontSize: "11px", color: stat.color, marginTop: "4px" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          {/* Live Order Board */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#F5F0E8" }}>Live Orders</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {["new","preparing","ready"].map(s => {
                  const c = ORDER_STATUSES[s];
                  const cnt = orders.filter(o => o.status === s).length;
                  return <span key={s} style={{ fontSize: "11px", color: c.color, background: c.bg, borderRadius: "10px", padding: "2px 8px", fontWeight: "700" }}>{cnt} {c.label}</span>;
                })}
              </div>
            </div>
            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
              {activeOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#4B5563" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
                  <p style={{ fontSize: "13px" }}>All caught up!</p>
                </div>
              ) : activeOrders.map(o => <OrderCard key={o.id} order={o} />)}
            </div>
          </div>

          {/* Today's Bookings */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "20px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#F5F0E8", marginBottom: "16px" }}>Today's Bookings</div>
            <div style={{ maxHeight: "320px", overflowY: "auto" }}>
              {bookings.filter(b => b.date === "Today").length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#4B5563" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>📅</div>
                  <p style={{ fontSize: "13px" }}>No bookings today</p>
                </div>
              ) : bookings.filter(b => b.date === "Today").map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "20px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#F5F0E8", marginBottom: "20px" }}>Today's Order Traffic</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
            {hourlyData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "100%", background: `rgba(212,165,116,${0.15 + (val/maxVal)*0.7})`, borderRadius: "4px 4px 0 0", height: `${(val / maxVal) * 68}px`, minHeight: "4px", transition: "height 0.4s ease" }} />
                <span style={{ fontSize: "9px", color: "#4B5563" }}>{hours[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <div style={{ background: "rgba(212,165,116,0.04)", border: "1px solid rgba(212,165,116,0.1)", borderRadius: "14px", padding: "20px", marginTop: "20px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#F5F0E8", marginBottom: "12px" }}>Recent Activity</div>
            {notifications.slice(0, 5).map((n, i) => (
              <div key={n.id} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(notifications.length, 5) - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A574", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: "13px", color: "#D1C5B8" }}>{n.text}</span>
                <span style={{ fontSize: "11px", color: "#6B7280" }}>{ago(n.time)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderOrders = () => (
    <div style={{ padding: "24px" }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["all", ...Object.keys(ORDER_STATUSES)].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700",
              border: `1px solid ${filterStatus === s ? "rgba(212,165,116,0.5)" : "rgba(255,255,255,0.08)"}`,
              background: filterStatus === s ? "rgba(212,165,116,0.1)" : "transparent",
              color: filterStatus === s ? "#D4A574" : "#6B7280", cursor: "pointer",
            }}>{s === "all" ? "All" : ORDER_STATUSES[s]?.label} {s !== "all" && orders.filter(o=>o.status===s).length > 0 && `(${orders.filter(o=>o.status===s).length})`}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
          {["all", "dine-in", "takeaway", "delivery"].map(t => (
            <button key={t} onClick={() => setFilterType(t)} style={{
              padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700",
              border: `1px solid ${filterType === t ? "rgba(212,165,116,0.4)" : "rgba(255,255,255,0.08)"}`,
              background: filterType === t ? "rgba(212,165,116,0.08)" : "transparent",
              color: filterType === t ? "#D4A574" : "#6B7280", cursor: "pointer",
            }}>{t === "all" ? "All Types" : TYPE_ICONS[t] + " " + t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px", color: "#4B5563" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📋</div>
          <p>No orders match the selected filters</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2px" }}>
          {filteredOrders.map(o => <OrderCard key={o.id} order={o} />)}
        </div>
      )}
    </div>
  );

  const renderBookings = () => {
    const grouped = ["Today", "Tomorrow", ...new Set(bookings.filter(b => b.date !== "Today" && b.date !== "Tomorrow").map(b => b.date))];
    return (
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {["all", "pending", "confirmed", "arrived", "cancelled"].map(s => {
            const cnt = s === "all" ? bookings.length : bookings.filter(b=>b.status===s).length;
            const cfg = BOOKING_STATUSES[s];
            return (
              <button key={s} onClick={() => setFilterStatus(s)} style={{
                padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700",
                border: `1px solid ${filterStatus === s ? (cfg?.color || "rgba(212,165,116,0.5)") + "60" : "rgba(255,255,255,0.08)"}`,
                background: filterStatus === s ? (cfg ? cfg.bg : "rgba(212,165,116,0.1)") : "transparent",
                color: filterStatus === s ? (cfg?.color || "#D4A574") : "#6B7280", cursor: "pointer",
              }}>{s.charAt(0).toUpperCase() + s.slice(1)} ({cnt})</button>
            );
          })}
        </div>
        {grouped.map(date => {
          const group = bookings.filter(b => b.date === date && (filterStatus === "all" || b.status === filterStatus));
          if (!group.length) return null;
          return (
            <div key={date} style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#9CA3AF", letterSpacing: "0.08em", marginBottom: "12px", textTransform: "uppercase" }}>{date}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
                {group.map(b => <BookingCard key={b.id} booking={b} />)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMenuMgmt = () => (
    <div style={{ padding: "24px" }}>
      <div style={{ background: "rgba(212,165,116,0.05)", border: "1px solid rgba(212,165,116,0.1)", borderRadius: "14px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F5F0E8", marginBottom: "8px" }}>Menu Management</div>
        <p style={{ color: "#9CA3AF", fontSize: "13px" }}>Toggle item availability, update prices, and mark items as sold out — changes reflect instantly on the customer-facing website.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
        {[
          ["Hot Chocolate", 149, true, "Hot Brews"],
          ["Cappuccino (S/L)", 129, true, "Hot Brews"],
          ["Vietnamese Cold Coffee", 199, true, "Cold Brews"],
          ["Biscoff Latte", 179, false, "Hot Brews"],
          ["White Sauce Pasta", 199, true, "Pasta"],
          ["Garlic Bread", 79, true, "Garlic Breads"],
          ["Grilled Paneer Burger", 129, true, "Burgers"],
          ["Brownie w/ Ice Cream", 159, true, "Brownies"],
          ["Paneer Tikka Sub", 189, true, "Gourmet Subs"],
          ["Creamy Oreo Shake", 169, true, "Milkshakes"],
          ["Cheese Lava Burger", 149, false, "Burgers"],
          ["Biscoff Iced Latte", 189, true, "Iced Lattes"],
        ].map(([name, price, avail, cat], i) => {
          const [available, setAvail] = useState(avail);
          return (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: available ? 1 : 0.5 }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#F5F0E8", marginBottom: "2px" }}>{name}</div>
                <div style={{ fontSize: "11px", color: "#6B7280" }}>{cat} · ₹{price}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {!available && <span style={{ fontSize: "10px", color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", padding: "2px 7px", fontWeight: "700" }}>SOLD OUT</span>}
                <button onClick={() => setAvail(a => !a)} style={{
                  width: "40px", height: "22px", borderRadius: "11px", border: "none", cursor: "pointer",
                  background: available ? "#10b981" : "rgba(255,255,255,0.1)", position: "relative", transition: "background 0.2s",
                }}>
                  <div style={{ position: "absolute", top: "3px", left: available ? "21px" : "3px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const VIEW_TITLES = { dashboard: "Dashboard", orders: "All Orders", bookings: "Reservations", menu: "Menu Management" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0A0806", color: "#F5F0E8", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,165,116,0.2); border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideIn { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
      `}</style>

      <Sidebar />

      <div style={{ marginLeft: sidebarOpen ? "220px" : "64px", flex: 1, transition: "margin-left 0.25s ease", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <TopBar title={VIEW_TITLES[view] || "Dashboard"} />

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", background: "rgba(10,8,6,0.5)" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setView(item.id)} style={{
              padding: "12px 16px", background: "none", border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: "600",
              color: view === item.id ? "#D4A574" : "#6B7280",
              borderBottom: `2px solid ${view === item.id ? "#D4A574" : "transparent"}`,
              display: "flex", alignItems: "center", gap: "6px", transition: "all 0.15s",
            }}>
              {item.label}
              {item.badge && <span style={{ background: "#D4A574", color: "#1A0F0A", borderRadius: "10px", padding: "1px 6px", fontSize: "10px", fontWeight: "800" }}>{item.badge}</span>}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", animation: "slideIn 0.2s ease" }}>
          {view === "dashboard" && renderDashboard()}
          {view === "orders"    && renderOrders()}
          {view === "bookings"  && renderBookings()}
          {view === "menu"      && renderMenuMgmt()}
        </div>
      </div>

      {selectedOrder  && <OrderModal  order={selectedOrder} />}
      {selectedBooking && <BookingModal booking={selectedBooking} />}
    </div>
  );
}
