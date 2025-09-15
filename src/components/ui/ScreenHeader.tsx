import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

type PageHeaderProps = {
   headerTitle?: string;
   color?: string;
   leftAction?: React.ReactNode;
};

export default function ScreenHeader({ headerTitle, color, leftAction }: PageHeaderProps) {
   return (
      <View className="mb-2 px-4 flex-row justify-between">
         <AppText size="xxl" weight="bold">
            {headerTitle}
         </AppText>
         {leftAction && leftAction}
      </View>
   );
}
