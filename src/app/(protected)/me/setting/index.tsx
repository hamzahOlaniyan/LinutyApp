import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Setting() {
  const signOut = useAuthStore(s => s.signOut);

  async function handleLogout() {
    await signOut();
  }

  return (
    <View>
      <Text>Setting</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
