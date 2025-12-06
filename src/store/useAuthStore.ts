import { api } from "@/lib/api";
import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthStore } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      initialized: false,
      hasCompletedOnboarding: false,
      user: null,
      hasCompletedRegistration: false,

      init: async () => {
        set({ initialized: true });
      },

      setUser: user => set({ user }),

      signOut: async () => {
        try {
          await api.post("auth/logout");
        } catch {
          // Ignore network errors on logout
        }
        set({ user: null });
      },

      completeOnboarding: () => {
        set(state => ({ ...state, hasCompletedOnboarding: true }));
      },
      resetOnboarding: () => {
        set(state => ({ ...state, hasCompletedOnboarding: false }));
      },
      setOnboardingStatus: () => {
        set(state => ({ ...state, hasCompletedRegistration: true }));
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
        user: state.user,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasCompletedRegistration: state.hasCompletedRegistration
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) return null;
      }
    }
  )
);
