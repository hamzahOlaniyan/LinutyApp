import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

type PageHeaderProps = {
   headerTitle?: string;
   color?: string;
};

export default function ScreenHeader({ headerTitle, color }: PageHeaderProps) {
   return (
      <View className="mb-2">
         <AppText size="xxl" weight="bold">
            {headerTitle}
         </AppText>
      </View>
   );
}
