import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import Constants from "expo-constants";

const EXPO_PUBLIC_ENDPOINT_URL =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_ENDPOINT_URL;

export const api = axios.create({
  baseURL: EXPO_PUBLIC_ENDPOINT_URL,
  withCredentials: true,
});

// --------------------------------------------------
// REQUEST INTERCEPTOR — ALWAYS use accessToken
// --------------------------------------------------
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().session?.accessToken;


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
    console.log("API ERROR ===>", JSON.stringify(error, null, 2));
    return Promise.reject(
      error.response?.data ?? error.message ?? "Unknown error"
    );
  }
);
