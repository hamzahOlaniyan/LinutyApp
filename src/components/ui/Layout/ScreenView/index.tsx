import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export default function ScreenView({
  children,
  style,
  className
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}) {
  return (
    <View
      style={[
        style,
        { paddingHorizontal: wp(3), backgroundColor: appColors.white }
      ]}
      className={`flex-1 ${className}`}
    >
      {children}
    </View>
  );
}
