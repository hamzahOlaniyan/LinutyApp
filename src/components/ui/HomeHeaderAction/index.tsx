import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { NotificationApi } from "@/hooks/useNotificationApi";
import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppLogo from "../AppLogo";
import AppText from "../AppText";
import Avatar from "../Avatar";

export default function HomeHeaderAction() {
  const router = useRouter();
  const { me } = useAuthStore();

  const { data } = NotificationApi.getNotificationCount(me?.id ?? "");
  const [count, setCount] = useState(data);

  useEffect(() => {
    if (data) setCount(data);
  }, [data]);

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
          className="relative"
        >
          <Icon name="notification" size={28} />
          {Number(count) > 0 && (
            <View style={s.badge}>
              <AppText variant={"xs"} className="font-Medium text-white">
                {Number(count)}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(protected)/me")}>
          <Avatar path={me?.avatarUrl} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 23,
    height: 23,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.primary,
    borderWidth: 2,
    borderColor: appColors.white
  }
});
