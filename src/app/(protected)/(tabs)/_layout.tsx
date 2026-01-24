import { appColors } from "@/constant/colors";
import Icon, { IconName } from "@/icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  const TabbarIcon = ({
    focused,
    icon,
    focusedIcon
  }: {
    icon: IconName;
    focusedIcon: IconName;
    focused: boolean;
  }) => {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          borderRadius: 5
        }}
      >
        {focused ? (
          <Icon name={focusedIcon} color={appColors.primary} size={24} />
        ) : (
          <Icon name={icon} color={appColors.text} size={24} />
        )}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarActiveTintColor: appColors.primary,
        // tabBarInactiveTintColor: appColors.text,
        // tabBarLabelStyle: {
        //   textTransform: "capitalize",
        //   fontFamily: Font.SemiBold
        // },
        tabBarStyle: {
          paddingTop: 5
        }
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "home",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon="home" focusedIcon="homeSolid" />
          )
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              icon="lineage"
              focusedIcon="lineageSolid"
            />
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              icon="friendsIcon"
              focusedIcon="friendsIconSolid"
            />
          )
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "store",
          popToTopOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              icon="store"
              focusedIcon="storeSolid"
            />
          )
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "news",
          tabBarIcon: ({ focused }) => (
            <TabbarIcon focused={focused} icon="news" focusedIcon="newsSolid" />
          )
        }}
      />
      {/* <Tabs.Screen
        name="(home)/index"
        options={{ title: "home", animation: "fade" }}
      />
      <Tabs.Screen name="explore" options={{ title: "explore" }} />
      <Tabs.Screen
        name="search/index"
        options={{ headerShown: true, title: "search" }}
      />
      <Tabs.Screen name="store" />
      <Tabs.Screen name="news" options={{ title: "news", headerShown: true }} /> */}
    </Tabs>
  );
}
