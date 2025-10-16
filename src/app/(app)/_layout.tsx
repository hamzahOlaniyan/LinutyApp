import { useAuthStore } from "@/src/store/authStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
   const { session, profile, loading, hasHydrated } = useAuthStore();
   const router = useRouter();

   useEffect(() => {
      // Only run redirect logic AFTER hydration completes
      if (!hasHydrated) return;

      // Optional: skip redirects while still loading async stuff
      if (loading) return;

      if (!session) {
         router.replace("/(auth)");
         return;
      }

      if (session && profile?.isComplete === false) {
         router.replace("/(new-user)/PartTwo/step-4.0");
         return;
      }
   }, [hasHydrated, loading, session, profile]);

   // Loading state or hydration pending → show spinner
   if (!hasHydrated || loading) {
      return (
         <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="large" />
         </View>
      );
   }
   return (
      <Stack
         screenOptions={{
            headerShadowVisible: false,
         }}
      >
         <Stack.Screen
            name="(profile)"
            options={{
               title: "Profile",
               headerShown: false,
            }}
         />
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(user)/[id]" />
         <Stack.Screen
            name="new-post"
            options={{
               title: "New post",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               animation: "none",
            }}
         />
         <Stack.Screen
            name="notification"
            options={{
               title: "Notification",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               animation: "none",
            }}
         />
      </Stack>
   );
}
