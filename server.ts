import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for Caffeine Aligarh
interface ServerMenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  veg: boolean;
}

interface ServerOrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface ServerOrder {
  id: string;
  customer: string;
  phone: string;
  type: 'dine-in' | 'takeaway' | 'delivery';
  table?: string;
  address?: string;
  payment: 'cash' | 'upi' | 'card';
  items: ServerOrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'new' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  note?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

interface ServerBooking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  occasion: string;
  status: 'pending' | 'confirmed' | 'seated' | 'cancelled';
  note?: string;
  createdAt: string;
}

// Menu dictionary for server-side price verification
const MENU_PRICES: Record<string, { name: string; price: number; category: string; veg: boolean }> = {
  "hb1": { name: "Espresso 30ml", price: 89, category: "Hot Brews", veg: true },
  "hb2": { name: "Espresso 60ml", price: 99, category: "Hot Brews", veg: true },
  "hb3": { name: "Regular Hot Coffee", price: 99, category: "Hot Brews", veg: true },
  "hb4": { name: "Americano", price: 109, category: "Hot Brews", veg: true },
  "hb5": { name: "Cappuccino (S/L)", price: 129, category: "Hot Brews", veg: true },
  "hb6": { name: "Café Latte", price: 129, category: "Hot Brews", veg: true },
  "hb7": { name: "Café Mocha", price: 149, category: "Hot Brews", veg: true },
  "hb8": { name: "Irish Coffee", price: 149, category: "Hot Brews", veg: true },
  "hb9": { name: "Caramel/Vanilla Coffee", price: 149, category: "Hot Brews", veg: true },
  "hb10": { name: "Hazelnut Coffee", price: 149, category: "Hot Brews", veg: true },
  "hb11": { name: "Hot Chocolate", price: 149, category: "Hot Brews", veg: true },
  "hb12": { name: "Butter Chocolate", price: 149, category: "Hot Brews", veg: true },
  "hb13": { name: "Caramel Latte", price: 149, category: "Hot Brews", veg: true },
  "hb14": { name: "Biscoff Latte", price: 179, category: "Hot Brews", veg: true },
  "cb1": { name: "Iced Americano", price: 119, category: "Cold Brews", veg: true },
  "cb2": { name: "Iced Cappuccino", price: 129, category: "Cold Brews", veg: true },
  "cb3": { name: "Classic Cold Coffee", price: 139, category: "Cold Brews", veg: true },
  "cb4": { name: "Caramel/Vanilla", price: 159, category: "Cold Brews", veg: true },
  "cb5": { name: "Hazelnut/Irish", price: 159, category: "Cold Brews", veg: true },
  "cb6": { name: "Chocolate Cold Coffee", price: 169, category: "Cold Brews", veg: true },
  "cb7": { name: "Caffeine Overload", price: 169, category: "Cold Brews", veg: true },
  "cb8": { name: "Shahi Thandai", price: 179, category: "Cold Brews", veg: true },
  "cb9": { name: "Vietnamese Style Cold Coffee", price: 199, category: "Cold Brews", veg: true },
  "il1": { name: "Iced Latte", price: 129, category: "Iced Lattes", veg: true },
  "il2": { name: "Biscoff Iced Latte", price: 189, category: "Iced Lattes", veg: true },
  "il3": { name: "Nutella Iced Latte", price: 189, category: "Iced Lattes", veg: true },
  "il4": { name: "Blueberry Iced Latte", price: 189, category: "Iced Lattes", veg: true },
  "il5": { name: "Strawberry Iced Latte", price: 189, category: "Iced Lattes", veg: true },
  "af1": { name: "Classic Affogato", price: 129, category: "Affogato", veg: true },
  "af2": { name: "Chocolate Affogato", price: 149, category: "Affogato", veg: true },
  "af3": { name: "Strawberry Affogato", price: 149, category: "Affogato", veg: true },
  "af4": { name: "Biscoff Affogato", price: 169, category: "Affogato", veg: true },
  "af5": { name: "Nutella Affogato", price: 169, category: "Affogato", veg: true },
  "bg1": { name: "Crispy Veg Burger", price: 99, category: "Big-Boy Burgers", veg: true },
  "bg2": { name: "Cheese Burst Burger", price: 139, category: "Big-Boy Burgers", veg: true },
  "bg3": { name: "Grilled Paneer Burger", price: 129, category: "Big-Boy Burgers", veg: true },
  "bg4": { name: "Caffeine Special Tower Burger", price: 179, category: "Big-Boy Burgers", veg: true },
  "pa1": { name: "Red Sauce Arrabbiata Pasta", price: 179, category: "Pasta", veg: true },
  "pa2": { name: "White Sauce Alfredo Pasta", price: 199, category: "Pasta", veg: true },
  "pa3": { name: "Pink Sauce Pasta", price: 199, category: "Pasta", veg: true },
  "pz1": { name: "Classic Margherita Pizza", price: 179, category: "Pizzas", veg: true },
  "pz2": { name: "Farmhouse Veggie Delight", price: 219, category: "Pizzas", veg: true },
  "pz3": { name: "Paneer Tikka Fusion Pizza", price: 239, category: "Pizzas", veg: true },
  "gb1": { name: "Classic Garlic Bread", price: 79, category: "Garlic Breads", veg: true },
  "gb2": { name: "Cheese Garlic Bread", price: 109, category: "Garlic Breads", veg: true },
  "su1": { name: "Veggie Supreme Sub", price: 159, category: "Gourmet Subs", veg: true },
  "su3": { name: "Paneer Tikka Sub", price: 189, category: "Gourmet Subs", veg: true },
  "fr1": { name: "Salted Crispy Fries", price: 99, category: "Yumilicious Fries", veg: true },
  "fr2": { name: "Peri-Peri Fries", price: 129, category: "Yumilicious Fries", veg: true },
  "br1": { name: "Fudge Chocolate Brownie", price: 119, category: "Brownies", veg: true },
  "br3": { name: "Brownie with Ice-Cream", price: 159, category: "Brownies", veg: true },
};

