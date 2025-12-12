import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import Icon from "@/icons";
import moment from "moment";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Props } from "../type";

export default function PostHeader({ post, onOpenAuthor, onMore }: Props) {
  const avatarUri = post.author.avatarUrl?.replace("/svg?", "/png?");

  const displayName =
    `${post.author.firstName ?? ""} ${post.author.lastName ?? ""}`.trim() ||
    (post.author.username ? `@${post.author.username}` : "Unknown");

  return (
    <View
      style={{ paddingHorizontal: wp(2), paddingVertical: 2 }}
      className="flex-row items-start"
    >
      <View className="flex-1 flex-row items-end gap-2">
        <TouchableOpacity
          onPress={() => onOpenAuthor?.(post.author.id)}
          hitSlop={10}
        >
          {avatarUri ? <Avatar path={avatarUri} size={45} /> : null}
        </TouchableOpacity>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => onOpenAuthor?.(post.author.id)}
              hitSlop={10}
            >
              <AppText variant="titleLarge">{displayName}</AppText>
            </TouchableOpacity>
            <AppText variant="small" color={appColors.placeholder}>
              · {moment(post.createdAt).fromNow()}
            </AppText>
            <AppText variant="small" color={appColors.placeholder}>
              · {post.visibility}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => onOpenAuthor?.(post.author.id)}
            hitSlop={10}
          >
            <AppText color={appColors.placeholder}>
              @ {post.author.username}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      {/* MORE menu */}
      <Pressable
        onPress={() => onMore?.(post.id)}
        hitSlop={10}
        className="px-2 py-2"
      >
        <Icon name="threeDots" color={appColors.icon} />
      </Pressable>
    </View>
  );
}
