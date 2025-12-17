import AppText from "@/components/ui/AppText";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <AppText variant={"headerLarge"}>UserProfile</AppText>
      <AppText variant={"headerLarge"}>{id}</AppText>
    </View>
  );
}