// Realistic Seed Orders
let ordersStore: ServerOrder[] = [
  {
    id: "CAF-8921",
    customer: "Areena Fatima",
    phone: "9876543210",
    type: "dine-in",
    table: "Table 4 (Window)",
    payment: "upi",
    items: [
      { id: "hb11", name: "Hot Chocolate", price: 149, qty: 2 },
      { id: "pa2", name: "White Sauce Alfredo Pasta", price: 199, qty: 1 }
    ],
    subtotal: 497,
    tax: 25,
    deliveryFee: 0,
    total: 522,
    status: "new",
    note: "Extra velvety hot chocolate please",
    createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    estimatedDelivery: "15-20 mins"
  },
  {
    id: "CAF-7612",
    customer: "Sahil Ahuja",
    phone: "9812345678",
    type: "takeaway",
    payment: "cash",
    items: [
      { id: "cb9", name: "Vietnamese Style Cold Coffee", price: 199, qty: 1 },
      { id: "gb1", name: "Classic Garlic Bread", price: 79, qty: 2 },
      { id: "br3", name: "Brownie with Ice-Cream", price: 159, qty: 1 }
    ],
    subtotal: 516,
    tax: 26,
    deliveryFee: 0,
    total: 542,
    status: "preparing",
    note: "Packing for travel",
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    estimatedDelivery: "10 mins"
  },
  {
    id: "CAF-6540",
    customer: "Ekansh Gupta",
    phone: "9765432109",
    type: "delivery",
    address: "12 Civil Lines, Near AMU Circle, Aligarh",
    payment: "upi",
    items: [
      { id: "hb5", name: "Cappuccino (S/L)", price: 129, qty: 2 },
      { id: "su3", name: "Paneer Tikka Sub", price: 189, qty: 1 }
    ],
    subtotal: 447,
    tax: 22,
    deliveryFee: 40,
    total: 509,
    status: "ready",
    note: "Ring doorbell twice please",
    createdAt: new Date(Date.now() - 22 * 60000).toISOString(),
    estimatedDelivery: "On the way"
  }
];

