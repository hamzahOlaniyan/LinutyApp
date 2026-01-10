import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="[productId]" />
      <Stack.Screen name="edit/[id]" />
    </Stack>
  );
}
