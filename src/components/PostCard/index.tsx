import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import PostHeader from "./PostHeader";
import { Props } from "./type";

const PostCard = memo(function PostCard({
  post,
  onOpenPost,
  onOpenAuthor,
  onOpenMedia,
  onLike,
  onOpenComments,
  onMore
}: Props) {
  const { width: screenWidth } = Dimensions.get("window");
  const media = post.mediaFiles ?? [];
  const firstImage = media.find(m => m.type === "IMAGE")?.url;

  return (
    <View style={s.container}>
      {/* HEADER: author tap */}
      <PostHeader post={post} onOpenAuthor={onOpenAuthor} onMore={onMore} />

      {/* BODY: open post */}
      <Pressable onPress={() => onOpenPost?.(post.id)} style={s.content}>
        {post.content ? (
          <AppText className="leading-6">{post.content}</AppText>
        ) : null}
      </Pressable>

      {/* MEDIA: open media viewer */}
      {firstImage ? (
        <Pressable
          onPress={() => onOpenMedia?.(post.id, 0)}
          className="mt-3 overflow-hidden"
        >
          <Image
            source={{ uri: firstImage }}
            style={{ width: screenWidth, height: screenWidth }}
            contentFit="contain"
          />
        </Pressable>
      ) : null}

      {/* ACTIONS */}
      <View className="mt-4 flex-row items-center justify-between">
        <Pressable
          onPress={() => onLike?.(post.id)}
          className="bg-muted rounded-xl px-3 py-2"
        >
          <AppText>👍 {post._count?.reactions ?? post.likeCount ?? 0}</AppText>
        </Pressable>

        <Pressable
          onPress={() => onOpenComments?.(post.id)}
          className="bg-muted rounded-xl px-3 py-2"
        >
          <AppText>
            💬 {post._count?.comments ?? post.commentCount ?? 0}
          </AppText>
        </Pressable>

        <Pressable
          onPress={() => onOpenPost?.(post.id)}
          className="bg-muted rounded-xl px-3 py-2"
        >
          <AppText>↗️ Share</AppText>
        </Pressable>
      </View>
    </View>
  );
});

export default PostCard;

const s = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    paddingVertical: 10,
    marginBottom: 10
  },
  content: {
    paddingHorizontal: wp(3),
    marginTop: 12
  }
});
