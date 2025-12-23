// app/app-start/_layout.tsx
import { Stack } from "expo-router";

export default function AppStartLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
