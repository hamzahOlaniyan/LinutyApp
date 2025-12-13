// import CommentInput from "@/components/PostCard/CommentInput";
// import CommentItem from "@/components/PostCard/CommentItem";
// import EmptyFeed from "@/components/PostCard/EmptyFeed";
// import AppText from "@/components/ui/AppText";
// import { appColors } from "@/constant/colors";
// import { useAddComment } from "@/hooks/useAddComment";
// import { useCommentQuery } from "@/hooks/useCommentQuery";
// import { Comment } from "@/lib/supabase/supabaseTypes";
// import { useLocalSearchParams } from "expo-router";
// import React, { useCallback, useEffect, useState } from "react";
// import { FlatList, ListRenderItem, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export type ReplyingTo = { parentCommentId: string; name: string } | null;

// export default function CommentScreen() {
//   const { postId } = useLocalSearchParams<{
//     postId: string;
//     focus?: string;
//   }>();

//   const {
//     data: commentsRes,
//     isLoading: commentsLoading,
//     refetch
//   } = useCommentQuery(postId);

//   const [comments, setComments] = useState(commentsRes);
//   const [replyingTo, setReplyingTo] = useState<ReplyingTo>(null);

//   const addComment = useAddComment(postId);

//   const isRefreshing = commentsLoading;

//   const { bottom } = useSafeAreaInsets();

//   useEffect(() => {
//     if (commentsRes) {
//       setComments(commentsRes);
//     }
//   }, [commentsRes]);

//   const onSend = useCallback(
//     (content: string) => {
//       addComment.mutate({
//         content,
//         parentId: replyingTo?.parentCommentId
//       });
//       setReplyingTo(null);
//     },
//     [addComment, replyingTo]
//   );

//   const onReply = useCallback((parent: { id: string; name: string }) => {
//     setReplyingTo({ parentCommentId: parent.id, name: parent.name });
//   }, []);

//   const renderItem: ListRenderItem<Comment> = useCallback(
//     ({ item }) => <CommentItem comment={item} onReply={onReply} />,
//     [onReply]
//   );

//   return (
//     <View
//       style={{ paddingBottom: bottom }}
//       className="flex-1 justify-center bg-yellow-500"
//     >
//       <FlatList
//         data={comments?.data ?? []}
//         keyExtractor={item => item.id}
//         onRefresh={refetch}
//         refreshing={isRefreshing}
//         bounces
//         scrollEnabled
//         showsVerticalScrollIndicator={false}
//         alwaysBounceVertical
//         overScrollMode="always"
//         removeClippedSubviews
//         initialNumToRender={6}
//         maxToRenderPerBatch={6}
//         windowSize={7}
//         ListEmptyComponent={<EmptyFeed />}
//         contentContainerStyle={{
//           backgroundColor: appColors.background
//         }}
//         ListFooterComponent={
//           commentsLoading ? (
//             <AppText className="py-4 text-center">Loading…</AppText>
//           ) : null
//         }
//         renderItem={renderItem}
//       />
//       <CommentInput
//         replyingTo={replyingTo}
//         onCancelReply={() => setReplyingTo(null)}
//         onSend={onSend}
//         isSending={addComment.isPending}
//       />
//     </View>
//   );
// }

import AppText from "@/components/ui/AppText";
import { useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";

export default function CommentScreen() {
  const { postId } = useLocalSearchParams<{
    postId: string;
    focus?: string;
  }>();

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <View>
      <AppText>{postId}</AppText>
      <TouchableOpacity onPress={onOpen}>
        <AppText>Open the modal</AppText>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>
        <AppText>......Opened</AppText>
      </Modalize>
    </View>
  );
}
