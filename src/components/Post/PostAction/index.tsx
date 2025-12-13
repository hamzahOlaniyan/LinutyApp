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
import { FeedPost } from "../type";

type PostActionProps = {
  post: FeedPost;
  // posting: boolean;
  // newComment: string;
  // setNewComment: (value: string) => void;
  // setComments: any;
};

export default function PostAction({
  post
  // posting,
  // newComment,
  // setNewComment,
  // setComments
}: PostActionProps) {
  const { isLoading, data } = useCommentQuery(post?.id);
  const [comments, setComments] = useState(data?.data);

  // const [newComment, setNewComment] = useState("");
  // const [posting, setPosting] = useState(false);
  // const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (data) {
      setComments(data?.data);
    }
  }, [data]);

  // const [likes, setLikes] = useState<{ count: number; liked: boolean }>({
  //   count: 0,
  //   liked: false
  // });

  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  // const [likesLoading, setLikesLoading] = useState(false);

  //   const { axios } = useAxios();
  //   //   Load initial likes //
  //   useEffect(() => {
  //     let mounted = true;
  //     (async () => {
  //       try {
  //         setLikesLoading(true);
  //         const { data } = await axios.get<PostLikes>(
  //           `/v2/posts/${post_id}/likes`
  //         );
  //         if (mounted) setLikes({ count: data.count ?? 0, liked: !!data.liked });
  //       } catch {
  //         // ignore
  //       } finally {
  //         if (mounted) setLikesLoading(false);
  //       }
  //     })();
  //     return () => {
  //       mounted = false;
  //     };
  //   }, [axios, post_id]);

  //   handleLikes //
  //   const handleLike = async () => {
  //     const nextLiked = !likes.liked;
  //     setLikes(prev => ({
  //       count: prev.count + (nextLiked ? 1 : -1),
  //       liked: nextLiked
  //     }));
  //     try {
  //       if (nextLiked) {
  //         await axios.post<PostLikes>(`/v2/posts/${post_id}/likes`);
  //         Toast.show({ type: "success", text1: "Liked" });
  //       } else {
  //         await axios.delete(`/v2/posts/${post_id}/likes`);
  //         Toast.show({ type: "success", text1: "Unliked" });
  //       }
  //     } catch {
  //       setLikes(prev => ({
  //         count: prev.count + (nextLiked ? -1 : 1),
  //         liked: !nextLiked
  //       }));
  //       Toast.show({ type: "error", text1: "Failed to update like" });
  //     }
  //   };

  return (
    <>
      <View style={s.container}>
        <AppText> {post?._count.comments && post._count.comments}</AppText>

        <View style={s.actions}>
          <Pressable
            //  onPress={handleLike}
            //  onPress={() => onLike?.(post.id)}
            // accessibilityLabel={likes?.liked ? "Unlike post" : "Like post"}
            hitSlop={8}
            // disabled={likesLoading}
            style={s.button}
          >
            {/* <Icon
              name="thumbsupSolid"
              color={likes?.liked ? appColors.primary : appColors.icon}
            /> */}
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
            postId={post?.id}
            postAuthorId={post.author.id}
            comments={comments ?? []}
            loading={isLoading}
            count={post._count.comments}
          />
        }
      />
    </>
  );
}

const s = StyleSheet.create({
  container: {},
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: hp(1),
    borderTopColor: appColors.border,
    borderTopWidth: 0.2,
    backgroundColor: appColors.white
  },
  button: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "red"
  }
});
