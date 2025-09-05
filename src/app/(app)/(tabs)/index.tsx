import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import PostCard from "@/src/components/post/PostCard";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { fetchPost } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, View } from "react-native";

export default function index() {
   const { signOut } = useAuthStore();

   const [showComments, setShowComments] = useState(false);
   const [postID, setPostID] = useState<string>("");
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [replyToName, setReplyToName] = useState<string | null>(null);
   const [replyToId, setReplyToId] = useState<string | null>(null);
   const [lastOffset, setLastOffset] = useState(0);

   const {
      data: posts,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPost,
   });

   // console.log(JSON.stringify(posts, null, 2));

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

   return (
      <ScreenWrapper paddingHorizontal={0}>
         <SafeAreaView style={{ paddingHorizontal: wp(0), backgroundColor: appColors.extralightOlive }}>
            <HomeHeaderMenu headerTranslateY={headerTranslateY} />
            <FlatList
               data={posts?.filter((p) => !p.parent_id)}
               renderItem={({ item }) => (
                  <PostCard
                     post={item}
                     showMoreIcon
                     count={item.comments?.filter((c: any) => c.parentId === null).length ?? 0}
                     showComments={showComments}
                     setShowComments={setShowComments}
                     setPostID={setPostID}
                  />
               )}
               showsVerticalScrollIndicator={false}
               onScroll={handleScroll}
               scrollEventThrottle={4}
               contentContainerStyle={{
                  paddingTop: 70,
                  rowGap: 6,
               }}
               ListFooterComponent={
                  <View style={{ marginVertical: posts?.length === 0 ? 200 : 30 }}>{/* <Loading /> */}</View>
               }
            />
         </SafeAreaView>
      </ScreenWrapper>
   );
}
