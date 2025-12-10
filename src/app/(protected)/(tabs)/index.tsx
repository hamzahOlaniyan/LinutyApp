import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function HomeFeed() {
  const { signOut } = useAuthStore();

  async function handleLogout() {
    await signOut();
    router.replace("/auth"); // or "/"
  }

  return (
    <View className="flex-1 justify-center bg-yellow-500">
      <Text className="text-xxl">HomeFeed</Text>
      <Button
        variant="outline"
        text="sign out"
        onPress={() => handleLogout()}
      />
    </View>
  );
}
