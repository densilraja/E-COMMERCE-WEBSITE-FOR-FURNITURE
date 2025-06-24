export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features?: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  estimatedDelivery?: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
}