import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";

// Use lazy require so AsyncStorage is only loaded in React Native
let storage: any = undefined;

try {
   // Dynamically import react-native APIs only if available
   const { Platform } = require("react-native");
   if (Platform?.OS !== "web") {
      storage = require("@react-native-async-storage/async-storage").default;
   }
} catch {
   // We're in Node.js (no react-native available), keep storage = undefined
}

const supabaseUrl = "https://kttxalavymeiicyrwefq.supabase.co";
const supabaseAnonKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dHhhbGF2eW1laWljeXJ3ZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDY3MzMsImV4cCI6MjA2Mjk4MjczM30.EOxYNIEICekBygc5SV9D1wpKwqMEEg8DDk8wvJlKfe8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
   auth: {
      storage,
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
