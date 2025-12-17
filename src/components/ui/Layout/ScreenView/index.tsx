import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React from "react";
import { View } from "react-native";

export default function ScreenView({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{ paddingHorizontal: wp(3), backgroundColor: appColors.white }}
      className="flex-1"
    >
      {children}
    </View>
  );
}
