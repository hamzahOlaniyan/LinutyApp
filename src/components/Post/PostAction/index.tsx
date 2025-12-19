import CommentsList from "@/components/Comments/CommentsList";
import AppText from "@/components/ui/AppText";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { useCommentQuery } from "@/hooks/useCommentQuery";
import { PostApi } from "@/hooks/usePostApi";
import Icon from "@/icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PostInfo from "../PostInfo";
import { PostCardProps } from "../type";

export default function PostAction({ post }: PostCardProps) {
  const { isLoading, data } = useCommentQuery(post?.id);
  const reactMutation = PostApi.usePostReactionMutation(post.id);
  const { data: myReaction } = PostApi.useMyPostReactionQuery(post.id);

  const [comments, setComments] = useState(data?.data);
  const [likes, setLikes] = useState<{ count: number; liked: boolean }>({
    count: post.likeCount ?? 0,
    liked: false
  });

  useEffect(() => {
    if (data) {
      setComments(data?.data);
    }
  }, [data]);

  useEffect(() => {
    setLikes(prev => ({ ...prev, count: post.likeCount ?? 0 }));
  }, [post.likeCount]);

  useEffect(() => {
    if (!myReaction) return;
    setLikes(prev => ({ ...prev, liked: myReaction.liked }));
  }, [myReaction?.liked]);

  const handleLike = () => {
    // optimistic
    setLikes(prev => ({
      count: prev.liked ? Math.max(0, prev.count - 1) : prev.count + 1,
      liked: !prev.liked
    }));

    reactMutation.mutate(
      { type: "LIKE" },
      {
        onError: () => {
          // rollback
          setLikes(prev => ({
            count: prev.liked ? Math.max(0, prev.count - 1) : prev.count + 1,
            liked: !prev.liked
          }));
        }
      }
    );
  };

  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  return (
    <>
      <View style={s.container}>
        <PostInfo
          post={post}
          likeCount={likes?.count}
          commentCount={post._count.comments}
        />
        <View style={s.actions}>
          <Pressable hitSlop={8} style={s.button} onPress={handleLike}>
            <Icon name={likes.liked ? "thumbsupSolid" : "thumbsup"} />
            <AppText variant={"post_action"}>Like</AppText>
          </Pressable>

          <Pressable
            onPress={() => handleOpenSheet()}
            hitSlop={8}
            accessibilityLabel="View comments"
            style={s.button}
          >
            <Icon name="comment" />
            <AppText variant={"post_action"}>Comment</AppText>
          </Pressable>

          <Pressable hitSlop={8} accessibilityLabel="repost" style={s.button}>
            <Icon name="repost" />
            <AppText variant={"post_action"}>Repost</AppText>
          </Pressable>

          <Pressable
            onPress={() => router.push(`/(protected)/post/${post?.id}/comment`)}
            hitSlop={8}
            accessibilityLabel="share post"
            style={s.button}
          >
            <Icon name="share" />
            <AppText variant={"post_action"}>Share</AppText>
          </Pressable>
        </View>
      </View>

      <ModalBottomSheet
        ref={bottomSheetRef}
        title={`${post._count.comments ?? 0} Comments`}
        children={
          <CommentsList
            postAuthorId={post.author.id ?? ""}
            comments={comments ?? []}
            loading={isLoading}
            count={post._count.comments ?? null}
            postId={post.id}
          />
        }
      />
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
    borderTopWidth: 0.2
  },
  button: {
    paddingVertical: hp(1),
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    height: "100%"
  }
});
