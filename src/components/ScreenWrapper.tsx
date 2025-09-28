import { wp } from "@/src/constant/common";
import React from "react";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenWrapper({
   children,
   paddingHorizontal = 4,
   innerPadding = 0,
   bg = "white",
   innerbg,
}: {
   children: React.ReactNode;
   paddingHorizontal?: number;
   innerPadding?: number;
   bg?: string;
   innerbg?: string;
}) {
   const { bottom } = useSafeAreaInsets();

   return (
      <View
         style={{
            overflow: "hidden",
            paddingHorizontal: wp(paddingHorizontal),
            backgroundColor: bg,
            flex: 1,
         }}
      >
         <SafeAreaView
            style={{
               flex: 1,
               // overflow: "hidden",
               backgroundColor: innerbg,
            }}
         >
            {children}
         </SafeAreaView>
      </View>
   );
}
