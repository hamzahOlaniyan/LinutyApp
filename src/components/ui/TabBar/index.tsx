import { appColors } from "@/constant/colors";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../AppText";
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
            style={styles.button}
          >
            {TabBarIcon(route.name, isFocused)}
            {label === "search" ? null : (
              <AppText variant="xs" className="font-Regular text-xs capitalize">
                {label}
              </AppText>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    borderTopColor: appColors.border,
    borderTopWidth: 0.3,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 18,
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
    paddingVertical: 6
  },
  button: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CustomTabBar;
