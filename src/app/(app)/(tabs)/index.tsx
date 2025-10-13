import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import PostCard from "@/src/components/post/PostCard";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { injectSponsoredBlocks } from "@/src/hooks/injecSponsoredBloacks";
import { fetchPost, getPostById } from "@/src/Services/posts";
import { getStoreProduct } from "@/src/Services/store";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { FlatList, RefreshControl, View } from "react-native";

export default function index() {
   const { postId, openComments } = useLocalSearchParams();
   const [postID, setPostID] = useState<string>("");
   const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
   const [refreshing, setRefreshing] = useState<boolean>(false);
   // const [showComments, setShowComments] = useState(false);
   // const [showKeyboard, setShowKeyboard] = useState(false);
   // const [replyToName, setReplyToName] = useState<string | null>(null);
   // const [replyToId, setReplyToId] = useState<string | null>(null);

   // const bottomSheetRef = useRef<BottomSheet>(null);

   // const handleCloseSheet = () => bottomSheetRef.current?.close();
   // const handleOpenSheet = () => bottomSheetRef.current?.expand();

   // const [showKeyboard, setShowKeyboard] = useState(false);
   // const [replyToName, setReplyToName] = useState<string | null>(null);
   // const [replyToId, setReplyToId] = useState<string | null>(null);
   // const [lastOffset, setLastOffset] = useState(0);

   // only top-level posts

   const { data: PRODUCT } = useQuery({
      queryKey: ["store"],
      queryFn: async () => getStoreProduct(),
   });

   const {
      data: POSTS,
      error,
      isFetching,
      refetch,
   } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPost,
      staleTime: 1000 * 60 * 5, // (optional) cache valid for 5 minutes
      refetchOnWindowFocus: false, // ✅ don’t refetch when switching tabs
      refetchOnReconnect: false,
   });

   const {
      data: COMMENTS,
      isLoading: commentsLoading,
      error: postDetailError,
   } = useQuery({
      queryKey: ["posts", postID],
      queryFn: () => getPostById(postID),
   });

   const topLevelPosts = POSTS?.filter((p: any) => !p.parent_id);

   const feedData = useMemo(() => {
      return injectSponsoredBlocks(topLevelPosts as any, PRODUCT as any, 2);
   }, [topLevelPosts, PRODUCT as any]);

   useEffect(() => {
      if (postId && openComments === "true") {
         setPostID(postId as string); // for fetching comments
         setActiveCommentsPostId(postId as string); // tells PostCard to open BottomSheet
      }
   }, [postId, openComments]);

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      //  const loaded = await fetchPage(1, { append: false });
      //  setRefreshing(false);
      //  if (loaded > 0) {
      //    setShowRefreshed(true);
      //  }
   }, [, refreshing, setRefreshing]);

   const viewabilityConfig = useMemo(() => ({ itemVisiblePercentThreshold: 20 }), []);

   return (
      <>
         <ScreenWrapper paddingHorizontal={0}>
            <HomeHeaderMenu />
            <View style={{ flex: 1, backgroundColor: appColors.extralightOlive }}>
               {isFetching ? (
                  <PostSkeleton />
               ) : (
                  <FlatList
                     ListHeaderComponent={
                        <View style={{ backgroundColor: appColors.white }} className="p-4">
                           <AppText weight="semi" color={appColors.primary}>
                              Sponsor Ad
                           </AppText>
                           <AppText>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laudantium minus facilis
                              officiis quibusdam!
                           </AppText>
                        </View>
                     }
                     data={feedData}
                     keyExtractor={(item, index) => item.id ?? `feed-${index}`}
                     contentContainerStyle={{ rowGap: 8 }}
                     showsVerticalScrollIndicator={false}
                     maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
                     contentInsetAdjustmentBehavior="automatic"
                     removeClippedSubviews
                     refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={refetch} colors={["#22c55e"]} />
                     }
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                     bounces
                     alwaysBounceVertical
                     overScrollMode="always"
                     viewabilityConfig={viewabilityConfig}
                     renderItem={({ item }) => {
                        switch (item.type) {
                           case "post":
                              return (
                                 <PostCard
                                    post={item}
                                    showMoreIcon
                                    count={item.comments?.filter((c: any) => c.parentId === null).length ?? 0}
                                    setPostID={setPostID}
                                    comments={COMMENTS}
                                    loading={commentsLoading}
                                    openComments={activeCommentsPostId === item?.id}
                                 />
                              );

                           case "product-single":
                              return (
                                 <View style={{ padding: 12, backgroundColor: "#fff", borderRadius: 10, gap: 8 }}>
                                    <AppText weight="bold" color={appColors.primary}>
                                       🛍️ Sponsored Ad
                                    </AppText>
                                    {/* <AppText>{item.item?.description ?? "Sponsored"}</AppText> */}
                                    {item?.item?.images && (
                                       <Image
                                          source={{ uri: item?.item?.images[0] }}
                                          style={{ borderRadius: 8, aspectRatio: 1 }}
                                       />
                                    )}
                                    <AppText weight="semi">{item.item?.name ?? item.item?.title}</AppText>
                                 </View>
                              );

                           case "product-group":
                              return (
                                 <View style={{ backgroundColor: appColors.white }}>
                                    <View className="p-4">
                                       <AppText weight="semi">Market Place</AppText>
                                    </View>

                                    <FlatList
                                       horizontal
                                       data={item.items}
                                       keyExtractor={(p, i) => `product-${p.id ?? i}`}
                                       showsHorizontalScrollIndicator={false}
                                       contentContainerStyle={{ gap: 6, paddingHorizontal: 12, paddingBottom: 5 }}
                                       renderItem={({ item: product }) => (
                                          <View
                                             style={{
                                                backgroundColor: appColors.white,
                                                borderRadius: 10,
                                                width: 180,
                                                gap: 4,
                                                overflow: "hidden",
                                             }}
                                          >
                                             {/* <AppText>{product.description ?? "Sponsored"}</AppText> */}
                                             {product.images && (
                                                <Image
                                                   source={{ uri: product?.images[0] }}
                                                   style={{
                                                      aspectRatio: 1 / 2,
                                                      backgroundColor: "yellow",
                                                   }}
                                                />
                                             )}
                                             <AppText size="sm" weight="semi">
                                                {product.name ?? product.title}
                                             </AppText>
                                          </View>
                                       )}
                                    />
                                 </View>
                              );

                           case "info":
                              return (
                                 <View
                                    style={{
                                       padding: 16,
                                       backgroundColor: appColors.white,
                                    }}
                                 >
                                    <AppText weight="semi" color={appColors.primary}>
                                       {item.title}
                                    </AppText>
                                    <AppText>{item.description}</AppText>
                                 </View>
                              );

                           default:
                              return null;
                        }
                     }}
                     ListFooterComponent={
                        <View style={{ marginVertical: feedData?.length === 0 ? 200 : 30 }}>{/* <Loading /> */}</View>
                     }
                  />
               )}
            </View>
         </ScreenWrapper>
      </>
   );
}
