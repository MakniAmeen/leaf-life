import { create } from "zustand";
import { Product } from "@/lib/type";
import { supabase } from "@/lib/supabase";

interface ProductsStore {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<{ error: any }>;
  removeProduct: (id: string) => Promise<{ error: any }>;
  updateProduct: (
    id: string,
    product: Partial<Product>
  ) => Promise<{ error: any }>;
  fetchProducts: () => Promise<void>;
}

export const useProducts = create<ProductsStore>((set, get) => ({
  products: [],
  loading: true,

  addProduct: async (productData) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: productData.name,
            price: productData.price,
            seller: productData.seller,
            location: productData.location,
            rating: productData.rating,
            image_url: productData.image,
            badge: productData.badge,
            reviews: productData.reviews,
            category: productData.category,
            organic: productData.organic,
          },
        ])
        .select()
        .single();

      if (error) {
        return { error };
      }

      // Add to local state
      const newProduct: Product = {
        id: data.id,
        name: data.name,
        price: data.price,
        seller: data.seller,
        location: data.location,
        rating: data.rating,
        image: data.image_url,
        badge: data.badge,
        reviews: data.reviews,
        category: data.category,
        organic: data.organic,
      };

      set((state) => ({
        products: [...state.products, newProduct],
      }));

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  removeProduct: async (id) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) {
        return { error };
      }

      // Remove from local state
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  updateProduct: async (id, updatedProduct) => {
    try {
      const { error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", id);

      if (error) {
        return { error };
      }

      // Update local state
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        ),
      }));

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        set({ loading: false });
        return;
      }

      const products: Product[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        seller: item.seller,
        location: item.location,
        rating: item.rating,
        image: item.image_url,
        badge: item.badge,
        reviews: item.reviews,
        category: item.category,
        organic: item.organic,
      }));

      set({ products, loading: false });
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      set({ loading: false });
    }
  },
}));

// Fetch products on initialization
useProducts.getState().fetchProducts();
