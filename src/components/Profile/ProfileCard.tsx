import { appColors } from "@/constant/colors";
import { ProfileRowItem } from "@/hooks/useProfileApi";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import Avatar from "../ui/Avatar";
import { FriendActionButton } from "../ui/FriendActionButton";

export type ProfileCardProps = {
  item: ProfileRowItem;
};

export default function ProfileCard({ item }: ProfileCardProps) {
  const router = useRouter();
  const name = `${item.firstName} ${item.lastName}`;

  return (
    <View className="flex-row items-center  justify-between">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => router.push(`/(protected)/profile/${item.id}`)}
        >
          <Avatar path={item.avatarUrl} size={60} />
        </TouchableOpacity>
        <View className="">
          <AppText className="font-Medium">{name}</AppText>
          <AppText
            variant={"small"}
            color={appColors.placeholder}
            className="font-Medium"
          >
            @{item.username}
          </AppText>
        </View>
      </View>
      <View>
        <FriendActionButton item={item} />{" "}
      </View>
    </View>
  );
}
