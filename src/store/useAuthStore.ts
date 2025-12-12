import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
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
        set({ initialized: true });
      },

      setMe: me => set({ me }),

      setSession: (session)=>set({session}),

      signOut: async () => {
        try {
          await api.post("/auth/logout");
        } catch (err) {
          console.log("logout error (ignored):", err);
        }
        set({
          me: null,
          session:null,
          hasCompletedOnboarding: false
        });
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
        session: state.session,
        hasCompletedOnboarding: state.hasCompletedOnboarding
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) return null;
      }
    }
  )
);
