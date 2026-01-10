import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerShown: false }}>
      <Stack.Screen name="index" options={{}} />
      label
      <Stack.Screen
        name="[id]"
        options={{
          title: "article detail",
          headerTitle: () => ""
        }}
      />
    </Stack>
  );
}
