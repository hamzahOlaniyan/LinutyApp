// app/onboarding-flow/_layout.tsx
import { Stack } from "expo-router";

export default function OnboardingFlowLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* add more onboarding screens if needed */}
    </Stack>
  );
}
