import { appColors } from "@/constant/colors";
import { ProfileRowItem } from "@/hooks/type";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "../../ui/AppText";
import Avatar from "../../ui/Avatar";
import { FriendActionButton } from "../../ui/FriendActionButton";

export type ProfileCardProps = {
  item: ProfileRowItem;
  isFriends?: boolean;
};

export default function ProfileCard({
  item,
  isFriends = false
}: ProfileCardProps) {
  const router = useRouter();
  const name = `${item.firstName} ${item.lastName}`;

  return (
    <View className="flex-row items-center  justify-between">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => router.push(`/(protected)/profile/${item.id}`)}
        >
          <Avatar path={item.avatarUrl} size={55} />
        </TouchableOpacity>
        <View className="">
          <AppText className="font-SemiBold">{name}</AppText>
          <AppText
            variant={"small"}
            color={appColors.placeholder}
            className="font-Medium"
          >
            @{item.username}
          </AppText>
        </View>
      </View>
      <View>{!isFriends && <FriendActionButton item={item} />}</View>
    </View>
  );
}
