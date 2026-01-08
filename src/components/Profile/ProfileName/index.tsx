import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import React from "react";
import { View } from "react-native";

type ProfileName = {
  name: string;
  username: string | undefined;
};

export default function ProfileName({ name, username }: ProfileName) {
  return (
    <View className="leading-1 flex-1 justify-center">
      <AppText variant="profile_name" className="flex-1 text-center capitalize">
        {name}
      </AppText>
      <AppText color={appColors.placeholder} className="text-center">
        @{username}
      </AppText>
    </View>
  );
}
