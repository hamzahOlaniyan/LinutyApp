import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Setting() {
  const { signOut } = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await signOut().then(r => console.log("R", r));
    // console.log("clicked logged out");
    router.replace("/auth"); // or "/"
  }
  return (
    <View>
      <Text>Setting</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
