import { appColors } from "@/constant/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View, ViewabilityConfig, ViewToken } from "react-native";
import AppText from "../ui/AppText";
import { CustomBottomSheet } from "../ui/CustomBottomSheet";
import Comments from "./Comments";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";

const { width: screenWidth } = Dimensions.get("screen");
export default function Post({
   post,
   showMoreIcon = false,
   visibleVideoPostId,
   visibleIndex,
   // isPostDetails = false,
   count,
   comments,
   setPostID,
   loading,
   openComments,
}: {
   post: any;
   showMoreIcon?: boolean;
   visibleVideoPostId?: string | null;
   visibleIndex?: number;
   isPostDetails?: boolean;
   count?: number;
   comments: any;
   setPostID?: any;
   loading: boolean;
   openComments?: boolean;
}) {
   const [showComments, setShowComments] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [onVideoClick, setVideoClick] = useState(false);

   const videoRef = useRef<VideoRef>(null);

   useEffect(() => {
      // if (!videoMedia || !videoRef.current) return;

      if (visibleVideoPostId === post.id) {
         videoRef.current?.seek(0);
         // Post is now visible: start/restart video
         // videoRef.current.seek(0);
      } else {
         null;
         // Post left view: reset video
         // videoRef.current.seek(0);
      }
   }, [visibleIndex, post.id]);

   const viewabilityConfig = useRef<ViewabilityConfig>({ viewAreaCoveragePercentThreshold: 60 }).current;
   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
   }).current;

   const bottomSheetRef = useRef<BottomSheet>(null);
   const handleOpenSheet = () => bottomSheetRef.current?.expand();

   useEffect(() => {
      if (openComments) {
         setShowComments(true);
      }
   }, [openComments]);

   const fullName = `${post.author.firstName.trim()} ${post.author.lastName.trim()}`;

   return (
      <>
         <View style={{ backgroundColor: appColors.white }} className="overflow-hidden">
            {/* HEADER*/}
            <PostHeader
               authorId={post?.author?.id}
               postId={post?.id}
               avatar={post?.author?.avatarUrl}
               name={fullName}
               username={post?.author?.username}
               date={post?.created_at}
               content={post?.content}
            />
            {/* MEDIA*/}
            {post?.media?.length <= 1 && (
               <View className="flex-row flex-wrap">
                  {post?.media?.map((item: any, i: number) => {
                     const aspectRatio = item.width && item.height ? item.width / item.height : 4 / 5;
                     return (
                        <View key={i} style={{ width: post?.media?.length === 1 ? "100%" : "50%" }}>
                           {item.type === "video" ? (
                              <View>
                                 <TouchableOpacity onPress={() => console.log("clicked")}>
                                    <AppText>THIS IS A VIDEO</AppText>
                                    {/* <Video
                                       ref={videoRef}
                                       source={{ uri: item?.url }}
                                       style={{
                                          width: screenWidth,
                                          aspectRatio: 1,
                                       }}
                                       paused={visibleIndex !== post?.id}
                                       resizeMode="cover"
                                    /> */}
                                 </TouchableOpacity>
                                 {/* {onVideoClick && (
                                    <TouchableOpacity
                                       style={{
                                          width: "100%",
                                          height: "100%",
                                          position: "absolute",
                                          backgroundColor: "rgba(0,0,0,.8)",
                                          zIndex: 99,
                                       }}
                                    >
                                       <AppText>color</AppText>
                                    </TouchableOpacity>
                                 )} */}
                              </View>
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
                              <TouchableOpacity onPress={() => console.log("clicked")}>
                                 <AppText>THIS IS A VIDEO</AppText>
                                 {/* <Video
                                    ref={videoRef}
                                    source={{ uri: item?.url }}
                                    style={{
                                       width: screenWidth,
                                       aspectRatio: 1,
                                    }}
                                    paused={visibleIndex !== post?.id}
                                    resizeMode="cover"
                                    muted
                                 /> */}
                              </TouchableOpacity>
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
                     <AppText size="xs" color={appColors.white}>
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
      paddingTop: 12,
   },
   dot: { width: 5, height: 5, borderRadius: 12, backgroundColor: appColors.grey },
   dotActive: { width: 6, height: 6, backgroundColor: appColors.black },
});
