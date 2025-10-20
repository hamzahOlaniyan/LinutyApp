import { DiscoverIcon } from "@/assets/icons/DiscoverIcon";
import { DiscoverIconSolid } from "@/assets/icons/DiscoverIconSolid";
import { GroupIcon } from "@/assets/icons/groupIcon";
import { GroupIconSolid } from "@/assets/icons/groupIconSolid";
import { Home } from "@/assets/icons/home";
import { HomeSolid } from "@/assets/icons/home-solid";
import { NewsIcon } from "@/assets/icons/NewsIcon";
import { NewsIconSolid } from "@/assets/icons/NewsIconSolid";
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
            tabBarActiveTintColor: appColors.primary,
            tabBarItemStyle: {
               height: 43,
            },
            tabBarIconStyle: {
               width: "100%",
               height: "100%",
               borderRadius: 500,
            },
            tabBarStyle: {
               height: 43,
               position: "absolute",
               bottom: insets.bottom + 10,
               elevation: 3,
               borderTopWidth: 0,
               shadowOpacity: 0.7,
               backgroundColor: appColors.white,
               marginHorizontal: 15,
               borderRadius: 500,
               justifyContent: "center",
               alignContent: "center",
               flex: 1,
            },
         }}
      >
         <Tabs.Screen
            name="index"
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
                        borderRadius: 500,
                     }}
                  >
                     {focused ? <HomeSolid size={22} color={appColors.white} /> : <Home size={22} />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="(explore)"
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
                        borderRadius: 500,
                     }}
                  >
                     {focused ? <DiscoverIconSolid size={22} color={appColors.white} /> : <DiscoverIcon size={22} />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="(friends)"
            options={{
               title: "comunity",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        backgroundColor: focused ? appColors.primary : "",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: 500,
                     }}
                  >
                     {focused ? <GroupIconSolid size={22} color={appColors.white} /> : <GroupIcon size={22} />}
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
                  <View
                     style={{
                        backgroundColor: focused ? appColors.primary : "",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: 500,
                     }}
                  >
                     {focused ? <StoreSolid size={22} color={appColors.white} /> : <Store size={22} />}
                  </View>
               ),
            }}
         />
         <Tabs.Screen
            name="(news)"
            options={{
               title: "comunity",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        backgroundColor: focused ? appColors.primary : "",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: 500,
                     }}
                  >
                     {focused ? <NewsIconSolid size={22} color={appColors.white} /> : <NewsIcon size={22} />}
                  </View>
               ),
            }}
         />
      </Tabs>
   );
}
