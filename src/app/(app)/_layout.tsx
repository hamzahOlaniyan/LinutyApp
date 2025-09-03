import { useAuthStore } from "@/src/store/authStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
   const { session, profile, loading, user } = useAuthStore();
   const router = useRouter();

   useEffect(() => {
      if (loading) return;
      if (!session) {
         router.replace("/(auth)");
         return;
      }
      if (session && profile?.isComplete === false) {
         router.replace("/(new-user)/PartTwo/step-4.0");
         return;
      }
   }, [session, profile, loading]);

   if (loading || (session && profile?.isComplete === false)) {
      return (
         <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
         </View>
      );
   }

   return (
      <Stack>
         <Stack.Screen
            name="(profile)"
            options={{
               title: "profile",
               animation: "slide_from_right",
            }}
         />
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen
            name="new-post"
            options={{
               title: "New post",
               headerTitleAlign: "left",
               headerShadowVisible: false,
               animation: "slide_from_bottom",
            }}
         />
         <Stack.Screen
            name="notification"
            options={{
               title: "Notification",
               headerTitleAlign: "left",
               headerShadowVisible: false,
            }}
         />
      </Stack>
   );
}
