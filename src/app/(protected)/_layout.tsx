import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="me" />

      <Stack.Screen
        name="create-post"
        options={{
          title: "New post",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          animation: "none"
        }}
      />

      <Stack.Screen
        name="notification"
        options={{
          title: "Notification",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          animation: "none"
        }}
      />

      <Stack.Screen
        name="+not-found"
        options={{
          title: "page not found!",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          animation: "none"
        }}
      />
    </Stack>
  );
}
