import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import React from "react";
import { ButtonProps, Pressable, StyleSheet } from "react-native";
import AppText from "../../AppText";

type Props = ButtonProps & {
  isActive?: boolean;
  activeColor?: string;
  title: string;
  onPress?: () => void;
};
export default function TabButton({
  isActive,
  activeColor,
  title,
  onPress
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        s.btn,
        {
          height: hp(4),
          backgroundColor: isActive ? activeColor : appColors.white,
          borderColor: appColors.grey,
          borderWidth: isActive ? 0 : 1
        }
      ]}
    >
      <AppText color={isActive ? appColors.white : ""}>{title}</AppText>
    </Pressable>
  );
}
const s = StyleSheet.create({
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
