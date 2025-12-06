import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenWrapper({
   children,
   paddingHorizontal = 4,
   innerPadding = 0,
   bg = "yellow",
}: // innerbg = "red",
{
   children: React.ReactNode;
   paddingHorizontal?: number;
   innerPadding?: number;
   bg?: string;
   innerbg?: string;
}) {
   const { bottom } = useSafeAreaInsets();

   return (
      // <View
      //    style={{
      //       overflow: "hidden",
      //       paddingHorizontal: wp(paddingHorizontal),
      //       backgroundColor: bg,
      //       flex: 1,
      //    }}
      // >
      <SafeAreaView
         edges={["top", "bottom"]}
         style={{
            flex: 1,
            // backgroundColor: innerbg,
         }}
      >
         {children}
      </SafeAreaView>
      // </View>
   );
}
