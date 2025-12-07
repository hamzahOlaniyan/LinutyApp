import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
   return (
      <Stack>
         <Stack.Screen name="signin/index" options={{ headerShown: false }} />
         <Stack.Screen name="createAccount" options={{ headerShown: false }} />
      </Stack>
   );
}
