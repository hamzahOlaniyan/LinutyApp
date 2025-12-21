import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import React from "react";
import { View } from "react-native";

const size = 24;

export const TabBarIcon = (routeName: string, isFocused?: boolean) => {
  switch (routeName) {
    case "home":
      return (
        <>
          {isFocused ? (
            <Icon name="homeSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="home" color={appColors.text} size={size} />
          )}
        </>
      );
    case "explore":
      return (
        <>
          {isFocused ? (
            <Icon name="discoverSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="discover" color={appColors.text} size={size} />
          )}
        </>
      );
    case "search":
      return (
        <View className="items-center justify-center rounded-full bg-neutral-100 p-2">
          <Icon name="lineage" color={appColors.primary} size={24} />
        </View>
      );
    case "store":
      return (
        <>
          {isFocused ? (
            <Icon name="storeSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="store" color={appColors.text} size={size} />
          )}
        </>
      );
    case "news":
      return (
        <>
          {isFocused ? (
            <Icon name="newsSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="news" color={appColors.text} size={size} />
          )}
        </>
      );
    default:
      return null;
  }
};
