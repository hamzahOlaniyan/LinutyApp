import AppLogo from "@/components/ui/AppLogo";
import HeaderAction from "@/components/ui/HomeHeaderAction";
import CustomTabBar from "@/components/ui/TabBar";
import { hp, wp } from "@/constant/common";
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
          headerShadowVisible: false,
          headerRight: () => <HeaderAction />,
          headerLeft: () => <AppLogo />,
          headerLeftContainerStyle: { paddingLeft: wp(4) },
          headerRightContainerStyle: { paddingRight: wp(4) }
        }}
      />
      <Tabs.Screen name="explore/index" options={{ title: "explore" }} />
      <Tabs.Screen name="search/index" options={{ title: "search" }} />
      <Tabs.Screen name="store/index" options={{ title: "store" }} />
      <Tabs.Screen name="news/index" options={{ title: "news" }} />
    </Tabs>
  );
}
