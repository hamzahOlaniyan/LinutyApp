// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createClient } from "@supabase/supabase-js";
// import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
// import "react-native-url-polyfill/auto";


// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => {
//     console.debug("getItem", { key, getItemAsync })
//     return getItemAsync(key)
//   },
//   setItem: (key: string, value: string) => {
//     if (value.length > 2048) {
//       console.warn('Value being stored in SecureStore is larger than 2048 bytes and it may not be stored successfully. In a future SDK version, this call may throw an error.')
//     }
//     return setItemAsync(key, value)
//   },
//   removeItem: (key: string) => {
//     return deleteItemAsync(key)
//   },
// };


// export const supabase = createClient(
//   process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
//   process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
//   {
//     auth: {
//       storage: AsyncStorage ,
//       autoRefreshToken: true,
//       persistSession: true,
//       detectSessionInUrl: false,
//     },
//   },
// );


// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
//     auth: {
//     storage: AsyncStorage,
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: false,
//   },
// });

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

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