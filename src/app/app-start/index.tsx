import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AppStart() {
  const router = useRouter();

  const handleOnboarding = () => {
    router.push("/app-start/part2");
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <AppText variant="headerLarge">Onboarding Part 1</AppText>
      <AppText variant="header">Welcome to Lunity</AppText>
      <Button text="continue" variant="outline" onPress={handleOnboarding}>
        Let's get to work
      </Button>
    </View>
  );
}
