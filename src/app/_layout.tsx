import { Font } from "@/assets/fonts/FontFamily";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useMeQuery } from "@/hooks/useMeQuery";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "../../global.css";

// ---- RootLayout.tsx ----

export const unstable_settings = {
  anchor: "auth"
};

SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { session, me, setSession } = useAuthStore();

  // 1. Load session ONCE after Zustand hydration
  const { initialized } = useAuthStore();

  useEffect(() => {
    if (initialized && !session) {
      console.log("🚀 Loading /auth/session");
      setSession();
    }
  }, [initialized, session, setSession]);

  // 2. Load /profile/me once session exists
  const { isLoading: isMeLoading } = useMeQuery();

  // 3. Block UI until all auth info is ready
  const isReady =
    initialized &&
    !!session &&
    me !== null && // must have real profile
    !isMeLoading;

  if (!isReady)
    return (
      <View className="flex-1 items-center justify-center bg-teal-800">
        <ActivityIndicator size={"large"} color={"yellow"} />
      </View>
    ); // or a custom splash

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { session, user, me, hasCompletedOnboarding } = useAuthStore();

  // Fonts
  const [loaded] = useFonts({
    [Font.Black]: require("@/assets/fonts/TikTokSans-Black.ttf"),
    [Font.ExtraBold]: require("@/assets/fonts/TikTokSans-ExtraBold.ttf"),
    [Font.Bold]: require("@/assets/fonts/TikTokSans-Bold.ttf"),
    [Font.SemiBold]: require("@/assets/fonts/TikTokSans-SemiBold.ttf"),
    [Font.Medium]: require("@/assets/fonts/TikTokSans-Medium.ttf"),
    [Font.Regular]: require("@/assets/fonts/TikTokSans-Regular.ttf"),
    [Font.Light]: require("@/assets/fonts/TikTokSans-Light.ttf")
  });

  // Hide splash when fonts + Zustand hydration complete
  const { initialized } = useAuthStore();
  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialized]);

  if (!loaded || !initialized) return null;

  const isLoggedIn = !!session && !!user;
  const hasCompletedRegistration = !!me?.isProfileComplete;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthLoader>
          <StatusBar style="auto" />

          <Stack>
            {/* 1️⃣ Main app – logged in + onboarding done + registration done */}
            <Stack.Protected
              guard={
                isLoggedIn && hasCompletedOnboarding && hasCompletedRegistration
              }
            >
              <Stack.Screen
                name="(protected)/(tabs)"
                options={{ headerShown: false, animation: "none" }}
              />
            </Stack.Protected>

            {/* 2️⃣ Registration part 2 – logged in + onboarding done + registration NOT done */}
            <Stack.Protected
              guard={
                isLoggedIn &&
                hasCompletedOnboarding &&
                !hasCompletedRegistration
              }
            >
              <Stack.Screen
                name="onboarding-flow" // your actual route here
                options={{ headerShown: false }}
              />
            </Stack.Protected>

            <Stack.Protected guard={!hasCompletedOnboarding}>
              <Stack.Screen name="app-start" options={{ headerShown: false }} />
            </Stack.Protected>

            {/* 4️⃣ Public auth – not logged in at all */}
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="auth" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        </AuthLoader>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
