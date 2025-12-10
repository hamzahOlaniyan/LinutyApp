import { Font } from "@/assets/fonts/FontFamily";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/store/useAuthStore";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "../../global.css";

// ---- RootLayout.tsx ----

export const hasCompletedRegistration = false;

export const unstable_settings = {
  anchor: "auth"
};

SplashScreen.preventAutoHideAsync();

function AuthLoader({ children }: { children: React.ReactNode }) {
  const { initialized, setSession } = useAuthStore();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (!initialized || checked) return;

    (async () => {
      console.log("🔵 Restoring session on app load...");
      await setSession();
      setChecked(true);
    })();
  }, [initialized, checked]);

  if (!checked) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  // const { user, session } = useAuthStore();

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

  // const isLoggedIn = !!user && !!session;
  // const hasCompletedRegistration = !!me?.isProfileComplete;

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <QueryClientProvider client={queryClient}>
      <AuthLoader>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
        {/* <Stack screenOptions={{ headerShown: false }} /> */}

        {/* <Stack screenOptions={{ headerShown: false }}> */}
        {/* <Stack.Protected guard={isLoggedIn && hasCompletedRegistration}>
            <Stack.Screen
              name="(protected)/(tabs)"
              options={{ headerShown: false, animation: "none" }}
            />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn && !hasCompletedRegistration}>
            <Stack.Screen
              name="onboarding-flow"
              options={{ headerShown: false }}
            />
          </Stack.Protected> */}

        {/* <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack.Protected> */}

        {/* <Stack.Protected guard={!hasCompletedOnboarding}>
            <Stack.Screen
              name="onboarding/index"
              options={{ headerShown: false }}
            />
          </Stack.Protected> */}
        {/* </Stack> */}
      </AuthLoader>
    </QueryClientProvider>
  );
}
