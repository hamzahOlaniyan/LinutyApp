import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupportedStorage } from "@supabase/supabase-js";
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

let storage: SupportedStorage | undefined;

if (typeof window !== "undefined") {
    storage = window.localStorage;
}else{
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    storage = AsyncStorage;
  } catch {
    // During expo export / node environment: no storage available
    storage = undefined;
  }
}

const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    // console.debug("getItem", { key })
    return AsyncStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value)
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key)
  },
};
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      storage: ExpoWebSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);