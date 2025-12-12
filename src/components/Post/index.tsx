import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import React from "react";
import { View } from "react-native";

export default function Post() {
  return (
    <View style={{ height: hp(10), backgroundColor: appColors.white }}>
      {/* <Image source={{ uri: item.image }} style={{ width: 300, height: 300 }} /> */}
      {/* <AppText>{item.title}</AppText> */}
    </View>
  );
}
