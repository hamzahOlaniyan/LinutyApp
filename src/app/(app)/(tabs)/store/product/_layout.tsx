import { Font } from "@/assets/fonts/FontFamily";
import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
   return (
      <Stack
         screenOptions={{
            headerShadowVisible: false,
            headerTitleStyle: { fontSize: 20, fontFamily: Font.SemiBold },
            headerTitleAlign: "left",
         }}
      >
         <Stack.Screen
            name="[id]"
            options={{
               headerTitle: "",
            }}
         />
         <Stack.Screen
            name="edit/[id]"
            options={{
               headerShown: false,
            }}
         />
      </Stack>
   );
}
