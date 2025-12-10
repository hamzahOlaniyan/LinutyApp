import Button from "@/components/ui/Button";
import ScreenWapper from "@/components/ui/ScreenWapper";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function HomeFeed() {
  const { signOut } = useAuthStore();

  async function handleLogout() {
    await signOut();
    router.replace("/auth"); // or "/"
  }

  return (
    <ScreenWapper>
      <Text className="text-xxl">HomeFeed</Text>
      <Button
        variant="outline"
        text="sign out"
        onPress={() => handleLogout()}
      />
    </ScreenWapper>
  );
}
