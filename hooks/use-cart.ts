// hooks/use-cart.ts
import { create } from "zustand";
import { Product } from "@/lib/type";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./use-auth";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  addItem: (item: Product) => Promise<{ error: any }>;
  removeItem: (productId: string) => Promise<{ error: any }>;
  updateQuantity: (
    productId: string,
    quantity: number
  ) => Promise<{ error: any }>;
  clearCart: () => Promise<{ error: any }>;
  fetchCart: () => Promise<void>;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  loading: true,

  addItem: async (product) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: new Error("User not authenticated") };
      }

      // Check if item already exists in cart
      const existingItem = get().items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity
        return await get().updateQuantity(
          product.id,
          existingItem.quantity + 1
        );
      }

      // Add new item
      const { data, error } = await supabase
        .from("cart_items")
        .insert([
          {
            user_id: user.id,
            product_id: product.id,
            quantity: 1,
          },
        ])
        .select(
          `
          *,
          product:products(*)
        `
        )
        .single();

      if (error) {
        return { error };
      }

      const cartItem: CartItem = {
        id: data.id,
        product: data.product,
        quantity: data.quantity,
      };

      set((state) => ({
        items: [...state.items, cartItem],
      }));

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  removeItem: async (productId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: new Error("User not authenticated") };
      }

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) {
        return { error };
      }

      set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      }));

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: new Error("User not authenticated") };
      }

      if (quantity <= 0) {
        return await get().removeItem(productId);
      }

      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) {
        return { error };
      }

      set((state) => ({
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      }));

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  clearCart: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { error: new Error("User not authenticated") };
      }

      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        return { error };
      }

      set({ items: [] });
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  fetchCart: async () => {
    set({ loading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        set({ items: [], loading: false });
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          *,
          product:products(*)
        `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart:", error);
        set({ loading: false });
        return;
      }

      const cartItems: CartItem[] = data.map((item) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
      }));

      set({ items: cartItems, loading: false });
    } catch (error) {
      console.error("Error in fetchCart:", error);
      set({ loading: false });
    }
  },
}));

// Fetch cart on initialization
useCart.getState().fetchCart();
