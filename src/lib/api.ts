import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import Constants from "expo-constants";

const EXPO_PUBLIC_ENDPOINT_URL =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_ENDPOINT_URL;

export const api = axios.create({
  baseURL: EXPO_PUBLIC_ENDPOINT_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { session } = useAuthStore.getState(); // Zustand: safe to use outside React

  if (session?.access_token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR ===>", JSON.stringify(error, null, 2));
    const customError =
      error.response?.data ?? error.message ?? "Unknown error";

    return Promise.reject(customError);
  },
);
