import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  job: string;
  passion: string;
  bestPlant: string;
  favoritePlantType: string;
  gardeningExperience: string;
  plantGoals: string;
  favoriteSeason: string;
  gardenSize: string;
  socialMedia?: string;
  bio: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  favoriteCategories: string[];
}

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (
    userData: Omit<UserProfile, "id" | "joinDate" | "totalOrders">,
    password: string
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  fetchProfile: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  signUp: async (userData, password) => {
    set({ loading: true });

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: password,
        options: {
          data: {
            name: userData.name,
            avatar_url: userData.avatar,
          },
        },
      });

      if (authError) {
        set({ loading: false });
        return { error: authError };
      }

      if (authData.user) {
        // Create profile manually since we can't use triggers on auth.users
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            name: userData.name,
            email: userData.email,
            location: userData.location,
            job: userData.job,
            passion: userData.passion,
            best_plant: userData.bestPlant,
            favorite_plant_type: userData.favoritePlantType,
            gardening_experience: userData.gardeningExperience,
            plant_goals: userData.plantGoals,
            favorite_season: userData.favoriteSeason,
            garden_size: userData.gardenSize,
            social_media: userData.socialMedia,
            bio: userData.bio,
            avatar_url: userData.avatar,
            total_orders: 0,
            favorite_categories: userData.favoriteCategories || [],
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          return { error: profileError };
        }

        // Fetch the created profile
        await get().fetchProfile();
      }

      set({ loading: false });
      return { error: null };
    } catch (error) {
      set({ loading: false });
      return { error };
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ loading: false });
        return { error };
      }

      // Fetch user profile after successful sign in
      await get().fetchProfile();
      set({ loading: false });
      return { error: null };
    } catch (error) {
      set({ loading: false });
      return { error };
    }
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, loading: false });
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) return { error: new Error("No user logged in") };

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) {
        return { error };
      }

      // Update local state
      set({
        user: { ...user, ...updates },
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  fetchProfile: async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        set({ user: null, isAuthenticated: false, loading: false });
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        set({ user: null, isAuthenticated: false, loading: false });
        return;
      }

      if (profile) {
        const userProfile: UserProfile = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          location: profile.location || "",
          job: profile.job || "",
          passion: profile.passion || "",
          bestPlant: profile.best_plant || "",
          favoritePlantType: profile.favorite_plant_type || "",
          gardeningExperience: profile.gardening_experience || "",
          plantGoals: profile.plant_goals || "",
          favoriteSeason: profile.favorite_season || "",
          gardenSize: profile.garden_size || "",
          socialMedia: profile.social_media,
          bio: profile.bio || "",
          avatar: profile.avatar_url,
          joinDate: profile.created_at,
          totalOrders: profile.total_orders || 0,
          favoriteCategories: profile.favorite_categories || [],
        };

        set({ user: userProfile, isAuthenticated: true, loading: false });
      } else {
        set({ user: null, isAuthenticated: false, loading: false });
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    await useAuth.getState().fetchProfile();
  } else if (event === "SIGNED_OUT") {
    useAuth.getState().signOut();
  }
});

// Fetch initial profile on app load
useAuth.getState().fetchProfile();
