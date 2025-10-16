import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { supabase } from "../lib/supabase";

type AuthState = {
   loading: boolean;
   hasHydrated: boolean;
   session: any | null;
   user: any | null;
   profile: any | null;
   resetSession: () => void;
   setSession: (session: any | null) => void;
   fetchProfile: (userId: string) => Promise<void>;
   signOut: () => Promise<void>;
   setLoading: (loading: boolean) => void;
};

// ...existing code...
export const useAuthStore = create<AuthState>()(
   persist(
      (set, get) => ({
         loading: true,
         hasHydrated: false,
         session: null,
         user: null,
         profile: null,
         resetSession: () => {
            set({ session: null, user: null, profile: null });
         },
         setSession: (session) => {
            set({
               session,
               user: session?.user ?? null,
               loading: false,
            });
         },
         setLoading: (loading) => set({ loading }),
         fetchProfile: async (userId) => {
            set({ loading: true });
            const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
            if (!error && data) {
               set({ profile: data, loading: false });
            } else {
               set({ profile: null, loading: false });
            }
         },
         signOut: async () => {
            await supabase.auth.signOut();
            set({ session: null, user: null, profile: null });
         },
      }),
      {
         name: "auth-store",
         storage: createJSONStorage(() => AsyncStorage),
      }
   )
);

useAuthStore.persist.onFinishHydration(() => {
   console.log("🔥 Store hydration complete ✅");
   useAuthStore.setState({ hasHydrated: true, loading: false });
});
