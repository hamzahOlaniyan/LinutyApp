import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { PostApi } from "@/hooks/usePostApi";
import Icon from "@/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PostInfo from "../PostInfo";
import { PostCardProps } from "../type";

export default function PostAction({
  post,
  onOpenComments,
  commentCount
}: PostCardProps) {
  const { data: REACTIONS } = PostApi.getReactions(post.id);
  const ADD_REACTION = PostApi.addReaction(post.id);
  const { data: POST } = PostApi.useGetPostById(post.id);
  const { data: myReaction } = PostApi.getMyReaction(post.id);

  const liked = !!myReaction?.liked;
  const likeCount = POST?.likeCount ?? post.likeCount;

  const router = useRouter();

  const handleLike = () => {
    ADD_REACTION.mutate({ type: "LIKE" });
  };

  return (
    <>
      <View style={s.container}>
        <PostInfo
          postId={post.id}
          reactions={REACTIONS}
          likeCount={likeCount}
          commentCount={commentCount}
        />
        <View style={s.actions}>
          <Pressable hitSlop={8} style={s.button} onPress={handleLike}>
            <AppText>{liked}</AppText>
            <Icon name={liked ? "thumbsupSolid" : "thumbsup"} size={20} />
            <AppText variant={"post_action"}>Like</AppText>
          </Pressable>

          <Pressable
            onPress={() => onOpenComments?.(post.id ?? "")}
            hitSlop={8}
            accessibilityLabel="View comments"
            style={s.button}
          >
            <Icon name="comment" size={20} />
            <AppText variant={"post_action"}>Comment</AppText>
          </Pressable>

          <Pressable hitSlop={8} accessibilityLabel="repost" style={s.button}>
            <Icon name="repost" size={20} />
            <AppText variant={"post_action"}>Repost</AppText>
          </Pressable>

          <Pressable
            onPress={() => router.push(`/(protected)/post/${post?.id}/comment`)}
            hitSlop={8}
            accessibilityLabel="share post"
            style={s.button}
          >
            <Icon name="share" size={20} />
            <AppText variant={"post_action"}>Share</AppText>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: { paddingTop: 12 },
  actions: {
    paddingHorizontal: wp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: appColors.border,
    borderTopWidth: 1
  },
  button: {
    paddingVertical: hp(1),
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    height: "100%"
  }
});
