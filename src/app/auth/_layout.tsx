// // app/auth/_layout.tsx
// import { Stack, Redirect } from "expo-router";
// import { useAuthStore } from "@/store/useAuthStore";

// export default function AuthLayout() {
//   const { user, me, hasCompletedOnboarding } = useAuthStore();

//   const isLoggedIn = !!user;
//   const hasCompletedRegistration = !!me?.isProfileComplete;

//   // already fully onboarded + registered → go to app
//   if (isLoggedIn && hasCompletedOnboarding && hasCompletedRegistration) {
//     return <Redirect href="/(protected)/(tabs)" />;
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" /> {/* e.g. sign-in/sign-up screen */}
//     </Stack>
//   );
// }

import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
