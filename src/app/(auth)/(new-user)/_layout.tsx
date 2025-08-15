import { TiktokFont } from "@/assets/fonts/FontFamily";
import { Stack } from "expo-router";
import React from "react";

export default function NewUserLayout() {
   return (
      <Stack
         screenOptions={{
            headerTitle: "",
            headerTitleAlign: "left",
            headerShadowVisible: false,
            headerLargeTitle: false,
            headerTitleStyle: {
               fontSize: 20,
               fontFamily: TiktokFont.TiktokSemiBold,
               // color: currentTheme === "light" ? colors.light.text : colors.dark.text,
            },
            headerStyle: {
               // backgroundColor: currentTheme === "light" ? colors.light.background : colors.dark.background,
            },
         }}
      >
         <Stack.Screen name="index" />
         <Stack.Screen name="step-1" />
         <Stack.Screen name="step-2" />
         <Stack.Screen name="step-3" />
         <Stack.Screen name="step-4" />
         <Stack.Screen name="step-5" />
         <Stack.Screen name="step-6" />
         <Stack.Screen name="step-7" />
      </Stack>
   );
}
