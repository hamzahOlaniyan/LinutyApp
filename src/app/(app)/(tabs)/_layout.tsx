import { Community } from "@/assets/icons/community";
import { CommunityOtline } from "@/assets/icons/community-outline";
import { Home } from "@/assets/icons/home";
import { HomeSolid } from "@/assets/icons/home-solid";
import { Search2 } from "@/assets/icons/search-2";
import { Search2Outline } from "@/assets/icons/search-2-outline";
import { Store } from "@/assets/icons/store";
import { StoreSolid } from "@/assets/icons/store-solid";
import { colors } from "@/src/constant/colors";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function TabLayout() {
   const insets = useSafeAreaInsets();
   return (
      <Tabs
         screenOptions={{
            headerTitleAlign: "center",
            tabBarShowLabel: false,
            tabBarLabelStyle: { margin: 0, padding: 0 },
            headerShadowVisible: false,
            tabBarStyle: {
               paddingBottom: insets.bottom,
               height: 50 + insets.bottom,
               position: "absolute",
               elevation: 0,
               shadowOpacity: 0,
               paddingVertical: 10,
               backgroundColor: "white",
               borderLeftWidth: 1,
            },
            tabBarItemStyle: {
               paddingVertical: 5,
            },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               headerShown: false,
               tabBarIcon: ({ size, color, focused }) => (
                  <View>{focused ? <HomeSolid color={colors.primary} /> : <Home />}</View>
               ),
            }}
         />
         <Tabs.Screen
            name="search"
            options={{
               title: "Find friends",
               headerShown: false,
               tabBarIcon: ({ size, color, focused }) => (
                  // <Search color={focused ? colors.primary : colors.tabInactive} />
                  <View>{focused ? <Search2 color={Colors.primary} /> : <Search2Outline />}</View>
               ),
            }}
         />
         <Tabs.Screen
            name="(store)"
            options={{
               title: "market",
               headerShown: false,
               popToTopOnBlur: true,
               tabBarIcon: ({ size, color, focused }) => (
                  <View>{focused ? <StoreSolid color={Colors.primary} /> : <Store />}</View>
               ),
            }}
         />
         <Tabs.Screen
            name="(community)"
            options={{
               title: "comunity",
               headerShown: false,
               tabBarIcon: ({ size, color, focused }) => (
                  <View>{focused ? <Community color={Colors.primary} /> : <CommunityOtline />}</View>
               ),
            }}
         />
      </Tabs>
   );
}
