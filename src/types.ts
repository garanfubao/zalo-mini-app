
export type PaymentMethod = 'cod' | 'zalopay';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
}

export type OrderStatus = 'pending'|'confirmed'|'shipping'|'completed'|'cancelled';

export interface Order {
  id: number;
  items: CartItem[];
  orderInfo: OrderInfo;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface MenuItem {
  icon: string;
  title: string;
  path?: string;
  action?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  isRegistered: boolean;
  phone?: string;
  address?: string;
}
