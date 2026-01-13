import { Font } from "@/assets/fonts/FontFamily";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { SigningOutOverlay } from "@/components/ui/SignOutOverlay";
import { useMeQuery } from "@/hooks/useMeQuery";
import { queryClient } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

export const unstable_settings = {
  anchor: "auth"
};

SplashScreen.preventAutoHideAsync();

function AuthLoader({ children }: { children: React.ReactNode }) {
  useMeQuery();
  return <>{children}</>;
}

export default function RootLayout() {
  const { initialized, init } = useAuthStore();

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
    init();
  }, []);

  useEffect(() => {
    if (loaded && initialized) SplashScreen.hideAsync();
  }, [loaded, initialized]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      useAuthStore.getState().setSession(session ?? null);
      if (!session) router.replace("/auth");
      // console.log("AUTH EVENT:", event, "hasSession?", !!session);
    });
    return () => sub.subscription.unsubscribe();
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
            <Slot screenOptions={{ headerShown: false }} />
            <SigningOutOverlay />
          </PortalProvider>
        </GestureHandlerRootView>
      </AuthLoader>
    </QueryClientProvider>
  );
}
