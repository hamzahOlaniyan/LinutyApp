import { PostComment } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { toPng } from "@/constant/common";
import Icon from "@/icons";
import moment from "moment";
import React, { memo, useMemo } from "react";
import { Pressable, View } from "react-native";

export const ReplyRow = memo(function ReplyRow({
  reply
  // postId,
  // creator
}: {
  reply: PostComment;
  postId: string | null;
  creator?: string | null;
}) {
  // const { data: creator } = PostApi.getPostCreator(postId ?? "");

  const name = useMemo(
    () => (
      <AppText
        variant={"small"}
        className="font-SemiBold capitalize"
      >{`${reply.author.firstName} ${reply.author.lastName}`}</AppText>
    ),
    [reply?.author.firstName, reply.author.lastName]
  );

  // const isCreator = reply?.author.id === creator;

  return (
    <View className="flex-1 flex-row gap-3 py-5">
      <Avatar path={toPng(reply.author.avatarUrl)} size={35} />

      <View className="flex-1 gap-3">
        <View>
          <View className="flex-1 flex-row items-center gap-2">
            {name}
            {/* {isCreator && (
              <AppText variant={"xs"} className="font-Bold text-primary">
                Creator
              </AppText>
            )} */}
          </View>
          <AppText variant={"small"} color={appColors.placeholder}>
            @{reply?.author.username}
          </AppText>
        </View>
        <AppText className="mt-1 leading-6">{reply.content}</AppText>
        <View className="flex-row justify-between">
          <AppText variant={"xs"} color={appColors.placeholder}>
            {moment(reply.created_at).fromNow()}
          </AppText>
          <Pressable className="flex-row items-center justify-center gap-2">
            <Icon name="thumbsup" size={16} color={appColors.icon} />
            <AppText color={appColors.icon}>0</AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
});
