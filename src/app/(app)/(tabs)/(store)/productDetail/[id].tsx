// import { useThemeStore } from "@/src/context/themeStore";
import Indicator from "@/src/components/store/Indicator";
import ProductDetail from "@/src/components/store/ProductDetail";
import { appColors } from "@/src/constant/colors";
import { getStoreProductById } from "@/src/Services/store";
// import { ProductInput } from "@/src/types/types";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, ScrollView, View } from "react-native";

export default function ProductDetailsScreen() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const { width } = Dimensions.get("window");
   // const { currentTheme } = useThemeStore();

   const [activeIndex, setActiveIndex] = useState<number>(0);
   const scrollX = useRef(new Animated.Value(0)).current;
   const slidesRef = useRef<FlatList<any>>(null);

   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

   const activeViewItemChanged = useCallback(({ viewableItems }: any) => {
      if (viewableItems && viewableItems.length > 0) {
         setActiveIndex(viewableItems[0].index);
      }
   }, []);

   const {
      data: PRODUCT_DETAIL,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["store", id],
      queryFn: () => getStoreProductById(id),
   });

   return (
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={{ backgroundColor: appColors.white }}>
         <Animated.FlatList
            data={PRODUCT_DETAIL?.images || []}
            renderItem={({ item }) => (
               <View
                  style={{ width, height: "100%", backgroundColor: appColors.lightOlive }}
                  className="gap-8 items-center"
               >
                  <Image source={item} style={{ width: "100%", height: 400 }} contentFit="contain" />
               </View>
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
               useNativeDriver: false,
            })}
            onViewableItemsChanged={activeViewItemChanged}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            ref={slidesRef}
         />
         <View className="relative">
            <Indicator item={PRODUCT_DETAIL?.images} scrollX={scrollX} />
         </View>
         <ProductDetail item={PRODUCT_DETAIL} />
      </ScrollView>
   );
}
