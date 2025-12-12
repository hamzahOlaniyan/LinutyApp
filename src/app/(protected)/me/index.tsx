import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Button, View } from "react-native";

export default function Me() {
  const { signOut } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace("/auth"); // or "/"
  }

  return (
    <View>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
