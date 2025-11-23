import { wp } from "@/constant/common";
import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

type PageHeaderProps = {
   headerTitle?: string;
   subHeading?: string;
   color?: string;
   leftAction?: React.ReactNode;
};

export default function ScreenHeader({ headerTitle, color, subHeading, leftAction }: PageHeaderProps) {
   return (
      <View
         style={{ paddingHorizontal: wp(4), paddingBottom: 10, alignItems: subHeading ? "flex-end" : "center" }}
         className="flex-row justify-between"
      >
         <View className="gap-2 flex-1">
            <AppText size="xxxl" weight="extraBold" color={color}>
               {headerTitle}
            </AppText>
            {subHeading && <AppText weight="semi">{subHeading}</AppText>}
         </View>
         {leftAction && <View>{leftAction}</View>}
      </View>
   );
}
