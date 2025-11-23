import { Font } from "@/assets/fonts/FontFamily";
import { useAuthStore } from "@/store/authStore";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryProvider } from "../provider/QueryProvider";

export const unstable_settings = {
   anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const { session, profile, hasHydrated, loading } = useAuthStore();

   const [loaded] = useFonts({
      [Font.Black]: require("@/assets/fonts/TikTokSans-Black.ttf"),
      [Font.ExtraBold]: require("@/assets/fonts/TikTokSans-ExtraBold.ttf"),
      [Font.Bold]: require("@/assets/fonts/TikTokSans-Bold.ttf"),
      [Font.SemiBold]: require("@/assets/fonts/TikTokSans-SemiBold.ttf"),
      [Font.Medium]: require("@/assets/fonts/TikTokSans-Medium.ttf"),
      [Font.Regular]: require("@/assets/fonts/TikTokSans-Regular.ttf"),
      [Font.Light]: require("@/assets/fonts/TikTokSans-Light.ttf"),
   });

   useEffect(() => {
      if (loaded && hasHydrated) {
         SplashScreen.hideAsync();
      }
   }, [hasHydrated, loaded]);

   if (!loaded || !hasHydrated || loading) {
      return null;
   }

   return (
      <QueryProvider>
         {/* <QueryClientProvider client={queryClient}> */}
         <GestureHandlerRootView className="flex-1">
            <PortalProvider>
               <PortalHost name="root" />
               <SafeAreaProvider>
                  <GluestackUIProvider>
                     <StatusBar style="auto" />
                     <Stack screenOptions={{ animation: "none", headerShown: false }}>
                        {/* Logged-in & profile complete -> main app group */}
                        <Stack.Protected guard={!!session && profile?.isComplete !== false}>
                           <Stack.Screen name="(app)" />
                        </Stack.Protected>

                        {/* Logged-in & profile incomplete -> onboarding */}
                        <Stack.Protected guard={!!session && profile?.isComplete === false}>
                           <Stack.Screen name="auth/new-user/PartTwo/step-4.0" />
                        </Stack.Protected>

                        {/* Logged-out -> auth */}
                        <Stack.Protected guard={!session}>
                           <Stack.Screen name="auth" />
                        </Stack.Protected>
                     </Stack>
                  </GluestackUIProvider>
               </SafeAreaProvider>
            </PortalProvider>
         </GestureHandlerRootView>
         {/* </QueryClientProvider> */}
      </QueryProvider>
   );
}
