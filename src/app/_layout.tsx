import { Font } from "@/assets/fonts/FontFamily";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useAuthStore } from "@/store/useAuthStore";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../../global.css";

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
   const colorScheme = useColorScheme();
   const { initialized, session, user, hasCompletedOnboarding, hasCompletedRegistration } = useAuthStore();
   const setSession = useAuthStore((state) => state.setSession);

   const isLoggedIn = !!session && !!user;

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
      if (initialized) {
         setSession(); // call once store is hydrated
      }
   }, [initialized]);

   useEffect(() => {
      if (loaded && initialized) {
         SplashScreen.hideAsync();
      }
   }, [loaded, initialized]);

   if (!loaded || !initialized) {
      return null;
   }

   return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
         <QueryClientProvider client={queryClient}>
            <AuthLoader>
               <StatusBar style="auto" />
               <Stack>
                  <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding && hasCompletedRegistration}>
                     <Stack.Screen name="(protected)/(tabs)" options={{ headerShown: false, animation: "none" }} />
                  </Stack.Protected>
                  <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding && !hasCompletedRegistration}>
                     <Stack.Screen name="onboarding-flow" options={{ headerShown: false }} />
                  </Stack.Protected>
                  {/* 
                   <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding}>
                     <Stack.Screen name="(protected)/(tabs)" options={{ headerShown: false, animation: "none" }} />
                  </Stack.Protected> */}

                  {/* <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding && !hasCompletedRegistration}>
                     <Stack.Screen name="onboarding-flow" options={{ headerShown: false }} />
                  </Stack.Protected> */}

                  <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
                     <Stack.Screen name="auth" options={{ headerShown: false }} />
                  </Stack.Protected>

                  {/* <Stack.Protected guard={!hasCompletedOnboarding}>
                     <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
                  </Stack.Protected>  */}
               </Stack>
            </AuthLoader>
         </QueryClientProvider>
      </ThemeProvider>
   );
}
