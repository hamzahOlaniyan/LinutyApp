import { wp } from "@/src/constant/common";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenWrapper({
   children,
   paddingHorizontal = 4,
   bg = "white",
}: {
   children: React.ReactNode;
   paddingHorizontal?: number;
   bg?: string;
}) {
   const { top, bottom } = useSafeAreaInsets();

   return (
      <View
         style={{
            position: "relative",
            marginBottom: bottom,
            overflow: "hidden",
            // paddingTop: top,
            flex: 1,
            paddingHorizontal: wp(paddingHorizontal),
            backgroundColor: bg,
         }}
      >
         {children}
      </View>
   );
}
