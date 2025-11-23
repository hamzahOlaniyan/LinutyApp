// authStore.ts
import { supabase } from "@/lib/supabase"; // adjust path
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
   initialized: boolean;
   loading: boolean;
   hasHydrated: boolean;
   session: Session | null;
   user: any | null;
   profile: any | null;

   // actions
   setHydrated: () => void;
   signIn: (email: string, password: string) => Promise<void>;
   resetSession: () => void;
   setSession: (session: any | null) => void;
   fetchProfile: (userId: string) => Promise<void>;
   signOut: () => Promise<void>;
   setLoading: (loading: boolean) => void;
   init: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
   persist(
      (set, get) => ({
         initialized: false,

         loading: true,
         hasHydrated: false,
         session: null,
         user: null,
         profile: null,

         setHydrated: () => set({ hasHydrated: true }),

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

         signIn: async (email, password) => {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            if (data.session) set({ session: data.session });
         },

         init: async () => {
            if (get().initialized) return;
            const {
               data: { session },
            } = await supabase.auth.getSession();
            set({ session });
            supabase.auth.onAuthStateChange((_event, session) => set({ session }));
            set({ initialized: true });
         },
      }),
      {
         name: "auth-store",
         storage: createJSONStorage(() => AsyncStorage),
         onRehydrateStorage: () => (state, error) => {
            if (!error && state) {
               // call our own action on the hydrated state
               state.setHydrated();
               state.setLoading(false);
            }
         },
      }
   )
);
