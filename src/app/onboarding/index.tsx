import AppText from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Onboarding() {
   const { completeOnboarding } = useAuthStore();
   const { bottom } = useSafeAreaInsets();
   const router = useRouter();

   const handleOnboarding = () => {
      completeOnboarding();
      router.push("/auth/signin");
   };
   return (
      <SafeAreaView className="bg-white flex-1 justify-center items-center">
         <AppText size="xxxl">Onboarding</AppText>
         <Button title="complete onboarding" onPress={() => ""} />
      </SafeAreaView>
   );
}
