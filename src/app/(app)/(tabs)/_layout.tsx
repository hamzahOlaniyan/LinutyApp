import { Community } from "@/assets/icons/community";
import { CommunityOtline } from "@/assets/icons/community-outline";
import { GroupIcon } from "@/assets/icons/groupIcon";
import { GroupIconSolid } from "@/assets/icons/groupIconSolid";
import { Home } from "@/assets/icons/home";
import { HomeSolid } from "@/assets/icons/home-solid";
import { Store } from "@/assets/icons/store";
import { StoreSolid } from "@/assets/icons/store-solid";
import { appColors } from "@/src/constant/colors";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
   const insets = useSafeAreaInsets();
   return (
      <Tabs
         screenOptions={{
            headerTitleAlign: "center",
            tabBarShowLabel: false,
            headerShadowVisible: false,
            tabBarStyle: {
               height: 40 + insets.bottom,
               position: "absolute",
               elevation: 0,
               borderTopColor: appColors.bordersLight,
               borderTopWidth: 0.5,
               shadowOpacity: 0,
               backgroundColor: appColors.white,
               paddingTop: 4,
            },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View>{focused ? <HomeSolid size={28} color={appColors.primary} /> : <Home size={28} />}</View>
               ),
            }}
         />
         <Tabs.Screen
            name="friends"
            options={{
               title: "Find friends",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View>
                     {focused ? <GroupIconSolid size={28} color={appColors.primary} /> : <GroupIcon size={28} />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="(store)"
            options={{
               title: "market",
               headerShown: false,
               popToTopOnBlur: true,
               tabBarIcon: ({ focused }) => (
                  <View>{focused ? <StoreSolid size={28} color={appColors.primary} /> : <Store size={28} />}</View>
               ),
            }}
         />
         <Tabs.Screen
            name="(community)"
            options={{
               title: "comunity",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View>
                     {focused ? <Community size={28} color={appColors.primary} /> : <CommunityOtline size={28} />}
                  </View>
               ),
            }}
         />
      </Tabs>
   );
}
