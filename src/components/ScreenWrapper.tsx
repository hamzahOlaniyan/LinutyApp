import { wp } from "@/src/constant/common";
import { GLOBAL_STYLES } from "@/src/constant/globalStyles";
import React from "react";
import { View } from "react-native";

export default function ScreenWrapper({
   children,
   paddingHorizontal = 4,
}: {
   children: React.ReactNode;
   paddingHorizontal?: number;
}) {
   return (
      <View
         style={[
            GLOBAL_STYLES.flex,
            {
               paddingHorizontal: wp(paddingHorizontal),
            },
         ]}
      >
         {children}
      </View>
   );
}
