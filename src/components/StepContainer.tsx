import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import AppText from "./AppText";
import Button from "./Button";

export default function StepContainer({
   children,
   heading,
   paragraph,
   footer = false,
}: {
   children: React.ReactNode;
   heading: string;
   paragraph?: string;
   footer?: boolean;
}) {
   const router = useRouter();

   return (
      <View className="gap-4">
         <View className="gap-6">
            <View className="gap-4">
               {heading && (
                  <AppText size="xxxl" weight="bold">
                     {heading}
                  </AppText>
               )}
               {paragraph && (
                  <AppText size="lg" weight="med">
                     {paragraph}
                  </AppText>
               )}
            </View>
            <View className="">{children}</View>
         </View>
         {footer && (
            <View className="relative bottom-4">
               <Button onPress={() => router.replace("/(auth)")} text="Already have an account" size="lg" />
            </View>
         )}
      </View>
   );
}
