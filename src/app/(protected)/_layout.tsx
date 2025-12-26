import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function _ProtectedLayout() {
  const router = useRouter();
  const session = useAuthStore(s => s.session);
  const initialized = useAuthStore(s => s.initialized);
  const me = useAuthStore(s => s.me);

  const hasCompletedRegistration = !!me?.isProfileComplete;

  if (!initialized) return null;

  if (session && !hasCompletedRegistration)
    return <Redirect href="/onboarding-flow" />;

  if (!session && !hasCompletedRegistration) return <Redirect href="/auth" />;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="me"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="post/[postId]"
        options={{
          title: "Edit post",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="close" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="user/[id]"
        options={{ title: "user", headerShown: false }}
      />

      <Stack.Screen
        name="create-post"
        options={{
          title: "Create post",
          animation: "none",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="close" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center"
        }}
      />

      <Stack.Screen
        name="notification"
        options={{
          title: "Notification",
          animation: "none"
        }}
      />

      <Stack.Screen
        name="+not-found"
        options={{
          title: "page not found!",
          animation: "none"
        }}
      />
    </Stack>
  );
}
