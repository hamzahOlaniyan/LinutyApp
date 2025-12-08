import { queryClient } from "@/app/_layout";
import { api } from "@/lib/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getItem, removeItem, setItem } from "./secureStore";
import { AuthStore } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      initialized: false,
      hasCompletedOnboarding: false,
      user: null,
      session: null,
      hasCompletedRegistration: false,

      setUser: async (user) => set({ user }),

      setSession: async (session) => {
        try {
          // const res = await api.get<SessionResponse>("auth/session");

          set({
            session: session,
            user:session?.user,
          });
        } catch (err) {
          console.log("failed to get session", err);
        }
      },
      signOut: async () => {
        try {
          await api.post("auth/logout");
        } catch (err) {
          console.log("logout failed", err);
        } finally {
          queryClient.clear();

          set({
            session: null,
            user: null,
            hasCompletedOnboarding: false,
            hasCompletedRegistration: false,
          });
        }
      },

      completeOnboarding: () => {
        set((state) => ({ ...state, hasCompletedOnboarding: true }));
      },
      resetOnboarding: () => {
        set((state) => ({ ...state, hasCompletedOnboarding: false }));
      },
      setOnboardingStatus: () => {
        set((state) => ({ ...state, hasCompletedRegistration: true }));
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem,
      })),
      partialize: (state) => ({
        user: state.user,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasCompletedRegistration: state.hasCompletedRegistration,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log("rehydration error", error);
          return;
        }
        if (state) {
          state.initialized = true;
        }
      },
    },
  ),
);
