import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import React from "react";
import { View } from "react-native";

const size = 24;

export const TabBarIcon = (routeName: string, isFocused?: boolean) => {
  if (routeName.includes("(home)")) routeName = "home";
  else if (routeName.startsWith("explore")) routeName = "explore";
  else if (routeName.startsWith("search")) routeName = "search";
  else if (routeName.startsWith("store")) routeName = "store";
  else if (routeName.startsWith("news")) routeName = "news";

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
        <View className="items-center justify-center rounded-full bg-neutral-200 p-2">
          <Icon
            name="lineage"
            color={isFocused ? appColors.primary : appColors.text}
            size={24}
          />
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
