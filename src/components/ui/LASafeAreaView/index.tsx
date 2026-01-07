import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LASafeAreaView({
  children,
  padding
}: {
  children: React.ReactNode;
  padding?: boolean;
}) {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: padding ? wp(3) : 0,
        backgroundColor: appColors.white,
        flex: 1,
        justifyContent: "center"
      }}
    >
      <Text>{children}</Text>
    </SafeAreaView>
  );
}
