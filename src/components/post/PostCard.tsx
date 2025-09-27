import { appColors } from "@/src/constant/colors";
import { createNotification, deleteNotification } from "@/src/Services/Notification";
import { useAuthStore } from "@/src/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, FlatList, StyleSheet, View, ViewabilityConfig, ViewToken } from "react-native";
import { createPostLike, deleteComment, deletePost, removePostLike } from "../../Services/posts";
import AppText from "../ui/AppText";
import BottomSheet from "../ui/BottomSheet";
import Comments from "./Comments";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostInfo from "./PostInfo";

export default function Post({
   post,
   showMoreIcon = false,
   isPostDetails = false,
   count,
   comments,
   setPostID,
   loading,
   openComments,
}: {
   post: any;
   showMoreIcon?: boolean;
   isPostDetails?: boolean;
   count?: number;
   comments: any;
   setPostID?: any;
   loading: boolean;
   openComments?: boolean;
}) {
   const { profile } = useAuthStore();

   const [postLikes, setPostLikes] = useState<any[]>([]);
   const [noticeMap, setNoticeMap] = useState<{ [postId: string]: string }>({});
   const [modalVisible, setModalVisible] = useState(false);
   const [showComments, setShowComments] = useState(false);

   const [currentIndex, setCurrentIndex] = useState(0);

   const viewabilityConfig = useRef<ViewabilityConfig>({ viewAreaCoveragePercentThreshold: 60 }).current;
   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
   }).current;

   const { width: screenWidth } = Dimensions.get("window");

   const queryClient = useQueryClient();

   useEffect(() => {
      if (openComments) {
         setShowComments(true);
      }
   }, [openComments]);

   const fullName = `${post.author.firstName.trim()} ${post.author.lastName.trim()}`;
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

   const liked = postLikes?.some((like) => like?.userId === profile?.id);

   const likeMutation = useMutation({
      mutationFn: async () => {
         return createPostLike({ userId: profile?.id, postId: post?.id });
      },
      onSuccess: async (data) => {
         queryClient.invalidateQueries({ queryKey: ["posts"] });
         queryClient.invalidateQueries({ queryKey: ["postLikes", profile?.id] });
         queryClient.invalidateQueries({ queryKey: ["Notification"] });

         if (data) {
            setPostLikes((prev) => {
               const filtered = prev.filter((like) => like.userId !== profile?.id);
               return [...filtered, data];
            });
            try {
               const res = await createNotification({
                  senderId: profile?.id,
                  receiverId: post.author?.id,
                  postId: post?.id,
                  type: "like",
               });
               setNoticeMap((prev) => ({
                  ...prev,
                  [post?.id]: res.id ?? res,
               }));
               console.log("👍🏾 Like Notification SENT=====>", res);
            } catch (error) {
               console.log("Notification error", error);
            }
         }

         console.log("LIKED ❤️", data);
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   const removeLikeMutation = useMutation({
      mutationFn: async () => {
         return removePostLike(post.id, profile?.id ?? "");
      },
      onSuccess: async () => {
         queryClient.invalidateQueries({ queryKey: ["postLikes", profile?.id] });
         queryClient.invalidateQueries({ queryKey: ["posts"] });
         queryClient.invalidateQueries({ queryKey: ["Notification"] });

         const idToDelete = noticeMap[post?.id];

         if (idToDelete) {
            await deleteNotification(idToDelete);
            setNoticeMap((prev) => {
               const { [post.id]: _, ...rest } = prev;
               return rest;
            });
         }

         setPostLikes((prev) => prev.filter((like) => like.userId !== profile?.id));
         console.log("Unliked");
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   return (
      <>
         <View style={{ backgroundColor: appColors.white }} className="overflow-hidden">
            <Link href={"/"}>home</Link>
            <PostHeader
               id={post?.author?.id}
               avatar={post?.author?.avatarUrl}
               name={fullName}
               username={post?.author?.username}
               date={post?.created_at}
               postInfo={() => setModalVisible(true)}
            />
            <View className="px-4 pb-3">
               <AppText size="lg">{post?.content}</AppText>
            </View>

            {post?.images?.length <= 1 && (
               <View className="flex-row flex-wrap">
                  {post?.images.map((pics: any, idx: number) => (
                     <View key={idx} style={{ width: post?.images.length === 1 ? "100%" : "50%" }}>
                        <Image
                           source={{ uri: pics }}
                           style={{
                              aspectRatio: 1 / 1,
                           }}
                           contentPosition="center"
                           contentFit="cover"
                        />
                     </View>
                  ))}
               </View>
            )}
            {post?.images?.length > 1 && (
               <View style={s.mediaContainer}>
                  <FlatList
                     data={post?.images}
                     keyExtractor={(index) => index.toString()}
                     horizontal
                     pagingEnabled
                     showsHorizontalScrollIndicator={false}
                     renderItem={({ item }) => (
                        <Image
                           source={{ uri: item }}
                           style={{ width: screenWidth, height: screenWidth, aspectRatio: 1 / 1 }}
                           contentPosition="center"
                           contentFit="contain"
                        />
                     )}
                     contentContainerStyle={{ backgroundColor: appColors.black }}
                     onViewableItemsChanged={onViewableItemsChanged}
                     viewabilityConfig={viewabilityConfig}
                  />
                  <View style={s.mediaCounter}>
                     <AppText size="sm" color={appColors.white} style={s.mediaCounterText}>
                        {currentIndex + 1} / {post?.images?.length}
                     </AppText>
                  </View>
                  <View style={s.dotsRow}>
                     {post?.images?.map((_: string, i: number) => (
                        <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
                     ))}
                  </View>
               </View>
            )}

            <View className="w-full flex-row items-center justify-between">
               <PostAction
                  like={() => {
                     if (liked) removeLikeMutation.mutate();
                     else likeMutation.mutate();
                  }}
                  liked={liked}
                  likes={postLikes.length || null}
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
            children={<Comments postAuthor={comments?.author} data={comments} loading={loading} />}
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

const s = StyleSheet.create({
   mediaContainer: { position: "relative" },
   // mediaImage: { width: screenWidth, height: screenWidth, backgroundColor: "#F5F5F5" },
   mediaCounter: {
      position: "absolute",
      right: 12,
      top: 12,
      backgroundColor: "rgba(0,0,0,0.45)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
   },
   mediaCounterText: { color: "#fff", fontSize: 12, fontWeight: "600" },
   dotsRow: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
   },
   dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.5)" },
   dotActive: { backgroundColor: "#FFFFFF" },
});
