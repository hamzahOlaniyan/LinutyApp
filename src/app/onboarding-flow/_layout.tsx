// app/onboarding-flow/_layout.tsx
import { Stack } from "expo-router";

export default function OnboardingFlowLayout() {
  // const session = useAuthStore(s => s.session);
  // const initialized = useAuthStore(s => s.initialized);

  // if (!initialized) return null;

  // if (session) return <Redirect href="/(protected)/(tabs)/(home)" />;

  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerTitle: "" }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
