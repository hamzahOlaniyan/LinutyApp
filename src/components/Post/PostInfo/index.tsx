import { hp, wp } from "@/constant/common";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PostInfo() {
  return (
    <View style={s.container}>
      {/* {Number(likeCount) >= 1 ? (
        <AppText variant="post_info">{Number(likeCount)} like ·</AppText>
      ) : null}

      {commentCount && commentCount && (
        <AppText variant="post_info">{commentCount} comments</AppText>
      )} */}

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
