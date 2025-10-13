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
      <View style={{ alignItems: subHeading ? "flex-end" : "center" }} className="mb-2 flex-row justify-between">
         <View className="gap-2 flex-1">
            <AppText size="xxxl" weight="bold">
               {headerTitle}
            </AppText>
            {subHeading && <AppText weight="med">{subHeading}</AppText>}
         </View>
         {leftAction && <View>{leftAction}</View>}
      </View>
   );
}
