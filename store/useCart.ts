import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string; 
  imageUrl?: string;    
}

interface CartStore {
  items: Product[];
  add: (item: Product) => void;
  remove: (index: number) => void;
  total: () => number;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      add: (item) => set((state) => ({ items: [...state.items, item] })),
      
      remove: (indexToRemove) => set((state) => ({
        items: state.items.filter((_, index) => index !== indexToRemove)
      })),
      
      total: () => get().items.reduce((sum, item) => sum + Number(item.price), 0),
      
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ecommerce-cart', 
    }
  )
);