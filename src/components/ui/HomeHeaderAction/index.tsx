import { hp, wp } from "@/constant/common";
import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppLogo from "../AppLogo";
import Avatar from "../Avatar";

export default function HomeHeaderAction() {
  const router = useRouter();
  const { me } = useAuthStore();

  return (
    <View
      style={{ paddingHorizontal: wp(3), paddingVertical: hp(0.5) }}
      className="flex-row items-center justify-between bg-white"
    >
      <AppLogo />
      <View className="flex-row items-center gap-6">
        <TouchableOpacity
          onPress={() => router.push("/(protected)/create-post")}
        >
          <Icon name="plus" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(protected)/notification")}
        >
          <Icon name="notification" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(protected)/me")}>
          <Avatar path={me?.avatarUrl} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
