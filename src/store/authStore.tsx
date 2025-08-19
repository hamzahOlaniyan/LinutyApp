import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type userState = {
   session: Session | null;
   setSession: (session: Session | null) => void;
};

export const useAuthStore = create<userState>()(
   persist(
      (set) => ({
         session: null,
         setSession: (session) => set({ session }),
      }),
      {
         name: "auth-store",
         storage: createJSONStorage(() => AsyncStorage),
         version: 1,
      }
   )
);
