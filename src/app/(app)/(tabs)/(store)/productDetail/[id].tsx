import ProductDetail from "@/src/components/store/ProductDetail";
import ProductSkeleton from "@/src/components/store/ProductSkeleton";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { getStoreProductById } from "@/src/Services/store";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, View, ViewabilityConfig, ViewToken } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductDetailsScreen() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [currentIndex, setCurrentIndex] = useState(0);

   const { width: screenWidth } = Dimensions.get("screen");
   const { bottom } = useSafeAreaInsets();

   const viewabilityConfig = useRef<ViewabilityConfig>({ viewAreaCoveragePercentThreshold: 60 }).current;
   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
   }).current;

   const {
      data: PRODUCT_DETAIL,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["store", id],
      queryFn: () => getStoreProductById(id),
   });

   if (isLoading) {
      return <ProductSkeleton />;
   }

   return (
      <ScrollView
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{ paddingBottom: 150 }}
         style={{ backgroundColor: appColors.white, marginBottom: bottom }}
      >
         <View style={s.mediaContainer}>
            <FlatList
               data={PRODUCT_DETAIL?.images}
               keyExtractor={(item, index) => item.url || index.toString()}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               renderItem={({ item }) => (
                  <View>
                     <Image
                        source={{ uri: item?.url }}
                        style={{ width: screenWidth, height: screenWidth, aspectRatio: 1 }}
                        contentPosition="center"
                        contentFit="contain"
                     />
                     <Image
                        source={{ uri: item?.url }}
                        style={{
                           width: screenWidth,
                           height: screenWidth,
                           aspectRatio: 1,
                           position: "absolute",
                           top: 0,
                           opacity: 0.5,
                           zIndex: -10,
                        }}
                        blurRadius={15}
                        contentPosition="center"
                     />
                  </View>
               )}
               contentContainerStyle={{ backgroundColor: appColors.white }}
               onViewableItemsChanged={onViewableItemsChanged}
               viewabilityConfig={viewabilityConfig}
            />
         </View>
         <View style={s.mediaCounter}>
            <AppText size="sm" color={appColors.white}>
               {currentIndex + 1} / {PRODUCT_DETAIL?.images?.length}
            </AppText>
         </View>
         <View style={s.dotsRow}>
            {PRODUCT_DETAIL?.images?.map((_: string, i: number) => (
               <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
            ))}
         </View>
         <ProductDetail item={PRODUCT_DETAIL} />
      </ScrollView>
   );
}

const s = StyleSheet.create({
   mediaContainer: { position: "relative", justifyContent: "center", alignItems: "center" },
   mediaCounter: {
      position: "absolute",
      right: 12,
      top: 12,
      backgroundColor: "rgba(0,0,0,0.55)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 20,
   },
   mediaCounterText: { color: appColors.white, fontSize: 12, fontWeight: "600" },
   dotsRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      borderRadius: 100,
      paddingVertical: 8,
   },
   dot: { width: 6, height: 6, borderRadius: 50, backgroundColor: appColors.grey },
   dotActive: { backgroundColor: appColors.black, width: 8, height: 8 },
});
