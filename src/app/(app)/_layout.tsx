import { useAuthStore } from "@/src/store/authStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
   const { session, profile, loading, user } = useAuthStore();
   const router = useRouter();

   useEffect(() => {
      if (loading) return;
      if (!session) {
         router.replace("/(auth)");
         return;
      }
      if (profile?.isComplete === false) {
         router.replace("/(new-user)/PartTwo/step-4");
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

   return <Stack screenOptions={{ headerShown: false }} />;
}
