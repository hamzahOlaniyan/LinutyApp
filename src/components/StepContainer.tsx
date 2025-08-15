import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

export default function StepContainer({
   children,
   heading,
   paragraph,
}: {
   children: React.ReactNode;
   heading: string;
   paragraph: string;
}) {
   return (
      
      <View className="gap-4">
         <View>
            <AppText size="xxl" weight="bold">
               {heading}
            </AppText>
            <AppText size="lg" weight="med">
               {paragraph}
            </AppText>
         </View>
         <View className="mt-5">{children}</View>
      </View>
   );
}