// Realistic Seed Reservations
let bookingsStore: ServerBooking[] = [
  {
    id: "RES-4011",
    name: "Priya Gautam",
    phone: "9876501234",
    date: "Today",
    time: "7:00 PM",
    people: 4,
    occasion: "Birthday Celebration",
    status: "confirmed",
    note: "Prefers cozy window corner",
    createdAt: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    id: "RES-3829",
    name: "Mehul Singh",
    phone: "9765012345",
    date: "Today",
    time: "8:30 PM",
    people: 2,
    occasion: "Coffee Date",
    status: "confirmed",
    note: "Quiet table requested",
    createdAt: new Date(Date.now() - 60 * 60000).toISOString()
  },
  {
    id: "RES-2910",
    name: "Ananya Rastogi",
    phone: "9654012345",
    date: "Tomorrow",
    time: "5:00 PM",
    people: 6,
    occasion: "Friend Reunion",
    status: "pending",
    note: "Need high-top table",
    createdAt: new Date(Date.now() - 120 * 60000).toISOString()
  }
];

// Admin Authentication & Rate Limiting
const ADMIN_PIN = process.env.ADMIN_PIN || "8833"; // Caffeine Aligarh phone tail
const activeSessions = new Map<string, number>(); // token -> expiry timestamp

// Rate limiter: IP -> { count, resetTime }
const loginRateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginRateLimit.get(ip);
  if (!entry || now > entry.resetTime) {
    loginRateLimit.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 6) {
    return false;
  }
  entry.count += 1;
  return true;
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized access: Token required" });
  }
  const token = authHeader.substring(7);
  const expiry = activeSessions.get(token);
  if (!expiry || Date.now() > expiry) {
    activeSessions.delete(token);
    return res.status(401).json({ error: "Session expired or invalid" });
  }
  next();
}

// ─── PUBLIC APIS ─────────────────────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    brand: "Caffeine Aligarh",
    version: "2.0-cinematic",
    timestamp: new Date().toISOString()
  });
});

// Create Order (Server-Side Price Validation)
app.post("/api/orders", (req, res) => {
  try {
    const { customer, phone, type, table, address, payment, items, note } = req.body;

    if (!customer || typeof customer !== "string" || customer.trim().length < 2) {
      return res.status(400).json({ error: "Please provide a valid customer name." });
    }

    const cleanPhone = String(phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: "Please provide a valid 10-digit phone number." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty. Please add items to order." });
    }

    if (type === "delivery" && (!address || address.trim().length < 5)) {
      return res.status(400).json({ error: "Please provide a valid delivery address in Aligarh." });
    }

    // Server-side recalculation
    let verifiedSubtotal = 0;
    const verifiedItems: ServerOrderItem[] = [];

    for (const rawItem of items) {
      const qty = Math.max(1, Math.min(20, Number(rawItem.qty) || 1));
      const menuItem = MENU_PRICES[rawItem.id];
      const verifiedPrice = menuItem ? menuItem.price : Math.max(0, Number(rawItem.price) || 99);
      const verifiedName = menuItem ? menuItem.name : (rawItem.name || "Artisan Item");

      verifiedSubtotal += verifiedPrice * qty;
      verifiedItems.push({
        id: rawItem.id,
        name: verifiedName,
        price: verifiedPrice,
        qty
      });
    }

    const verifiedTax = Math.round(verifiedSubtotal * 0.05); // 5% GST
    const deliveryFee = type === "delivery" ? (verifiedSubtotal > 500 ? 0 : 40) : 0;
    const verifiedTotal = verifiedSubtotal + verifiedTax + deliveryFee;

    const newOrder: ServerOrder = {
      id: `CAF-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customer.trim(),
      phone: cleanPhone,
      type: type || "dine-in",
      table: type === "dine-in" ? (table || "Table Assigned on Arrival") : undefined,
      address: type === "delivery" ? address.trim() : undefined,
      payment: payment || "cash",
      items: verifiedItems,
      subtotal: verifiedSubtotal,
      tax: verifiedTax,
      deliveryFee,
      total: verifiedTotal,
      status: "new",
      note: (note || "").trim(),
      createdAt: new Date().toISOString(),
      estimatedDelivery: type === "delivery" ? "30-40 mins" : "15-20 mins"
    };

    ordersStore.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to process order securely." });
  }
});

// Track Order by ID
app.get("/api/orders/:id", (req, res) => {
  const order = ordersStore.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json({ order });
});

// Create Table Reservation
app.post("/api/reservations", (req, res) => {
  try {
    const { name, phone, date, time, people, occasion, note } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ error: "Please provide a valid name." });
    }

    const cleanPhone = String(phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
    }

    if (!date || !time) {
      return res.status(400).json({ error: "Please select both a date and time slot." });
    }

    const guestCount = Math.max(1, Math.min(25, Number(people) || 2));

    const newBooking: ServerBooking = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: cleanPhone,
      date,
      time,
      people: guestCount,
      occasion: occasion || "Casual Dining",
      status: "confirmed",
      note: (note || "").trim(),
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(newBooking);

    const whatsappMessage = encodeURIComponent(
      `Hello Caffeine Aligarh! I would like to confirm my table reservation:\n\n` +
      `Booking ID: ${newBooking.id}\n` +
      `Name: ${newBooking.name}\n` +
      `Date & Time: ${newBooking.date} at ${newBooking.time}\n` +
      `Guests: ${newBooking.people}\n` +
      `Occasion: ${newBooking.occasion}`
    );

    res.status(201).json({
      success: true,
      message: "Reservation confirmed",
      booking: newBooking,
      whatsappLink: `https://wa.me/919897618833?text=${whatsappMessage}`
    });
  } catch (err) {
    console.error("Reservation creation error:", err);
    res.status(500).json({ error: "Failed to confirm reservation." });
  }
});

