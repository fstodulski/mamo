import type { Product } from "@/lib/models/product.model";
import { create } from "zustand";

export type CartStore = {
  products: Product[];
  add: (product: Product) => void;
  remove: (product: Product) => void;
  clean: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  add: (product: Product) =>
    set((state) => ({ products: [...state.products, product] })),
  remove: (product: Product) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== product.id),
    })),
  clean: () => set({ products: [] }),
}));
