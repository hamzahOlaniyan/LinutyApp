import { TiktokFont } from "@/assets/fonts/FontFamily";
import BackButton from "@/components/ui/BackButton";
import { SimpleLineIcons } from "@expo/vector-icons";
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
                  <Link href="/(app)/(profile)/(profile-menu)">
                     <SimpleLineIcons name="menu" size={24} />
                  </Link>
               ),
               headerTitleStyle: {
                  fontSize: 20,
                  fontFamily: TiktokFont.TiktokSemiBold,
               },
            }}
         />
         <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />
         <Stack.Screen
            name="(profile-menu)"
            options={{
               headerShown: false,
               headerLeft: () => <BackButton />,
            }}
         />
      </Stack>
   );
}
