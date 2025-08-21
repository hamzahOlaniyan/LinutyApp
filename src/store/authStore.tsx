import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { supabase } from "../lib/supabase";

type AuthState = {
   loading: boolean;
   session: any | null;
   user: any | null;
   profile: any | null;
   setSession: (session: any | null) => void;
   fetchProfile: (userId: string) => Promise<void>;
   signOut: () => Promise<void>;
   setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         session: null,
         user: null,
         profile: null,
         loading: true,

         setSession: (session) => {
            set({ session, user: session?.user ?? null });
         },

         setLoading: (loading) => set({ loading }),

         fetchProfile: async (userId) => {
            set({ loading: true });
            const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

            if (!error) {
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
         version: 1,
      }
   )
);
