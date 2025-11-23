import { appColors } from "@/constant/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View, ViewabilityConfig, ViewToken } from "react-native";
import AppText from "../ui/AppText";
import { CustomBottomSheet } from "../ui/CustomBottomSheet";
import Comments from "./Comments";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";

export default function Post({
   post,
   showMoreIcon = false,
   // isPostDetails = false,
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
   const [showComments, setShowComments] = useState(false);

   const [currentIndex, setCurrentIndex] = useState(0);

   const viewabilityConfig = useRef<ViewabilityConfig>({ viewAreaCoveragePercentThreshold: 60 }).current;
   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
   }).current;

   const { width: screenWidth } = Dimensions.get("screen");

   const queryClient = useQueryClient();

   const bottomSheetRef = useRef<BottomSheet>(null);
   const handleOpenSheet = () => bottomSheetRef.current?.expand();

   useEffect(() => {
      if (openComments) {
         setShowComments(true);
      }
   }, [openComments]);

   const fullName = `${post.author.firstName.trim()} ${post.author.lastName.trim()}`;

   // const isComment = post.parent_id !== null;

   // console.log(JSON.stringify(post, null, 2));

   // const deletePostMutation = useMutation({
   //    mutationFn: (postId: string) => deletePost(postId),
   //    onSuccess: () => {
   //       Alert.alert("Success", "Post deleted");
   //       queryClient.invalidateQueries({ queryKey: ["posts"] });
   //    },
   //    onError: () => {
   //       Alert.alert("Error", "Failed to delete post");
   //    },
   // });

   // const deleteCommentMutation = useMutation({
   //    mutationFn: (commentId: string) => deleteComment(commentId),
   //    onSuccess: () => {
   //       Alert.alert("Success", "Comment deleted");
   //       queryClient.invalidateQueries({ queryKey: ["posts"] });
   //    },
   //    onError: () => {
   //       Alert.alert("Error", "Failed to delete comment");
   //    },
   // });

   // const handleDelete = () => {
   //    Alert.alert(
   //       `Delete ${isComment ? "Comment" : "Post"}`,
   //       `Are you sure you want to delete this ${isComment ? "comment" : "post"}?`,
   //       [
   //          { text: "Cancel", style: "cancel" },
   //          {
   //             text: "Delete",
   //             style: "destructive",
   //             onPress: () => {
   //                if (isComment) {
   //                   deleteCommentMutation.mutate(post.id);
   //                } else {
   //                   deletePostMutation.mutate(post.id);
   //                }
   //             },
   //          },
   //       ]
   //    );
   // };

   // useEffect(() => {
   //    setPostLikes(post?.postLikes);
   // }, []);

   // const liked = postLikes?.some((like) => like?.userId === profile?.id);

   // const likeMutation = useMutation({
   //    mutationFn: async () => {
   //       return createPostLike({ userId: profile?.id, postId: post?.id });
   //    },
   //    onSuccess: async (data) => {
   //       queryClient.invalidateQueries({ queryKey: ["posts"] });
   //       queryClient.invalidateQueries({ queryKey: ["postLikes", profile?.id] });
   //       queryClient.invalidateQueries({ queryKey: ["Notification"] });

   //       if (data) {
   //          setPostLikes((prev) => {
   //             const filtered = prev.filter((like) => like.userId !== profile?.id);
   //             return [...filtered, data];
   //          });
   //          try {
   //             const res = await createNotification({
   //                senderId: profile?.id,
   //                receiverId: post.author?.id,
   //                postId: post?.id,
   //                type: "like",
   //             });
   //             setNoticeMap((prev) => ({
   //                ...prev,
   //                [post?.id]: res.id ?? res,
   //             }));
   //             console.log("👍🏾 Like Notification SENT=====>", res);
   //          } catch (error) {
   //             console.log("Notification error", error);
   //          }
   //       }

   //       console.log("LIKED ❤️", data);
   //    },
   //    onError: (error) => Alert.alert("Error", error.message),
   // });

   // const removeLikeMutation = useMutation({
   //    mutationFn: async () => {
   //       return removePostLike(post.id, profile?.id ?? "");
   //    },
   //    onSuccess: async () => {
   //       queryClient.invalidateQueries({ queryKey: ["postLikes", profile?.id] });
   //       queryClient.invalidateQueries({ queryKey: ["posts"] });
   //       queryClient.invalidateQueries({ queryKey: ["Notification"] });

   //       const idToDelete = noticeMap[post?.id];

   //       if (idToDelete) {
   //          await deleteNotification(idToDelete);
   //          setNoticeMap((prev) => {
   //             const { [post.id]: _, ...rest } = prev;
   //             return rest;
   //          });
   //       }

   //       setPostLikes((prev) => prev.filter((like) => like.userId !== profile?.id));
   //       console.log("Unliked");
   //    },
   //    onError: (error) => Alert.alert("Error", error.message),
   // });

   // const handleCloseSheet = () => bottomSheetRef.current?.close();
   // const handleOpenSheet = () => bottomSheetRef.current?.expand();
   // const snapToIndex = (idx: number) => bottomSheetRef.current?.snapToIndex(idx);

   return (
      <>
         <View style={{ backgroundColor: appColors.white }} className="overflow-hidden">
            {/* HEADER*/}
            <PostHeader
               authorId={post?.author?.id}
               avatar={post?.author?.avatarUrl}
               name={fullName}
               username={post?.author?.username}
               date={post?.created_at}
               content={post?.content}
               postId={post?.id}
            />
            {/* MEDIA*/}
            {post?.media?.length <= 1 && (
               <View className="flex-row flex-wrap">
                  {post?.media?.map((item: any, i: number) => {
                     const aspectRatio = item.width && item.height ? item.width / item.height : 4 / 5;
                     return (
                        <View key={i} style={{ width: post?.media?.length === 1 ? "100%" : "50%" }}>
                           {item.type === "video" ? (
                              <AppText size="xxxl">THIS IS S VIDEO</AppText>
                           ) : (
                              <Image
                                 key={item.url}
                                 source={{ uri: item.url }}
                                 style={{
                                    aspectRatio,
                                 }}
                                 contentPosition="center"
                                 contentFit="cover"
                              />
                           )}
                        </View>
                     );
                  })}
               </View>
            )}
            {post?.media?.length > 1 && (
               <View style={s.mediaContainer}>
                  <FlatList
                     data={post?.media}
                     keyExtractor={(item, index) => item.url || index.toString()}
                     horizontal
                     pagingEnabled
                     showsHorizontalScrollIndicator={false}
                     renderItem={({ item }) => (
                        <View>
                           {item.type === "video" ? (
                              <AppText size="xxxl">THIS IS S VIDEO</AppText>
                           ) : (
                              <Image
                                 source={{ uri: item.url }}
                                 style={{ width: screenWidth, height: screenWidth, aspectRatio: 1 / 1 }}
                                 contentPosition="center"
                              />
                           )}
                        </View>
                     )}
                     contentContainerStyle={{ backgroundColor: appColors.black }}
                     onViewableItemsChanged={onViewableItemsChanged}
                     viewabilityConfig={viewabilityConfig}
                  />
                  <View style={s.mediaCounter}>
                     <AppText size="sm" color={appColors.white}>
                        {currentIndex + 1} / {post?.media?.length}
                     </AppText>
                  </View>
                  <View style={s.dotsRow}>
                     {post?.media?.map((_: string, i: number) => (
                        <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
                     ))}
                  </View>
               </View>
            )}
            {/* ACTION*/}
            <PostAction
               post_id={post?.id}
               authorId={post.author?.id}
               showComment={() => {
                  if (!showMoreIcon) return null;
                  setPostID(post?.id), handleOpenSheet();
               }}
               commentCount={count || null}
            />
         </View>
         {/* MODAL*/}
         <Portal hostName="root">
            <CustomBottomSheet
               ref={bottomSheetRef}
               title={`${count} Comments`}
               children={<Comments postAuthor={comments?.author} data={comments} loading={loading} />}
            />
         </Portal>
      </>
   );
}

const s = StyleSheet.create({
   mediaContainer: { position: "relative" },
   mediaCounter: {
      position: "absolute",
      right: 12,
      top: 12,
      backgroundColor: "rgba(0,0,0,0.45)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
   },
   dotsRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      gap: 4,
      paddingTop: 6,
   },
   dot: { width: 6, height: 6, borderRadius: 12, backgroundColor: appColors.grey },
   dotActive: { backgroundColor: appColors.black },
});
