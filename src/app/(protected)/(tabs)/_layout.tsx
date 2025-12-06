import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { DiscoverIcon } from "@/icons/ico/DiscoverIcon";
import { DiscoverIconSolid } from "@/icons/ico/DiscoverIconSolid";
import { FriendsIcon } from "@/icons/ico/friendsIcon";
import { FriendsIconSolid } from "@/icons/ico/friendsIconSolid";
import { HomeSolid } from "@/icons/ico/home-solid";
import { NewsIcon } from "@/icons/ico/NewsIcon";
import { NewsIconSolid } from "@/icons/ico/NewsIconSolid";
import { StoreSolid } from "@/icons/ico/store-solid";
import { Tabs, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "./(home)";
import Store from "./store";

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
            name="(home)/index"
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
         <Tabs.Screen
            name="explore"
            options={{
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
                     {focused ? <DiscoverIconSolid size={24} color={appColors.white} /> : <DiscoverIcon size={24} />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="friends"
            options={{
               title: "friends",
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
                     {focused ? <FriendsIconSolid size={24} color={appColors.white} /> : <FriendsIcon size={24} />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="store"
            options={{
               title: "store",
               headerShown: false,
               popToTopOnBlur: true,
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
                     {focused ? <StoreSolid size={24} color={appColors.white} /> : <Store />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="news"
            options={{
               title: "news",
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
                     {focused ? <NewsIconSolid size={24} color={appColors.white} /> : <NewsIcon size={24} />}
                  </View>
               ),
            }}
         />
      </Tabs>
   );
}
