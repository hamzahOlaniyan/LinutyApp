import { PostComment } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { displayName, toPng } from "@/constant/common";
import Icon from "@/icons";
import moment from "moment";
import React, { memo } from "react";
import { Pressable, View } from "react-native";

export const ReplyRow = memo(function ReplyRow({
  reply
}: {
  reply: PostComment;
}) {
  const name = displayName(reply.author);

  return (
    <View className="flex-row gap-3 py-5">
      <Avatar path={toPng(reply.author.avatarUrl)} size={40} />

      <View className="flex-1 gap-3">
        <View>
          <View className="flex-row items-center justify-between">{name}</View>
          <AppText variant={"small"} color={appColors.placeholder}>
            @{reply?.author.username}
          </AppText>
        </View>

        <View className="flex-row justify-between">
          <AppText className="mt-1 leading-6">{reply.content}</AppText>
          <View>
            <Pressable className="flex-row items-center justify-center gap-2">
              <Icon name="thumbsup" size={16} color={appColors.icon} />
              <AppText color={appColors.icon}>0</AppText>
            </Pressable>
          </View>
        </View>

        <AppText variant={"small"} color={appColors.placeholder}>
          {moment(reply.created_at).fromNow()}
        </AppText>
      </View>
    </View>
  );
});
