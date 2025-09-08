import BackButton from "@/src/components/ui/BackButton";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{
               title: "Profile",
               headerShown: false,
               headerLeft: () => <BackButton />,
            }}
         />
      </Stack>
   );
}
