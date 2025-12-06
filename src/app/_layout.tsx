import { Font } from "@/assets/fonts/FontFamily";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useAuthStore } from "@/store/useAuthStore";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";

export const unstable_settings = {
   anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function AuthLoader({ children }: { children: React.ReactNode }) {
   useUserQuery();
   return <>{children}</>;
}

export default function RootLayout() {
   const { initialized, user, init, hasCompletedOnboarding, hasCompletedRegistration } = useAuthStore();
   const colorScheme = useColorScheme();

   const endpointUrl = Constants.expoConfig?.extra?.endpointUrl;

   console.log({ endpointUrl });

   const isLoggedIn = !!user;

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
      if (loaded && initialized) {
         SplashScreen.hideAsync();
      }
   }, [loaded, initialized]);

   useEffect(() => {
      init();
   }, []);

   if (!loaded || !initialized) {
      return null;
   }

   return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
         <QueryClientProvider client={queryClient}>
            <AuthLoader>
               {/* <QueryProvider>
                  <QueryClientProvider client={queryClient}> */}
               <GestureHandlerRootView className="flex-1">
                  <PortalProvider>
                     <PortalHost name="root" />
                     {/* <SafeAreaProvider> */}
                     <GluestackUIProvider>
                        <StatusBar style="auto" />
                        <Stack>
                           <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding}>
                              <Stack.Screen
                                 name="(protected)/(tabs)"
                                 options={{ headerShown: false, animation: "none" }}
                              />
                           </Stack.Protected>

                           <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding && !hasCompletedRegistration}>
                              <Stack.Screen name="onboarding-flow" options={{ headerShown: false }} />
                           </Stack.Protected>

                           <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
                              <Stack.Screen name="auth" options={{ headerShown: false }} />
                           </Stack.Protected>

                           <Stack.Protected guard={!hasCompletedOnboarding}>
                              <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
                           </Stack.Protected>
                        </Stack>
                     </GluestackUIProvider>
                     {/* </SafeAreaProvider> */}
                  </PortalProvider>
               </GestureHandlerRootView>
               {/* </QueryClientProvider>
               </QueryProvider> */}
            </AuthLoader>
         </QueryClientProvider>
      </ThemeProvider>
   );
}
