import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
// import { Database } from "../types/database.types";

const supabaseUrl = "https://kttxalavymeiicyrwefq.supabase.co";
const supabaseAnonKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dHhhbGF2eW1laWljeXJ3ZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDY3MzMsImV4cCI6MjA2Mjk4MjczM30.EOxYNIEICekBygc5SV9D1wpKwqMEEg8DDk8wvJlKfe8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
   auth: {
      storage: {
         async getItem(key) {
            return AsyncStorage.getItem(key);
         },
         async setItem(key, value) {
            await AsyncStorage.setItem(key, value);
         },
         async removeItem(key) {
            await AsyncStorage.removeItem(key);
         },
      },

      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
   },
});

AppState.addEventListener("change", (state) => {
   if (state === "active") {
      supabase.auth.startAutoRefresh();
   } else {
      supabase.auth.stopAutoRefresh();
   }
});
