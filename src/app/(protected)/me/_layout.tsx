import Icon from "@/icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function _layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center"
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/me/setting")}>
              <Icon name="menu" size={32} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="setting" options={{ headerShown: true }} />
      <Stack.Screen name="settings" options={{ headerShown: true }} />
      <Stack.Screen name="edit" options={{ headerShown: true }} />
      <Stack.Screen
        name="avatar"
        options={{ headerShown: true, title: "Profile picture" }}
      />
    </Stack>
  );
}
