import { queryClient } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase/supabase";
import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthStore } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      initialized: false,
      hasCompletedOnboarding: false,
      me: null,
      session:null,

      init: async () => {
        set({ initialized: false });
        const { data } = await supabase.auth.getSession();
        set({ session: data.session ?? null });
        set({ initialized: true });
      },

      setInitialized: (initialized) => set({ initialized }),
      
      setMe: (me) => set({ me }),

      setSession: (session)=>set({session}),
        
      signOut: async () => {
      const {error} =   await supabase.auth.signOut();
      console.log('LOG OUT ERROR', error?.message);
      
        set({ session: null, me: null });
        queryClient.clear();
      },

      completeOnboarding: () => {
        set(state => ({ ...state, hasCompletedOnboarding: true }));
      },
      resetOnboarding: () => {
        set(state => ({ ...state, hasCompletedOnboarding: false }));
      }
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync
      })),
      partialize: state => ({
        me: state.me,
        hasCompletedOnboarding: state.hasCompletedOnboarding
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) return null;
      }
    }
  )
);
