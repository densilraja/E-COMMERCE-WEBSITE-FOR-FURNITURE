import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, WishlistItem, Order, User } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  isAuthenticated: boolean;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  orders: [],
  isAuthenticated: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
        wishlist: [],
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { id: Date.now().toString(), product: action.payload.product, quantity: action.payload.quantity }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'ADD_TO_WISHLIST':
      const isInWishlist = state.wishlist.some(item => item.product.id === action.payload.id);
      if (isInWishlist) return state;
      return {
        ...state,
        wishlist: [...state.wishlist, { id: Date.now().toString(), product: action.payload, addedAt: new Date() }],
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.product.id !== action.payload),
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}