// ─── ADMIN AUTH & SECURE PORTAL ─────────────────────────────────────────────

// Admin PIN Login with Rate Limiting
app.post("/api/admin/login", (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Too many login attempts. Please wait 15 minutes." });
  }

  const { pin } = req.body;
  if (!pin || typeof pin !== "string") {
    return res.status(400).json({ error: "PIN is required." });
  }

  // Constant-time comparison for security
  const pinBuffer = Buffer.from(pin.padEnd(16, " "));
  const expectedBuffer = Buffer.from(ADMIN_PIN.padEnd(16, " "));
  const isMatch = pinBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(pinBuffer, expectedBuffer);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid Staff PIN. Please try again." });
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeSessions.set(token, expiry);

  res.json({
    success: true,
    token,
    expiresAt: new Date(expiry).toISOString(),
    cafe: "Caffeine Aligarh",
    user: "Staff Operator"
  });
});

app.post("/api/admin/logout", requireAuth, (req, res) => {
  const token = req.headers.authorization?.substring(7);
  if (token) activeSessions.delete(token);
  res.json({ success: true, message: "Logged out successfully" });
});

// Admin Get Orders
app.get("/api/admin/orders", requireAuth, (_req, res) => {
  res.json({ orders: ordersStore });
});

// Admin Update Order Status
app.patch("/api/admin/orders/:id/status", requireAuth, (req, res) => {
  const { status } = req.body;
  const order = ordersStore.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const validStatuses = ["new", "preparing", "ready", "served", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  order.status = status;
  res.json({ success: true, order });
});

// Admin Get Bookings
app.get("/api/admin/bookings", requireAuth, (_req, res) => {
  res.json({ bookings: bookingsStore });
});

// Admin Update Booking Status
app.patch("/api/admin/bookings/:id/status", requireAuth, (req, res) => {
  const { status } = req.body;
  const booking = bookingsStore.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  const validStatuses = ["pending", "confirmed", "seated", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  booking.status = status;
  res.json({ success: true, booking });
});

// Admin Statistics
app.get("/api/admin/stats", requireAuth, (_req, res) => {
  const totalRevenue = ordersStore
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrders = ordersStore.filter(o => ["new", "preparing", "ready"].includes(o.status)).length;
  const confirmedBookings = bookingsStore.filter(b => b.status === "confirmed").length;

  res.json({
    totalRevenue,
    orderCount: ordersStore.length,
    activeOrders,
    confirmedBookings,
    todayGuests: bookingsStore.reduce((acc, b) => acc + (b.status === "confirmed" ? b.people : 0), 0)
  });
});

// ─── VITE & STATIC SERVING ───────────────────────────────────────────────────

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Caffeine Aligarh server running on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

