import HomeHeaderMenu from "@/components/HomeHeaderMenu";
import PostCard from "@/components/post/PostCard";
import PostSkeleton from "@/components/post/PostSkeleton";
import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { injectSponsoredBlocks } from "@/hooks/injecSponsoredBloacks";
import { fetchPost, getPostById } from "@/Services/db/posts";
import { getStoreProduct } from "@/Services/db/store";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
   const { postId, openComments, scrollToPost } = useLocalSearchParams();
   const [postID, setPostID] = useState<string>("");
   const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
   const [refreshing, setRefreshing] = useState<boolean>(false);
   const [visibleIndex, setVisibleIndex] = useState(0);

   const [visibleVideoPostId, setVisibleVideoPostId] = useState<string | null>(null);

   const flatListRef = useRef<FlatList>(null);

   const { data: PRODUCT } = useQuery({
      queryKey: ["store"],
      queryFn: async () => getStoreProduct(),
   });

   const {
      data: POSTS = [],
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
      if (!postId || !POSTS?.length) return;

      const pid = postId as string;
      const index = POSTS.findIndex((p) => p.id === pid);

      if (index !== -1 && flatListRef.current) {
         setTimeout(() => {
            flatListRef.current?.scrollToIndex({
               index,
               animated: true,
               viewPosition: 1,
               viewOffset: 10,
            });
         }, 100);
      }

      if (openComments === "true") {
         setPostID(pid);
         setActiveCommentsPostId(pid);
      }
   }, [postId, openComments, POSTS]);

   const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await fetchPost(); // your refetch function
      setRefreshing(false);
   }, []);

   const viewabilityConfig = useMemo(() => ({ itemVisiblePercentThreshold: 20 }), []);

   const onViewableItemsChanged = (event: any) => {
      const newIndex = event?.viewableItems;
      setVisibleIndex(newIndex[0]?.item?.id);
   };

   // console.log("FEED DATA", JSON.stringify(feedData, null, 2));

   return (
      <View style={{ backgroundColor: appColors.white, flex: 1 }}>
         <SafeAreaView style={{ flex: 1 }}>
            <HomeHeaderMenu />
            <View style={{ flex: 1, backgroundColor: appColors.extralightOlive }}>
               {isFetching ? (
                  <PostSkeleton />
               ) : (
                  <FlatList
                     ListHeaderComponent={
                        <View style={{ backgroundColor: appColors.white }} className="p-4">
                           <AppText size="lg" weight="semi">
                              Sponsor Ad
                           </AppText>
                           <AppText size="sm">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laudantium minus facilis
                              officiis quibusdam!
                           </AppText>
                        </View>
                     }
                     contentContainerStyle={{ rowGap: 6 }}
                     showsVerticalScrollIndicator={false}
                     maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
                     contentInsetAdjustmentBehavior="automatic"
                     refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={refetch} colors={["#22c55e"]} />
                     }
                     refreshing={refreshing}
                     onRefresh={onRefresh}
                     bounces
                     updateCellsBatchingPeriod={50}
                     alwaysBounceVertical
                     overScrollMode="always"
                     viewabilityConfig={viewabilityConfig}
                     // initialNumToRender={1}
                     // onEndReachedThreshold={0.3}
                     // onEndReached={fetchPost()}
                     // windowSize={5}
                     // onViewableItemsChanged={onViewableItemsChanged}
                     // removeClippedSubviews={true}
                     ref={flatListRef}
                     data={feedData}
                     keyExtractor={(item, index) => {
                        const type = item.type ?? "unknown";
                        const id = item.id ?? index;
                        return `${type}-${id}`;
                     }}
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
                                    visibleVideoPostId={visibleVideoPostId}
                                    visibleIndex={visibleIndex}
                                 />
                              );

                           case "product-single":
                              return (
                                 <View style={{ padding: 12, backgroundColor: "#fff", gap: 8 }}>
                                    <AppText weight="bold" color={appColors.primary}>
                                       🛍️ Sponsored Ad
                                    </AppText>
                                    {/* {item?.item?.images && (
                                       <Image
                                          source={{ uri: item?.item?.images[0] }}
                                          style={{ borderRadius: 8, aspectRatio: 1 }}
                                       />
                                    )} */}
                                    <AppText weight="semi">{item.item?.name ?? item.item?.title}</AppText>
                                 </View>
                              );

                           case "product-group":
                              return (
                                 <View style={{ backgroundColor: appColors.white }}>
                                    <View className="p-4">
                                       <AppText weight="semi">Community store</AppText>
                                    </View>

                                    <FlatList
                                       horizontal
                                       data={item.items}
                                       keyExtractor={(product, pIndex) =>
                                          `group-${item.id}-product-${product?.id ?? pIndex}-${pIndex}`
                                       }
                                       showsHorizontalScrollIndicator={false}
                                       contentContainerStyle={{ gap: 6, paddingHorizontal: 12, paddingBottom: 5 }}
                                       renderItem={({ item: product, index }) => (
                                          <View
                                             style={{
                                                backgroundColor: appColors.white,
                                                borderRadius: 10,
                                                width: 180,
                                                gap: 4,
                                                overflow: "hidden",
                                             }}
                                          >
                                             {product?.images && (
                                                <Image
                                                   source={{ uri: product?.images[0]?.url }}
                                                   style={{
                                                      aspectRatio: 2 / 3,
                                                   }}
                                                />
                                             )}
                                             <AppText size="sm" weight="med">
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
                     ListFooterComponent={<View style={{ marginVertical: feedData?.length === 0 ? 200 : 30 }}></View>}
                  />
               )}
            </View>
         </SafeAreaView>
      </View>
   );
}
