import AppText from "@/components/ui/AppText";
import { hp, wp } from "@/constant/common";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PostCardProps } from "../type";

export default function PostInfo({
  post,
  likeCount
  // commentCount
}: PostCardProps) {
  return (
    <View style={s.container}>
      {Number(likeCount) >= 1 ? (
        <AppText variant="post_info">{Number(likeCount)} like ·</AppText>
      ) : null}

      {post?._count?.comments >= 1 ? (
        <AppText variant="post_info">{post?._count?.comments} comments</AppText>
      ) : null}

      {/* <AppText color={appColors.placeholder} className="text-right">
        {post?._count.comments && post._count.comments} repost |
      </AppText>
      <AppText color={appColors.placeholder} className="text-right">
        {post?._count.comments && post._count.comments} share
      </AppText> */}
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 6
  }
});
