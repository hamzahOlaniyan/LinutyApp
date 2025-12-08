import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AppStart() {
  const { completeOnboarding } = useAuthStore();
  const router = useRouter();

  const handleOnboarding = () => {
    completeOnboarding();
    router.push("/auth/sign-in");
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <AppText variant="headerLarge">Onboarding Part 3</AppText>
      <AppText variant="header">Welcome to Lunity</AppText>
      <Button text="continue" variant="outline" onPress={handleOnboarding}>
        Let's get to work
      </Button>
    </View>
  );
}
