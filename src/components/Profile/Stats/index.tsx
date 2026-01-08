import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type Stats = {
  friendCount: number | null | undefined;
  profileId?: string;
};

export default function Stats({ friendCount, profileId }: Stats) {
  const router = useRouter();
  // const count = FriendsApi.getFriendCount(profileId);

  return (
    <View className="my-4 w-full flex-row items-center justify-center gap-6">
      <View className="items-center justify-center px-6">
        <AppText variant={"title"}>213</AppText>
        <AppText variant={"small"} color={appColors.placeholder}>
          Posts
        </AppText>
      </View>
      <View className="h-full w-[1px] bg-neutral-300" />
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/(protected)/profile/friends`,
            params: { profileId: profileId }
          })
        }
        className="items-center justify-center px-6"
      >
        <AppText variant={"title"}>{friendCount}</AppText>
        <AppText variant={"small"} color={appColors.placeholder}>
          Friends
        </AppText>
      </TouchableOpacity>
      <View className="h-full w-[1px] bg-neutral-300 " />
      <View className="items-center justify-center px-6">
        <AppText variant={"title"}>231</AppText>
        <AppText variant={"small"} color={appColors.placeholder}>
          Friends
        </AppText>
      </View>
    </View>
  );
}
