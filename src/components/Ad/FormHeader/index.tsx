import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppText from "../../ui/AppText";

type FormHeaderProps = {
  avatarUrl: string;
  firstName: string;
  lastName: string;
};

export default function FormHeader({
  avatarUrl,
  firstName,
  lastName
}: FormHeaderProps) {
  return (
    <View className="my-4 w-full flex-1 flex-row items-center gap-3">
      <Avatar path={avatarUrl} size={45} />
      <View className="w-full">
        <View className="flex-row gap-1">
          <AppText>{firstName}</AppText>
          <AppText>{lastName}</AppText>
        </View>
        <View className="flex-row items-center gap-3">
          <AppText color={appColors.secondary}>Listing in Store</AppText>
          <Ionicons
            name={"storefront-sharp"}
            size={14}
            color={appColors.secondary}
          />
        </View>
      </View>
    </View>
  );
}
