import axios from "axios";
import Constants from "expo-constants";

const ENDPOINT_URL = Constants.expoConfig?.extra?.ENDPOINT_URL;

export const api = axios.create({
  baseURL: ENDPOINT_URL,
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  error => {
    const customError =
      error.response?.data ?? error.message ?? "Unknown error";

    return Promise.reject(customError);
  }
);


export async function fetchNews() {
   const url = "https://newsdata.io/api/1/latest?apikey=pub_de7765bb83e347169f3daaff819a3049&q=somalia";

   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
   }

   return res.json();
}
