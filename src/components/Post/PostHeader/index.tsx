import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import Icon from "@/icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Author, PostVisibility } from "../type";

export type PostHeaderProps = {
  author: Author;
  createdAt: string;
  visibility: PostVisibility;
};

export default function PostHeader({
  author,
  createdAt,
  visibility
}: PostHeaderProps) {
  const router = useRouter();

  const avatarUri = author.avatarUrl?.replace("/svg?", "/png?");

  const displayName =
    `${author.firstName ?? ""} ${author.lastName ?? ""}`.trim() ||
    (author.username ? `@${author.username}` : "Unknown");

  return (
    <View
      style={{ paddingHorizontal: wp(2), paddingVertical: 2 }}
      className="flex-row items-start"
    >
      <View className="flex-1 flex-row items-end gap-2">
        <TouchableOpacity
          onPress={() => router.push(`/(protected)/profile/${author.id}`)}
          hitSlop={10}
        >
          {avatarUri ? <Avatar path={avatarUri} size={45} /> : null}
        </TouchableOpacity>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => router.push(`/(protected)/profile/${author.id}`)}
              hitSlop={10}
            >
              <AppText variant="titleLarge">{displayName}</AppText>
            </TouchableOpacity>
            <AppText variant="small" color={appColors.placeholder}>
              · {moment(createdAt).fromNow()}
            </AppText>
            <AppText variant="small" color={appColors.placeholder}>
              · {visibility}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => router.push(`/(protected)/profile/${author.id}`)}
            hitSlop={10}
          >
            <AppText color={appColors.placeholder}>@ {author.username}</AppText>
          </TouchableOpacity>
        </View>
      </View>
      {/* MORE menu */}
      <Pressable
        // onPress={() => onMore?.(post.id)}
        hitSlop={10}
        className="px-2 py-2"
      >
        <Icon name="threeDots" color={appColors.icon} />
      </Pressable>
    </View>
  );
}
