import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export default function ScreenView({
  children,
  style
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        style,
        { paddingHorizontal: wp(4), backgroundColor: appColors.white }
      ]}
      className="flex-1"
    >
      {children}
    </View>
  );
}
