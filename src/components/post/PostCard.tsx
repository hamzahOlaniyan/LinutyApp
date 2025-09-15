// import { colors } from "@/src/constant/colors";
// import { useAuthStore } from "@/src/context/authStore";
// import { useThemeStore } from "@/src/context/themeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
// import { hp, wp } from "../../common";
import { createPostLike, deleteComment, deletePost, removePostLike } from "../../Services/posts";
// import { PostLike, PostWithUser } from "../../types/types";
// import SupabaseImage from "../SupabaseImage";
import { appColors } from "@/src/constant/colors";
import { useAuthStore } from "@/src/store/authStore";
import { Image } from "expo-image";
import AppText from "../ui/AppText";
import BottomSheet from "../ui/BottomSheet";
import Comments from "./Comments";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostInfo from "./PostInfo";

// import PostInfo from "./PostInfo";

export default function Post({
   post,
   showMoreIcon = false,
   isPostDetails = false,
   count,
   comments,
   setPostID,
   loading,
}: {
   post: any;
   showMoreIcon?: boolean;
   isPostDetails?: boolean;
   count?: number;
   comments: any;
   setPostID?: any;
   loading: boolean;
}) {
   const { profile } = useAuthStore();
   // const { currentTheme } = useThemeStore();

   const [likes, setPostLikes] = useState<any[]>([]);
   const [modalVisible, setModalVisible] = useState(false);

   const [showComments, setShowComments] = useState(false);

   const queryClient = useQueryClient();

   const router = useRouter();

   const fullName = post.author.firstName + post.author.lastName;
   const isComment = post.parent_id !== null;
   const isUserOwner = profile?.id === post?.author?.id;

   const deletePostMutation = useMutation({
      mutationFn: (postId: string) => deletePost(postId),
      onSuccess: () => {
         Alert.alert("Success", "Post deleted");
         queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: () => {
         Alert.alert("Error", "Failed to delete post");
      },
   });

   const deleteCommentMutation = useMutation({
      mutationFn: (commentId: string) => deleteComment(commentId),
      onSuccess: () => {
         Alert.alert("Success", "Comment deleted");
         queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: () => {
         Alert.alert("Error", "Failed to delete comment");
      },
   });

   const handleDelete = () => {
      Alert.alert(
         `Delete ${isComment ? "Comment" : "Post"}`,
         `Are you sure you want to delete this ${isComment ? "comment" : "post"}?`,
         [
            { text: "Cancel", style: "cancel" },
            {
               text: "Delete",
               style: "destructive",
               onPress: () => {
                  if (isComment) {
                     deleteCommentMutation.mutate(post.id);
                  } else {
                     deletePostMutation.mutate(post.id);
                  }
               },
            },
         ]
      );
   };

   useEffect(() => {
      setPostLikes(post?.postLikes);
   }, []);

   const liked = likes?.filter((like) => like?.userId === profile?.id)[0] ? true : false;

   const likeMutation = useMutation({
      mutationFn: async () => {
         return createPostLike({ userId: post?.author?.id, postId: post?.id });
      },
      onSuccess: (data) => {
         if (data) {
            setPostLikes([...likes, data]);
         }
         console.log("LIKED ❤️", data);
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   const removeLikeMutation = useMutation({
      mutationFn: async () => {
         return removePostLike(post.id, profile?.id ?? "");
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["posts"] });
         setPostLikes((prev) => prev.filter((like) => like.userId !== profile?.id));
         console.log("Unliked");
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   return (
      <>
         <View style={{ backgroundColor: appColors.white }} className="overflow-hidden">
            <PostHeader
               id={post?.author.id}
               avatar={post?.author.avatarUrl}
               name={fullName}
               username={post?.author.username}
               date={post?.created_at}
               postInfo={() => setModalVisible(true)}
            />
            <View className="px-4 pb-3">
               <AppText size="lg">{post?.content}</AppText>
            </View>

            {post?.images?.length > 0 && (
               <View className="flex-row flex-wrap">
                  {post?.images.map((pics: any, idx: number) => (
                     <View key={idx} style={{ width: post?.images.length === 1 ? "100%" : "50%" }}>
                        <Image
                           source={pics}
                           style={{
                              height: 250,
                           }}
                        />
                     </View>
                  ))}
               </View>
            )}

            <View className="w-full flex-row items-center justify-between">
               <PostAction
                  like={() => {
                     if (liked) removeLikeMutation.mutate();
                     else likeMutation.mutate();
                  }}
                  liked={liked}
                  likes={likes.length || null}
                  showComment={() => {
                     if (!showMoreIcon) return null;
                     setPostID(post?.id), setShowComments(true);
                  }}
                  commentCount={count || null}
               />
            </View>
         </View>
         <BottomSheet
            isOpen={showComments}
            onClose={() => setShowComments(false)}
            heading={`${count} Comments`}
            children={<Comments data={comments} loading={loading} />}
         />
         <BottomSheet
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            heading={`Info`}
            height={30}
            children={
               <PostInfo
                  isVisible={modalVisible}
                  isUserOwner={isUserOwner}
                  handleDelete={handleDelete}
                  onClose={() => setModalVisible(false)}
               />
            }
         />
      </>
   );
}

const styles = StyleSheet.create({
   background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 300,
   },
});
