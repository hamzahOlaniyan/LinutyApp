import { UiComment } from "@/components/Post/type";
import { Comment as DbComment } from "@/lib/supabase/supabaseTypes";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import CommentCard from "../CommentCard";

export default function CommentsList({
  // postId,
  comments,
  loading
  // postAuthorId,
  // count
}: {
  postId: string;
  comments: DbComment[];
  loading: boolean;
  postAuthorId: string;
  count: number;
}) {
  // const [showKeyboard, setShowKeyboard] = useState(false);
  // const [replyToName, setReplyToName] = useState<string | null>(null);
  // const [replyToId, setReplyToId] = useState<string | null>(null);

  if (loading) return <ActivityIndicator />;

  // const {
  //   data: commentsRes,
  //   isLoading: commentsLoading,
  //   refetch
  // } = useCommentQuery(postId);

  // const renderItem: ListRenderItem<Comment> = useCallback(
  //   ({ item }) => <CommentCard item={item} />,
  //   []
  // );

  const toUiComment = (c: DbComment): UiComment => ({
    ...c,
    created_at: c.createdAt,
    parentId: c.parentCommentId,
    author: undefined
  });

  const uiComments = React.useMemo(() => comments.map(toUiComment), [comments]);

  return (
    <View className="h-full flex-1 justify-between">
      <FlatList<UiComment>
        data={uiComments}
        renderItem={({ item }) => <CommentCard item={item} />}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={4}
        contentContainerStyle={{
          rowGap: 20
        }}
      />

      {/* <CommentInput
        postId={data?.id}
        postAuthor={postAuthor}
        // postUserID={data?.author?.id}
        showKeyboard={showKeyboard}
        replyToName={replyToName}
        parentId={replyToId}
        setReplyToName={setReplyToName}
        setReplyToId={setReplyToId}
        setShowKeyboard={setShowKeyboard}
      /> */}
    </View>
  );
}
