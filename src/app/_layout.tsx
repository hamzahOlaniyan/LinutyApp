import { Font } from "@/assets/fonts/FontFamily";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useMeQuery } from "@/hooks/useMeQuery";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/store/useAuthStore";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";

import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../../global.css";

export const hasCompletedRegistration = false;

export const unstable_settings = {
  anchor: "auth"
};

SplashScreen.preventAutoHideAsync();

function AuthLoader({ children }: { children: React.ReactNode }) {
  useMeQuery();
  return <>{children}</>;
}

export default function RootLayout() {
  const { initialized, init, me, session, hasCompletedOnboarding } =
    useAuthStore();

  const isLoggedIn = !!session;
  const hasCompletedRegistration = !!me?.isProfileComplete;

  const [loaded] = useFonts({
    [Font.Black]: require("@/assets/fonts/TikTokSans-Black.ttf"),
    [Font.ExtraBold]: require("@/assets/fonts/TikTokSans-ExtraBold.ttf"),
    [Font.Bold]: require("@/assets/fonts/TikTokSans-Bold.ttf"),
    [Font.SemiBold]: require("@/assets/fonts/TikTokSans-SemiBold.ttf"),
    [Font.Medium]: require("@/assets/fonts/TikTokSans-Medium.ttf"),
    [Font.Regular]: require("@/assets/fonts/TikTokSans-Regular.ttf"),
    [Font.Light]: require("@/assets/fonts/TikTokSans-Light.ttf")
  });

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialized]);

  useEffect(() => {
    init();
  }, []);

  if (!loaded || !initialized) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthLoader>
        <GestureHandlerRootView className="flex-1">
          <PortalProvider>
            <PortalHost name="root" />
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack>
                <Stack.Protected
                  guard={
                    isLoggedIn &&
                    hasCompletedOnboarding &&
                    hasCompletedRegistration
                  }
                >
                  <Stack.Screen
                    name="(protected)"
                    options={{ headerShown: false, animation: "none" }}
                  />
                </Stack.Protected>

                <Stack.Protected
                  guard={
                    isLoggedIn &&
                    hasCompletedOnboarding &&
                    !hasCompletedRegistration
                  }
                >
                  <Stack.Screen
                    name="onboarding-flow"
                    options={{ headerShown: false }}
                  />
                </Stack.Protected>

                <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
                  <Stack.Screen name="auth" options={{ headerShown: false }} />
                </Stack.Protected>

                <Stack.Protected guard={!hasCompletedOnboarding}>
                  <Stack.Screen
                    name="onboarding/index"
                    options={{ headerShown: false }}
                  />
                </Stack.Protected>
              </Stack>
            </Stack>
          </PortalProvider>
        </GestureHandlerRootView>
      </AuthLoader>
    </QueryClientProvider>
  );
}
