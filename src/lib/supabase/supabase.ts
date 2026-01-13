import type { SupportedStorage } from "@supabase/supabase-js";
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const isReactNative =
  typeof navigator !== "undefined" && navigator.product === "ReactNative";

const isWeb =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

let storage: SupportedStorage | undefined;

if (isWeb) {
  storage = window.localStorage;
} else if (isReactNative) {
  // ✅ only in real RN runtime
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  storage = require("@react-native-async-storage/async-storage").default;
} else {
  // ✅ Node / expo export: no storage
  storage = undefined;
}


export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      storage: storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);