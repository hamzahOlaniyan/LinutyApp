import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View, ViewabilityConfig, ViewToken } from "react-native";
import AppText from "../ui/AppText";
import CBottomSheet from "../ui/BottomSheet";
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

   useEffect(() => {
      if (openComments) {
         setShowComments(true);
      }
   }, [openComments]);

   const fullName = `${post.author.firstName.trim()} ${post.author.lastName.trim()}`;
   const isComment = post.parent_id !== null;

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

   // const handleCloseSheet = () => bottomSheetRef.current?.close();
   // const handleOpenSheet = () => bottomSheetRef.current?.expand();
   // const snapToIndex = (idx: number) => bottomSheetRef.current?.snapToIndex(idx);

   return (
      <>
         <View style={{ backgroundColor: appColors.white }} className="overflow-hidden">
            <PostHeader
               id={post?.author?.id}
               avatar={post?.author?.avatarUrl}
               name={fullName}
               username={post?.author?.username}
               date={post?.created_at}
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
                     <AppText size="sm" color={appColors.white}>
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
                  post_id={post?.id}
                  showComment={() => {
                     if (!showMoreIcon) return null;
                     setPostID(post?.id), setShowComments(true);
                  }}
                  commentCount={count || null}
               />
            </View>
         </View>
         <CBottomSheet
            visible={showComments}
            onClose={() => setShowComments(false)}
            heading={`${count} Comments`}
            children={<Comments postAuthor={comments?.author} data={comments} loading={loading} />}
         />
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
   mediaCounterText: { color: appColors.white, fontSize: 12, fontWeight: "600" },
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
   dotActive: { backgroundColor: appColors.white },
});
