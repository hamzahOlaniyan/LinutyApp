import CommentCard from "@/components/Comments/CommentCard";
import CommentInput from "@/components/Comments/CommentInput";
import PostCard from "@/components/Post/PostCard.tsx";
import { FeedPost, PostComment, ReplyingTo } from "@/components/Post/type";
import AppText from "@/components/ui/AppText";
import EmptyFeed from "@/components/ui/EmptyFeed";
import HomeHeaderAction from "@/components/ui/HomeHeaderAction";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import { CommentApi } from "@/hooks/useCommentApi";
import { usePostComments } from "@/hooks/useCommentQuery";
import { useFeedQuery } from "@/hooks/useFeedQuery";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FeedItemProps = {
  post: FeedPost;
  onOpenComments: (postId: string) => void;
};

export default function HomeFeed() {
  const {
    postId,
    openComments: open,
    commentId
  } = useLocalSearchParams<{
    postId?: string;
    openComments?: string;
    commentId?: string;
  }>();

  const { isLoading, data: postFeed, refetch } = useFeedQuery();

  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [initialCommentId, setInitialCommentId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ReplyingTo>(null);

  const topLevelComments = comments.filter(p => p.parentCommentId == null);
  const commentCount = topLevelComments.length;

  const {
    data: commentsEnvelope,
    isLoading: commentsLoading,
    refetch: refetchComments
  } = usePostComments(selectedPostId ?? "");

  const addComment = CommentApi.addComment(selectedPostId ?? "");

  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<FlatList<FeedPost>>(null);
  const commentsListRef = useRef<BottomSheetFlatListMethods>(null);

  const END_REACHED_THRESHOLD = 0.5;

  useEffect(() => {
    if (postFeed) setPosts(postFeed?.data ?? []);
  }, [postFeed]);

  useEffect(() => {
    if (commentsEnvelope) setComments(commentsEnvelope?.data ?? []);
  }, [commentsEnvelope]);

  useEffect(() => {
    if (selectedPostId) refetchComments();
  }, [selectedPostId]);

  const scrollToPost = useCallback(
    (pid: string) => {
      const index = posts.findIndex(p => p.id === pid);
      if (index < 0) return;

      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({ index, animated: true });
      });
    },
    [posts]
  );

  const openCommentsSheet = useCallback((pid: string, cid?: string) => {
    setSelectedPostId(pid);
    setInitialCommentId(cid ?? null);
    scrollToPost(pid);
    requestAnimationFrame(() => bottomSheetRef.current?.expand());
  }, []);

  //  const openCommentsSheet = useCallback(
  //     String(postId),
  //     commentId ? String(commentId) : undefined
  //   );

  useEffect(() => {
    if (open !== "true" || !postId) return;
    router.setParams({
      openComments: undefined,
      postId: undefined,
      commentId: undefined
    });
  }, [open, postId, commentId, openCommentsSheet]);

  useEffect(() => {
    if (!initialCommentId) return;
    if (!comments.length) return;

    const idx = comments.findIndex(c => c.id === initialCommentId);
    if (idx < 0) return;

    setTimeout(() => {
      commentsListRef.current?.scrollToIndex({ index: idx, animated: true });
    }, 250);
  }, [initialCommentId, comments]);

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

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const FeedItem = React.memo(function FeedItem({
    post,
    onOpenComments
  }: FeedItemProps) {
    return (
      <PostCard post={post} onOpenComments={() => onOpenComments(post.id)} />
    );
  });

  const onOpenComments = useCallback(
    (postId: string) => {
      openCommentsSheet(postId);
    },
    [openCommentsSheet]
  );

  const renderPostItem = useCallback<ListRenderItem<FeedPost>>(
    ({ item }) => <FeedItem post={item} onOpenComments={onOpenComments} />,
    [openCommentsSheet]
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

  const header = useMemo(() => <HomeHeaderAction />, []);

  const contentStyle = useMemo(
    () => ({ backgroundColor: appColors.background }),
    [appColors.background]
  );

  return (
    <View className="flex-1">
      <View style={{ flex: 1, paddingTop: top, backgroundColor: "white" }}>
        <FlatList
          ref={listRef}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={renderPostItem}
          ListHeaderComponent={header}
          onRefresh={onRefresh}
          refreshing={isLoading}
          bounces
          scrollEnabled
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
          overScrollMode="always"
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
          onEndReachedThreshold={END_REACHED_THRESHOLD}
          ListEmptyComponent={<EmptyFeed />}
          contentContainerStyle={{
            backgroundColor: appColors.background
          }}
          ListFooterComponent={
            isLoading ? (
              <AppText className="py-4 text-center">Loading…</AppText>
            ) : null
          }
        />
      </View>
      <Portal hostName="root">
        <ModalBottomSheet
          ref={bottomSheetRef}
          title={`${commentCount} Comments`}
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
                        data={topLevelComments}
                        renderItem={renderCommentItem}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={4}
                        contentContainerStyle={contentStyle}
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
