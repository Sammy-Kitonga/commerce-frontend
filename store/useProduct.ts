import { create } from 'zustand';
import axios from 'axios';

interface ProductStore {
  products: any[];
  loading: boolean;
  hasFetched: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProducts = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  hasFetched: false,

  fetchProducts: async () => {
    if (get().hasFetched || get().loading) return;

    set({ loading: true });
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mpesa-backend-pj42.onrender.com/api";
      const res = await axios.get(`${API_URL}/products`);
      set({ products: res.data, hasFetched: true, loading: false });
    } catch (err) {
      console.error("Failed to fetch products:", err);
      set({ loading: false });
    }
  },
}));