import ProductDetail from "@/src/components/store/ProductDetail";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { getStoreProductById } from "@/src/Services/store";
// import { ProductInput } from "@/src/types/types";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, View, ViewabilityConfig, ViewToken } from "react-native";
import Animated from "react-native-reanimated";

export default function ProductDetailsScreen() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [currentIndex, setCurrentIndex] = useState(0);

   const { width: screenWidth } = Dimensions.get("screen");

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

   return (
      <ScrollView
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{ paddingBottom: 150 }}
         style={{ backgroundColor: appColors.white }}
      >
         <View style={s.mediaContainer}>
            <FlatList
               data={PRODUCT_DETAIL?.images || []}
               keyExtractor={(index) => index.toString()}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               renderItem={({ item }) => (
                  <View>
                     <View>
                        {isLoading ? (
                           <Animated.View
                              style={{ width: screenWidth, height: screenWidth, aspectRatio: 1 }}
                              className="bg-neutral-50"
                           ></Animated.View>
                        ) : (
                           <Image
                              source={{ uri: item }}
                              style={{ width: screenWidth, height: screenWidth, aspectRatio: 1 }}
                              contentPosition="center"
                              contentFit="contain"
                           />
                        )}
                     </View>
                  </View>
               )}
               contentContainerStyle={{ backgroundColor: appColors.black }}
               onViewableItemsChanged={onViewableItemsChanged}
               viewabilityConfig={viewabilityConfig}
            />
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
      borderRadius: 10,
   },
   mediaCounterText: { color: appColors.white, fontSize: 12, fontWeight: "600" },
   dotsRow: {
      position: "absolute",
      bottom: 10,
      left: "50%",
      transform: [{ translateX: "-50%" }],
      right: 0,
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
      // backgroundColor: "rgba(0,0,0,0.45)",
      borderRadius: 100,
   },
   dot: { width: 8, height: 8, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.5)" },
   dotActive: { backgroundColor: appColors.white, width: 10, height: 10 },
});
