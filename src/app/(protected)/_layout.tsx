import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";

export default function _ProtectedLayout() {
  const router = useRouter();
  const { me, initialized, session, hasCompletedAppStart } = useAuthStore();

  const hasCompletedRegistration = me?.isProfileComplete;

  if (!initialized) return null;

  useEffect(() => {
    // if (!hasCompletedAppStart) {
    //   router.replace("/app-start");
    //   return;
    // }
    if (!session && !me) <Redirect href="/auth" />;
    if (session && !hasCompletedRegistration)
      <Redirect href="/onboarding-flow" />;

    // if (session && !hasCompletedRegistration)
    //   return <Redirect href="/onboarding-flow" />;
  }, [hasCompletedAppStart, session, hasCompletedRegistration]);

  // if (!session && ) return <Redirect href="/auth" />;

  // if (session) return <Redirect href="/(protected)/(tabs)/(home)" />;

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
        name="post"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="profile"
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
