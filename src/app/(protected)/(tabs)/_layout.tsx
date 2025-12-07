import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { HomeSolid } from "@/icons/ico/home-solid";
import { Tabs, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "./(home)";

export default function TabLayout() {
   const insets = useSafeAreaInsets();
   const pathname = usePathname();

   const hideTabRoutes = [
      // "/(app)/edit/[id]",
      // "/(app)/new-post",
      // "/(app)/auth",
      "/product/edit",
   ];

   const isTabHidden = useMemo(() => hideTabRoutes.some((r) => pathname.startsWith(r.replace("[id]", ""))), [pathname]);

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: appColors.primary,
            tabBarInactiveTintColor: appColors.black,
            tabBarLabelStyle: { textTransform: "capitalize", fontFamily: Font.Medium },
            tabBarStyle: {
               bottom: insets.bottom - 10,
            },
         }}
      >
         <Tabs.Screen
            name="(home)"
            options={{
               title: "Home",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        backgroundColor: focused ? appColors.primary : "",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: 5,
                     }}
                  >
                     {focused ? <HomeSolid size={24} color={appColors.white} /> : <Home />}
                  </View>
               ),
            }}
         />
      </Tabs>
   );
}
