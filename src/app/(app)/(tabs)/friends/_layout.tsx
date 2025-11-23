import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
   return (
      <Stack screenOptions={{ headerShadowVisible: false }}>
         <Stack.Screen
            name="index"
            options={{
               headerShown: false,
               // headerTitleAlign: "left",
               // headerShadowVisible: false,
               // headerTitleStyle: { fontSize: 20, fontFamily: TiktokFont.TiktokSemiBold },
               // animation: "slide_from_bottom",
            }}
         />
         <Stack.Screen
            name="suggested"
            options={
               {
                  // headerShown: false,
                  // headerTitleAlign: "left",
                  // headerShadowVisible: false,
                  // headerTitleStyle: { fontSize: 20, fontFamily: TiktokFont.TiktokSemiBold },
                  // animation: "slide_from_bottom",
               }
            }
         />
      </Stack>
   );
}
