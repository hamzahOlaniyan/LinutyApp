import { Font } from "@/assets/fonts/FontFamily";
import BackButton from "@/components/ui/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
   return (
      <Stack screenOptions={{ headerShadowVisible: false }}>
         <Stack.Screen
            name="index"
            options={{
               title: "Profile",
               headerShadowVisible: false,
               headerRight: () => (
                  <Link href="/user-profile/settings">
                     <Ionicons name="settings-outline" size={24} color="black" />
                  </Link>
               ),
               headerTitleStyle: {
                  fontSize: 20,
                  fontFamily: Font.SemiBold,
               },
            }}
         />
         <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />
         <Stack.Screen
            name="settings"
            options={{
               headerShown: false,
               headerLeft: () => <BackButton />,
            }}
         />
      </Stack>
   );
}
