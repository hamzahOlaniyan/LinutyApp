import { queryClient } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthStore } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      initialized: false,
      hasCompletedAppStart: false,
      me: null,
      session:null,
      signingOut: false,


      init: async () => {
        set({ initialized: false});
        const { data } = await supabase.auth.getSession();
        // console.log("SESSION AFTER SIGNOUT:", data.session);
        set({ session: data.session});
        set({ initialized: true });
      },

      setInitialized: (initialized) => set({ initialized }),
      
      setMe: (me) => set({ me }),

      setSession: (session)=>set({session}),
        
      signOut: async () => {
        set({ signingOut: true });
        try {
           await supabase.auth.signOut({scope:"local"});
           // console.log('LOG OUT ERROR', error?.message);
           set({ session: null, me: null });
           queryClient.clear();
        } finally {
          set({ signingOut: false });
        }
      },

      setHascompleteAppStart: (value) => set({ hasCompletedAppStart: value }),

      completeAppStart:() => set({ hasCompletedAppStart: true }),

    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        hasCompletedAppStart: state.hasCompletedAppStart,
        me: state.me,
      }),
    }
  )
);
