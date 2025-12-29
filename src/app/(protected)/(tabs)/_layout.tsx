import CustomTabBar from "@/components/ui/TabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{ title: "home", animation: "fade" }}
      />
      <Tabs.Screen name="explore" options={{ title: "explore" }} />
      <Tabs.Screen
        name="search/index"
        options={{ headerShown: true, title: "search" }}
      />
      <Tabs.Screen name="store" />
      <Tabs.Screen name="news" options={{ title: "news", headerShown: true }} />
    </Tabs>
  );
}
