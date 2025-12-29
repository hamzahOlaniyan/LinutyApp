import CommentInput from "@/components/Comments/CommentInput";
import { PostComment, ReplyingTo } from "@/components/Post/type";
import { wp } from "@/constant/common";
import { useAddComment } from "@/hooks/usePostCommentQuery";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import CommentCard from "../CommentCard";

export default function CommentsList({
  comments,
  loading,
  postId
}: {
  comments: PostComment[];
  loading: boolean;
  postAuthorId: string;
  count: number;
  postId: string;
}) {
  const [replyTo, setReplyTo] = useState<ReplyingTo>(null);
  const addComment = useAddComment(postId);

  const onSend = useCallback(
    (content: string) => {
      // console.log({ content, parentCommentId: replyTo?.parentCommentId });

      addComment.mutate(
        {
          content,
          parentCommentId: replyTo?.parentCommentId
        },
        {
          onSuccess: async () => {
            console.log("✅ comment addes");
          },

          onError: async error =>
            console.log("❌ something when wrong", error.message)
        }
      );
      setReplyTo(null);
    },
    [addComment, replyTo]
  );

  if (loading) return <ActivityIndicator />;
  if (!comments) return null;

  const topLevel = (comments ?? []).filter(c => c.parentCommentId === null);

  return (
    <View className="h-full flex-1">
      <FlatList
        data={topLevel}
        renderItem={({ item }) => (
          <CommentCard comment={item} setReplyTo={setReplyTo} postId={postId} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        scrollEventThrottle={4}
        contentContainerStyle={{
          rowGap: 20,
          paddingHorizontal: wp(3),
          paddingBottom: 200
        }}
      />
      <CommentInput onSend={onSend} replyingTo={replyTo} />
    </View>
  );
}
