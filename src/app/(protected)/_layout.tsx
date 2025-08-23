import { useAuthStore } from "@/src/store/authStore";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
   const { session, profile, loading, user } = useAuthStore();
   const router = useRouter();

   if (loading) {
      return (
         <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
         </View>
      );
   }

   if (!session || !user) {
      router.replace("/(auth)");
      return;
   }

   if (!profile?.isComplete === true) {
      // <Redirect href={"/(auth)/(new-user)/PartTwo/step-4"} />;
      router.replace("/(auth)/(new-user)/PartTwo/step-4");
      return;
   }

   console.log("PROFILE PROTECTED LAYOUT", JSON.stringify(profile, null, 2));

   return <Stack screenOptions={{ headerShown: false }} />;
}
