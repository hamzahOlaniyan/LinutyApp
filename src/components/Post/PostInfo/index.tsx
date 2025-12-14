import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PostCardProps } from "../type";

export default function PostInfo({ post }: PostCardProps) {
  return (
    <View style={s.container}>
      <AppText color={appColors.placeholder} className="text-right">
        {post?._count.comments && post._count.comments} likes |
      </AppText>
      <AppText color={appColors.placeholder} className="text-right">
        {post?._count.comments && post._count.comments} comments |
      </AppText>
      <AppText color={appColors.placeholder} className="text-right">
        {post?._count.comments && post._count.comments} repost |
      </AppText>
      <AppText color={appColors.placeholder} className="text-right">
        {post?._count.comments && post._count.comments} share
      </AppText>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 6
  }
});
