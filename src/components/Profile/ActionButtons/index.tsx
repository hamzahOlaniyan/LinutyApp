import AppText from "@/components/ui/AppText";
import { FriendActionButton } from "@/components/ui/FriendActionButton";
import { hp } from "@/constant/common";
import { ProfileRowItem } from "@/hooks/type";
import Icon from "@/icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function ActionButtons({
  friendshipItem
}: {
  friendshipItem: ProfileRowItem;
}) {
  return (
    <View className="my-6">
      <View className="flex-row gap-2 py-3">
        <FriendActionButton
          item={friendshipItem}
          variant={"profile"}
          style={{ flex: 1, height: hp(4.5) }}
        />
        <TouchableOpacity
          style={{ height: hp(4.5) }}
          className="items-center justify-center rounded-full bg-neutral-200 px-4"
        >
          <Icon name="mail" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: hp(4.5) }}
          className="items-center justify-center rounded-full bg-neutral-200 px-4"
        >
          <Icon name="share" size={18} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ height: hp(4.5) }}
        className="items-center justify-center rounded-full bg-neutral-200"
      >
        <AppText className="font-Medium">Visit store</AppText>
      </TouchableOpacity>
    </View>
  );
}
