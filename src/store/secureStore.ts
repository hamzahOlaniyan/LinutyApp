import * as SecureStore from "expo-secure-store";

export const getItem = (name: string) => SecureStore.getItemAsync(name);
export const setItem = (name: string, value: string) =>
  SecureStore.setItemAsync(name, value);
export const removeItem = (name: string) => SecureStore.deleteItemAsync(name);
