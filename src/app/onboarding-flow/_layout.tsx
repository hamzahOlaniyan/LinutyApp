// app/onboarding-flow/_layout.tsx
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function OnboardingFlowLayout() {
  const { user, me, hasCompletedOnboarding } = useAuthStore();

  const isLoggedIn = !!user;
  const hasCompletedRegistration = !!me?.isProfileComplete;

  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/app-start" />;
  }

  if (hasCompletedRegistration) {
    return <Redirect href="/(protected)/(tabs)/(home)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* add more onboarding screens if needed */}
    </Stack>
  );
}
