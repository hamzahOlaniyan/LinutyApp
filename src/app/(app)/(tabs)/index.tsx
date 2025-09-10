import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import PostCard from "@/src/components/post/PostCard";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { fetchPost, getPostById } from "@/src/Services/posts";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, View } from "react-native";

export default function index() {
   // const [showComments, setShowComments] = useState(false);
   const [postID, setPostID] = useState<string>("");
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [replyToName, setReplyToName] = useState<string | null>(null);
   const [replyToId, setReplyToId] = useState<string | null>(null);
   const [lastOffset, setLastOffset] = useState(0);

   const {
      data: POSTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPost,
   });

   const {
      data: COMMENTS,
      isLoading: loading,
      error: postDetailError,
   } = useQuery({
      queryKey: ["posts", postID],
      queryFn: () => getPostById(postID),
   });

   // console.log("comments", JSON.stringify(COMMENTS, null, 2));
   // console.log(showComments, postID);

   const headerTranslateY = useRef(new Animated.Value(0)).current;

   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;

      if (offsetY <= 0) {
         // Always show header at very top
         Animated.timing(headerTranslateY, {
            toValue: 0,
            duration: -150,
            useNativeDriver: true,
         }).start();
      } else if (offsetY > lastOffset) {
         // Scrolling down → hide
         Animated.timing(headerTranslateY, {
            toValue: -100,
            duration: -100,
            useNativeDriver: true,
         }).start();
      } else if (offsetY < lastOffset) {
         // Scrolling up → show
         Animated.timing(headerTranslateY, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
         }).start();
      }

      setLastOffset(offsetY);
   };

   const setScroll = () => {
      return false;
   };

   return (
      <ScreenWrapper paddingHorizontal={0}>
         <SafeAreaView style={{ paddingHorizontal: wp(0), backgroundColor: appColors.extralightOlive }}>
            <HomeHeaderMenu headerTranslateY={headerTranslateY} />
            <FlatList
               data={POSTS?.filter((p) => !p.parent_id)}
               renderItem={({ item }) => (
                  <PostCard
                     post={item}
                     showMoreIcon
                     count={item.comments?.filter((c: any) => c.parentId === null).length ?? 0}
                     setPostID={setPostID}
                     comments={COMMENTS}
                  />
               )}
               showsVerticalScrollIndicator={false}
               onScroll={setScroll}
               scrollEventThrottle={4}
               contentContainerStyle={{
                  paddingTop: 56,
                  rowGap: 8,
               }}
               ListFooterComponent={
                  <View style={{ marginVertical: POSTS?.length === 0 ? 200 : 30 }}>{/* <Loading /> */}</View>
               }
            />
         </SafeAreaView>
      </ScreenWrapper>
   );
}
