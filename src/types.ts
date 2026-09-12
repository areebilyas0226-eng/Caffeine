export interface MenuItem {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  desc?: string;
  bestseller?: boolean;
  category: string;
  tag?: string;
  image?: string;
}

export interface SignatureProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  tag: string;
  subtitle: string;
  desc: string;
  notes: string[];
  temperature: string;
  serving: string;
  image: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  avatar: string;
  tag?: string;
  date?: string;
}

export interface CraftStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  image: string;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';
export type PaymentMethod = 'cash' | 'upi' | 'card';
export type OrderStatus = 'new' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';

export interface CartItem extends MenuItem {
  qty: number;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  type: OrderType;
  table?: string;
  address?: string;
  payment: PaymentMethod;
  items: {
    id: string;
    name: string;
    price: number;
    qty: number;
  }[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  note?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'cancelled';

export interface ReservationRequest {
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  occasion: string;
  note?: string;
}

export interface Reservation extends ReservationRequest {
  id: string;
  status: ReservationStatus;
  createdAt: string;
}
