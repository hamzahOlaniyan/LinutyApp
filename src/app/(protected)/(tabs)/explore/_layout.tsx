import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="clans" />
      <Stack.Screen name="lineage-map" />
      <Stack.Screen name="discover" />
      <Stack.Screen name="clan-members" />
      <Stack.Screen name="gathering" />
    </Stack>
  );
}
