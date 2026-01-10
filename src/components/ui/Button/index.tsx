import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";

import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

type ButtonProps = {
  text?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "primary" | "outline" | "plain" | "secondary";
  indicatorColor?: ColorValue;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
};

export default function Button({
  text,
  onPress,
  isLoading = false,
  className,
  disabled,
  size = "md",
  variant,
  indicatorColor,
  icon,
  style,
  color
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`${className}`}
      style={[
        style,
        {
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal:
            size === "lg"
              ? 20
              : size === "md"
                ? 18
                : size === "sm"
                  ? 16
                  : size === "xs"
                    ? 14
                    : hp(5),
          borderWidth: variant === "outline" ? 0.8 : 0,
          backgroundColor:
            variant === "primary"
              ? appColors.primary
              : variant === "secondary"
                ? appColors.dark_whitesmoke
                : variant === "outline" || variant === "plain"
                  ? "transparent"
                  : appColors.primary,
          height:
            size === "lg"
              ? hp(6.5)
              : size === "md"
                ? hp(6)
                : size === "sm"
                  ? hp(4.5)
                  : size === "xs"
                    ? hp(3.7)
                    : hp(5)
        }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} size={"small"} />
      ) : (
        <View className="flex-row items-center justify-center gap-1">
          {icon && icon}
          {text && (
            <Text
              style={{
                fontSize:
                  size === "lg"
                    ? hp(2)
                    : size === "sm"
                      ? hp(1.8)
                      : size === "xs"
                        ? hp(1.6)
                        : hp(1.8),
                textAlign: "center",
                fontFamily: Font.Medium,
                color: disabled ? appColors.grey : color
              }}
            >
              {text}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
