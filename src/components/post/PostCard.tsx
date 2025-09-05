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
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";

// import PostInfo from "./PostInfo";

export default function Post({
   post,
   showMoreIcon = false,
   isPostDetails = false,
   count,
   setShowComments,
   setPostID,
}: {
   post: any;
   showMoreIcon?: boolean;
   isPostDetails?: boolean;
   count?: number;
   setShowComments?: any;
   showComments?: boolean;
   setPostID?: any;
}) {
   const { profile } = useAuthStore();
   // const { currentTheme } = useThemeStore();

   const [likes, setPostLikes] = useState<any[]>([]);
   const [modalVisible, setModalVisible] = useState(false);

   const queryClient = useQueryClient();

   const router = useRouter();

   const fullName = post.author.firstName + post.author.lastName;
   const isComment = post.parent_id !== null;
   const isUserOwner = profile?.id === post.user_id;

   // console.log("post", JSON.stringify(post, null, 2));

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
         let data = {
            userId: post.user_id,
            postId: post?.id,
         };
         return createPostLike(data);
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
         <View style={{ backgroundColor: appColors.white }} className="rounded-2xl overflow-hidden">
            <PostHeader
               avatar={post.author.avatarUrl}
               name={fullName}
               username={post.author.username}
               date={post.created_at}
               postInfo={() => setModalVisible(true)}
            />
            <View className="px-4 py-1">
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
               />
               {/* ACTIONS */}
               {/* <View className="flex-row justify-between">
                  <View className="flex-row flex-1 items-center gap-3">
                     <Pressable
                        className="flex-row justify-center items-center gap-2"
                        // onPress={() => {
                        //    if (liked) removeLikeMutation.mutate();
                        //    else likeMutation.mutate();
                        // }}
                     >
                        {post.images.length > 0 ? (
                           <Feather name="thumbs-up" size={20} />
                        ) : (
                           <Feather
                              name="thumbs-up"
                              size={20}
                              // color={`${
                              //    liked ? "red" : currentTheme === "light" ? colors.light.text : colors.dark.text
                              // }`}
                           />
                        )}

                        <AppText weight="semi" size="lg">
                           {likes?.length || null}
                        </AppText>
                     </Pressable>
                     <Pressable
                        onPress={() => {
                           if (!showMoreIcon) return null;
                           setPostID(post?.id), setShowComments(true);
                        }}
                        className="flex-row items-center relative top-[3px] gap-2"
                     >
                        {post.images.length > 0 && <FontAwesome6 name="comment-alt" size={17} color={appColors.text} />}
                        <AppText
                           weight="semi"
                           size="lg"
                           // textColor={post.images.length > 0 ? "white" : "#262626"}
                           className="relative -top-[2.5px]"
                        >
                           {count || null}
                        </AppText>
                     </Pressable>
                  </View>
               </View> */}
            </View>
         </View>
         {/* <PostInfo
            isVisible={modalVisible}
            isUserOwner={isUserOwner}
            handleDelete={handleDelete}
            onClose={() => setModalVisible(false)}
         /> */}
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
