// import { createClient } from "@supabase/supabase-js";
// import { AppState } from "react-native";

// // Use lazy require so AsyncStorage is only loaded in React Native
// let storage: any = undefined;

// try {
//    // Dynamically import react-native APIs only if available
//    const { Platform } = require("react-native");
//    if (Platform?.OS !== "web") {
//       storage = require("@react-native-async-storage/async-storage").default;
//    }
// } catch {
//    // We're in Node.js (no react-native available), keep storage = undefined
// }

// const supabaseUrl = "https://kttxalavymeiicyrwefq.supabase.co";
// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

// const supabaseAnonKey =
//    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dHhhbGF2eW1laWljeXJ3ZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDY3MzMsImV4cCI6MjA2Mjk4MjczM30.EOxYNIEICekBygc5SV9D1wpKwqMEEg8DDk8wvJlKfe8";

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//    auth: {
//       storage,
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: false,
//    },
// });

// AppState.addEventListener("change", (state) => {
//    if (state === "active") {
//       supabase.auth.startAutoRefresh();
//    } else {
//       supabase.auth.stopAutoRefresh();
//    }
// });

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createClient, processLock } from "@supabase/supabase-js";
// import { AppState, Platform } from "react-native";
// import "react-native-url-polyfill/auto";

// const supabaseUrl = process.env.SUPABASE_URL as string;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//    auth: {
//       ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: false,
//       lock: processLock,
//    },
// });

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
// if (Platform.OS !== "web") {
//    AppState.addEventListener("change", (state) => {
//       if (state === "active") {
//          supabase.auth.startAutoRefresh();
//       } else {
//          supabase.auth.stopAutoRefresh();
//       }
//    });
// }
