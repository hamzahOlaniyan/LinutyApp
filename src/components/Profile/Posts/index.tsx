import CommentCard from "@/components/Comments/CommentCard";
import CommentInput from "@/components/Comments/CommentInput";
import PostCard from "@/components/Post/PostCard.tsx";
import { FeedPost, PostComment, ReplyingTo } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { CommentApi } from "@/hooks/useCommentApi";
import { usePostComments } from "@/hooks/useCommentQuery";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PostResponse } from "../../../../types/supabaseTypes";

type ProfilePostsProps = {
  item: PostResponse[] | undefined;
};

export default function ProfilePosts({ item }: ProfilePostsProps) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  // const [initialCommentId, setInitialCommentId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ReplyingTo>(null);

  const { data: commentsEnvelope, isLoading: commentsLoading } =
    usePostComments(selectedPostId ?? "");
  const addComment = CommentApi.addComment(selectedPostId ?? "");

  useEffect(() => {
    if (commentsEnvelope) setComments(commentsEnvelope?.data ?? []);
  }, [commentsEnvelope]);

  const { bottom } = useSafeAreaInsets();

  const topLevelComments = comments.filter(p => p.parentCommentId == null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const commentsListRef = useRef<BottomSheetFlatListMethods>(null);

  const openCommentsSheet = useCallback((pid: string) => {
    setSelectedPostId(pid);
    // setInitialCommentId(cid ?? null);
    requestAnimationFrame(() => bottomSheetRef.current?.expand());
  }, []);

  const onSend = useCallback(
    (content: string) => {
      addComment.mutate(
        {
          content,
          parentCommentId: replyTo?.parentCommentId
        },
        {
          onSuccess: async () => {
            console.log("✅ comment added");
          },

          onError: async error =>
            console.log("❌ something when wrong", error.message)
        }
      );
      setReplyTo(null);
    },
    [addComment, replyTo]
  );

  const onCancel = () => {
    setReplyTo(null);
  };

  const renderPostItem: ListRenderItem<FeedPost> = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        onOpenComments={openCommentsSheet}
        commentCount={topLevelComments.length}
      />
    ),
    []
  );

  const renderCommentItem = useCallback(
    ({ item }: { item: PostComment }) => (
      <CommentCard
        comment={item}
        setReplyTo={setReplyTo}
        postId={selectedPostId}
      />
    ),
    [selectedPostId]
  );

  return (
    <View
      style={{ backgroundColor: appColors.background, paddingTop: 0, flex: 1 }}
    >
      {item && item.length === 0 ? (
        <View className="p-4">
          <AppText>You have no posts</AppText>
        </View>
      ) : (
        <FlatList
          data={item}
          keyExtractor={item => item.id}
          renderItem={renderPostItem}
          bounces
          scrollEnabled
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
          overScrollMode="always"
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
          contentContainerStyle={{
            backgroundColor: appColors.background
          }}
        />
      )}
      <Portal hostName="root">
        <ModalBottomSheet
          ref={bottomSheetRef}
          title={`${topLevelComments.length} Comments`}
          children={
            <View style={{ marginBottom: bottom, flex: 1 }}>
              <ScreenView>
                {comments?.length === 0 ? (
                  <AppText variant={"title"}>be the first to comment</AppText>
                ) : (
                  <>
                    {commentsLoading ? (
                      <ActivityIndicator size={"small"} />
                    ) : (
                      <BottomSheetFlatList
                        ref={commentsListRef}
                        data={comments.filter(p => p.parentCommentId == null)}
                        renderItem={renderCommentItem}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={4}
                        contentContainerStyle={s.contentContainer}
                      />
                    )}
                  </>
                )}
              </ScreenView>
              <CommentInput
                onSend={onSend}
                replyingTo={replyTo}
                onCancelReply={onCancel}
                loading={addComment.isLoading}
              />
            </View>
          }
        />
      </Portal>
    </View>
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
  },
  contentContainer: {
    paddingBottom: 50,
    gap: 20
  }
});
