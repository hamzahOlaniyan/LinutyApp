import CustomTabBar from "@/components/ui/TabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="(home)/index" options={{ title: "home" }} />
      <Tabs.Screen name="explore/index" options={{ title: "explore" }} />
      <Tabs.Screen name="search/index" options={{ title: "search" }} />
      <Tabs.Screen name="store/index" options={{ title: "store" }} />
      <Tabs.Screen name="news/index" options={{ title: "news" }} />
    </Tabs>
  );
}
