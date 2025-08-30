import { colors } from "@/src/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
               // borderTopColor: currentTheme === "light" ? colors.light.text_gray : colors.dark.text_gray,
               borderLeftWidth: 1,
               // backgroundColor: currentTheme === "light" ? colors.light.background : colors.dark.background,
               // backgroundColor: "rgba(255,255,255,.4)",
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
                  <Ionicons
                     name={focused ? "home-sharp" : "home-outline"}
                     size={24}
                     color={focused ? colors.primary : ""}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="search"
            options={{
               title: "Find friends",
               headerShown: false,
               tabBarIcon: ({ size, color, focused }) => (
                  <Ionicons
                     name={focused ? "people-sharp" : "people-outline"}
                     size={24}
                     color={focused ? colors.primary : ""}
                  />
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
                  <Ionicons
                     name={focused ? "storefront-sharp" : "storefront-outline"}
                     size={24}
                     color={focused ? colors.primary : ""}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="(community)"
            options={{
               title: "comunity",
               headerShown: false,
               tabBarIcon: ({ size, color, focused }) => (
                  <Ionicons
                     name={focused ? "globe" : "globe-outline"}
                     size={24}
                     color={focused ? colors.primary : ""}
                  />
               ),
            }}
         />
      </Tabs>
   );
}
