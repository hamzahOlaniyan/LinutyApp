import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import Constants from "expo-constants";

const EXPO_PUBLIC_ENDPOINT_URL =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_ENDPOINT_URL;

export const api = axios.create({
  baseURL: EXPO_PUBLIC_ENDPOINT_URL,
  withCredentials: true,
  // timeout:1000
});

// --------------------------------------------------
// REQUEST INTERCEPTOR — ALWAYS use accessToken
// --------------------------------------------------
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().session?.access_token;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    if (config.headers) delete (config.headers).Authorization;
  }

  
  return config;
});

// --------------------------------------------------
// RESPONSE INTERCEPTOR — Better error output
// --------------------------------------------------

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;
    console.log("HTTP FAIL:", status, url, error?.response?.data);
    return Promise.reject(error); // ✅ keep axios error
  }
);


// --------------------------------------------------
// NEWS API — Better error output
// --------------------------------------------------


export async function fetchNews() {
   const url = "https://newsdata.io/api/1/latest?apikey=pub_de7765bb83e347169f3daaff819a3049&q=somalia&language=so,nl,en,it,ar";

   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
   }

   return res.json();
}
