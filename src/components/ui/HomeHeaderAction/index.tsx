import Icon from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";

export default function HomeHeaderAction() {
  const router = useRouter();
  return (
    <View className="h-full flex-row items-center justify-between gap-8">
      <TouchableOpacity onPress={() => router.push("/(protected)/create-post")}>
        <Icon name="plus" size={28} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(protected)/notification")}
      >
        <Icon name="notification" size={28} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(protected)/me")}>
        <Avatar />
      </TouchableOpacity>
    </View>
  );
}
