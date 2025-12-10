import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
// import { BlurView } from "expo-blur";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarIcon } from "./TabBarIcons";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const label = descriptors[route.key].options.title ?? route.name;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.9}
            style={[
              styles.button,
              {
                borderTopColor: isFocused ? appColors.primary : appColors.white,
                borderTopWidth: 5
              }
            ]}
          >
            {TabBarIcon(label, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
    height: hp(6)
  },
  button: {
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CustomTabBar;
