import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

export default function Post(item: any) {
  return (
    <View style={{ height: hp(10), backgroundColor: appColors.white }}>
      <Image source={{ uri: item.image }} style={{ width: 300, height: 300 }} />
      <AppText>{item.title}</AppText>
    </View>
  );
}
