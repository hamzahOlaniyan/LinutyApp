import AppText from "@/components/ui/AppText";
import { hp, wp } from "@/constant/common";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { reactionsItem } from "../type";

type PostInfoType = {
  commentCount: number | undefined;
  reactions?: reactionsItem[];
  postId: string;
};
export default function PostInfo({
  commentCount,
  reactions,
  postId
}: PostInfoType) {
  const likeCount = reactions?.filter(l => l.type === "LIKE").length;

  const renderItem = useCallback(
    ({ item }: { item: reactionsItem }) => {
      return (
        <Image source={{ uri: item.profile.avatarUrl ?? "" }} style={s.image} />
      );
    },
    [postId]
  );

  return (
    <View style={s.container}>
      {reactions && (
        <TouchableOpacity
          hitSlop={10}
          onPress={() => router.push(`/(protected)/post/${postId}/reactions`)}
          className="flex-row gap-2"
        >
          <FlatList
            data={reactions.slice(0, 3)}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ gap: 6 }}
          />
          <AppText variant="post_info">{reactions?.length}</AppText>
        </TouchableOpacity>
      )}
      <View className="flex-row gap-2">
        <AppText variant="post_info">{likeCount} likes</AppText>
        <AppText>·</AppText>
        <AppText variant="post_info">{commentCount} comments</AppText>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 30,
    backgroundColor: "blue"
  }
});
