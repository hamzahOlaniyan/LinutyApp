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
   paragraph: string;
   footer?: boolean;
}) {
   const router = useRouter();
   return (
      <View className="gap-4">
         <View>
            <View className="gap-3">
               <AppText size="xxl" weight="bold">
                  {heading}
               </AppText>
               <AppText size="lg" weight="med">
                  {paragraph}
               </AppText>
            </View>
            <View className="mt-5">{children}</View>
         </View>
         {footer && (
            <View className="relative bottom-4">
               <Button
                  onPress={() => router.replace("/(auth)")}
                  title="Already have an account"
                  size="lg"
                  variant="plain"
               />
            </View>
         )}
      </View>
   );
}
