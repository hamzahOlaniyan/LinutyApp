import CommentsList from "@/components/Comments/CommentsList";
import AppText from "@/components/ui/AppText";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { useCommentQuery } from "@/hooks/useCommentQuery";
import Icon from "@/icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PostInfo from "../PostInfo";
import { PostCardProps } from "../type";

export default function PostAction({ post }: PostCardProps) {
  const { isLoading, data } = useCommentQuery(post?.id);
  const [comments, setComments] = useState(data?.data);

  useEffect(() => {
    if (data) {
      setComments(data?.data);
    }
  }, [data]);

  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  return (
    <>
      <View style={s.container}>
        <PostInfo post={post} />
        <View style={s.actions}>
          <Pressable hitSlop={8} style={s.button}>
            <Icon name="thumbsup" />
            <AppText color={appColors.secondary}>Like</AppText>
          </Pressable>

          <Pressable
            onPress={() => handleOpenSheet()}
            hitSlop={8}
            accessibilityLabel="View comments"
            style={s.button}
          >
            <Icon name="comment" />
            <AppText color={appColors.secondary}>Comment</AppText>
          </Pressable>

          <Pressable hitSlop={8} accessibilityLabel="repost" style={s.button}>
            <Icon name="repost" />
            <AppText color={appColors.secondary}>Repost</AppText>
          </Pressable>

          <Pressable
            onPress={() => router.push(`/(protected)/post/${post?.id}/comment`)}
            hitSlop={8}
            accessibilityLabel="share post"
            style={s.button}
          >
            <Icon name="share" />
            <AppText color={appColors.secondary}>Share</AppText>
          </Pressable>
        </View>
      </View>

      <ModalBottomSheet
        ref={bottomSheetRef}
        title={`${post._count.comments} Comments`}
        children={
          <CommentsList
            postAuthorId={post.author.id}
            comments={comments ?? []}
            loading={isLoading}
            count={post._count.comments}
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
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around",
    paddingVertical: hp(1),
    borderTopColor: appColors.border,
    borderTopWidth: 0.2
  },
  button: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center"
  }
});
