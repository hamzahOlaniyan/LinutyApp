import { wp } from "@/src/constant/common";
import React from "react";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenWrapper({
   children,
   paddingHorizontal = 4,
   innerPadding = 0,
   bg = "white",
}: {
   children: React.ReactNode;
   paddingHorizontal?: number;
   innerPadding?: number;
   bg?: string;
}) {
   const { bottom } = useSafeAreaInsets();

   return (
      <View
         style={{
            position: "relative",
            marginBottom: bottom,
            overflow: "hidden",
            paddingHorizontal: wp(paddingHorizontal),
            backgroundColor: bg,
            flex: 1,
         }}
      >
         <SafeAreaView
            style={{
               flex: 1,
            }}
         >
            {children}
         </SafeAreaView>
      </View>
   );
}
