import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import React from "react";
import { View } from "react-native";

const size = 28;

export const TabBarIcon = (routeName: string, isFocused?: boolean) => {
  switch (routeName) {
    case "home":
      return (
        <>
          {isFocused ? (
            <Icon name="homeSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="home" color={appColors.black} size={size} />
          )}
        </>
      );
    case "explore":
      return (
        <>
          {isFocused ? (
            <Icon name="discoverSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="discover" color={appColors.black} size={size} />
          )}
        </>
      );
    case "search":
      return (
        <View className="items-center justify-center rounded-full bg-neutral-200 p-3">
          {isFocused ? (
            <Icon name="search" color={appColors.primary} size={24} />
          ) : (
            <Icon name="search2" color={appColors.black} size={24} />
          )}
        </View>
      );
    case "store":
      return (
        <>
          {isFocused ? (
            <Icon name="storeSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="store" color={appColors.black} size={size} />
          )}
        </>
      );
    case "news":
      return (
        <>
          {isFocused ? (
            <Icon name="newsSolid" color={appColors.primary} size={size} />
          ) : (
            <Icon name="news" color={appColors.black} size={size} />
          )}
        </>
      );
    default:
      return null;
  }
};
