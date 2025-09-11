import HomeHeaderMenu from "@/src/components/HomeHeaderMenu";
import PostCard from "@/src/components/post/PostCard";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { fetchPost, getPostById } from "@/src/Services/posts";
import { getStoreProduct } from "@/src/Services/store";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";

import { Animated, FlatList, SafeAreaView, View } from "react-native";

export default function index() {
   // const [showComments, setShowComments] = useState(false);
   const [postID, setPostID] = useState<string>("");
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [replyToName, setReplyToName] = useState<string | null>(null);
   const [replyToId, setReplyToId] = useState<string | null>(null);
   const [lastOffset, setLastOffset] = useState(0);

   function injectSponsoredBlocks(posts: any[], products: any[], interval = 5) {
      if (!products?.length) return posts?.map((p) => ({ ...p, type: "post" }));

      const merged: any[] = [];
      let productIndex = 0;

      posts?.forEach((post, index) => {
         merged.push({ ...post, type: "post" });

         if ((index + 1) % interval === 0) {
            // pick a random block type
            const blockType = ["product-single", "product-group", "info"][Math.floor(Math.random() * 3)];

            if (blockType === "product-single") {
               merged.push({
                  type: "product-single",
                  item: products[productIndex],
               });
               productIndex = (productIndex + 1) % products?.length;
            }

            if (blockType === "product-group") {
               const group: any[] = [];
               for (let i = 0; i < 3; i++) {
                  group.push(products[productIndex]);
                  productIndex = (productIndex + 1) % products?.length;
               }
               merged.push({ type: "product-group", items: group });
            }

            if (blockType === "info") {
               merged.push({
                  type: "info",
                  title: "Sponsored Info",
                  description: "This is an informational sponsored block.",
               });
            }
         }
      });

      return merged;
   }

   // only top-level posts

   const { data: PRODUCT } = useQuery({
      queryKey: ["store"],
      queryFn: async () => getStoreProduct(),
   });

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
      isLoading: commentsLoading,
      error: postDetailError,
   } = useQuery({
      queryKey: ["posts", postID],
      queryFn: () => getPostById(postID),
   });

   const topLevelPosts = POSTS?.filter((p: any) => !p.parent_id);

   const feedData = injectSponsoredBlocks(topLevelPosts as any, PRODUCT as any, 1);

   const headerTranslateY = useRef(new Animated.Value(0)).current;

   return (
      <ScreenWrapper paddingHorizontal={0}>
         <SafeAreaView style={{ paddingHorizontal: wp(0), backgroundColor: appColors.extralightOlive }}>
            <HomeHeaderMenu />
            <FlatList
               data={feedData}
               keyExtractor={(item, index) => item.id ?? `feed-${index}`}
               contentContainerStyle={{ rowGap: 8 }}
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
                                    style={{ width: "100%", height: 160, borderRadius: 8 }}
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
                                          width: 175,
                                          height: 300,
                                          backgroundColor: "#fff",
                                          borderRadius: 10,
                                          position: "relative",
                                       }}
                                    >
                                       {/* <AppText>{product.description ?? "Sponsored"}</AppText> */}
                                       {product.images && (
                                          <Image
                                             source={{ uri: product?.images[0] }}
                                             style={{ width: "100%", height: "85%", borderRadius: 8 }}
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
               ListHeaderComponent={
                  <View style={{ backgroundColor: appColors.white }} className="p-4">
                     <AppText weight="semi" color={appColors.primary}>
                        Sponsor Ad
                     </AppText>
                     <AppText>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laudantium minus facilis officiis
                        quibusdam!
                     </AppText>
                  </View>
               }
               ListFooterComponent={
                  <View style={{ marginVertical: feedData?.length === 0 ? 200 : 30 }}>{/* <Loading /> */}</View>
               }
            />
         </SafeAreaView>
      </ScreenWrapper>
   );
}
