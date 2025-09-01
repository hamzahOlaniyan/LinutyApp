import { colors } from "@/src/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
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
                  <View>
                     {focused ? (
                        <Image
                           source={require("@/assets/icons/home-solid.svg")}
                           style={{
                              width: 24,
                              height: "100%",
                           }}
                        />
                     ) : (
                        <Image
                           source={require("@/assets/icons/home-outline.svg")}
                           style={{
                              width: 24,
                              height: "100%",
                           }}
                        />
                     )}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="search"
            options={{
               title: "Find friends",
               headerShown: false,
               tabBarIcon: ({ size, color, focused }) => (
                  <View>
                     {focused ? (
                        <Image
                           source={require("@/assets/icons/search.svg")}
                           style={{
                              width: 24,
                              height: "100%",
                           }}
                        />
                     ) : (
                        <Image
                           source={require("@/assets/icons/search-solid.svg")}
                           style={{
                              width: 24,
                              height: "100%",
                           }}
                        />
                     )}
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
