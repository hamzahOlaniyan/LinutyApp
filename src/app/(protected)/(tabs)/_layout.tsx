import CustomTabBar from "@/components/ui/TabBar";
import { hp } from "@/constant/common";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerStatusBarHeight: hp(5) }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "home",
          headerTitle: "",
          headerShown: false,
          headerShadowVisible: false
          // headerRight: () => <HomeHeaderAction />,
          // headerLeft: () => <AppLogo />,
          // headerLeftContainerStyle: { paddingLeft: 8 },
          // headerRightContainerStyle: { paddingRight: 8 }
        }}
      />
      <Tabs.Screen name="explore/index" options={{ title: "explore" }} />
      <Tabs.Screen name="search/index" options={{ title: "search" }} />
      <Tabs.Screen name="store/index" options={{ title: "store" }} />
      <Tabs.Screen name="news/index" options={{ title: "news" }} />
    </Tabs>
  );
}
