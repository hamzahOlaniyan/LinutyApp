// app/onboarding-flow/_layout.tsx
import { Stack } from "expo-router";

export default function OnboardingFlowLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerTitle: "" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
