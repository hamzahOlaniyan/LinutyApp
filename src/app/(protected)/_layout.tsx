import { Stack } from "expo-router";
import React from "react";

export default function _ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="me" options={{ title: "Profile" }} />

      <Stack.Screen
        name="create-post"
        options={{
          title: "New post",
          animation: "none"
        }}
      />

      <Stack.Screen
        name="notification"
        options={{
          title: "Notification",
          animation: "none"
        }}
      />

      <Stack.Screen
        name="+not-found"
        options={{
          title: "page not found!",
          animation: "none"
        }}
      />
    </Stack>
  );
}
