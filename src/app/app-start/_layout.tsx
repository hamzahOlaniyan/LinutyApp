// app/app-start/_layout.tsx
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function AppStartLayout() {
  const { user, hasCompletedOnboarding } = useAuthStore();
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  if (hasCompletedOnboarding) {
    return <Redirect href="/onboarding-flow" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
