import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const session = useAuthStore(s => s.session);
  const initialized = useAuthStore(s => s.initialized);

  if (!initialized) return null;

  if (session) return <Redirect href="/(protected)/(tabs)/(home)" />;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false
      }}
    />
  );
}
