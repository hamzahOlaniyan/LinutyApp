import { appColors } from "@/constant/colors";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, ListRenderItemInfo, StyleSheet, View, ViewabilityConfig, ViewToken } from "react-native";
import AppText from "./AppText";

// interface MediaItem {
//    type: "image" | "video";
//    url: string;
//    width?: number;
//    height?: number;
// }

interface ImageSlideViewerProps<T> {
   data: T[];
   renderItem: (item: T, index: number) => React.ReactNode;
}

export default function ImageSlideViewer<T>({ data, renderItem }: ImageSlideViewerProps<T>) {
   const [currentIndex, setCurrentIndex] = useState(0);

   const { width: screenWidth } = Dimensions.get("screen");

   const viewabilityConfig = useRef<ViewabilityConfig>({ viewAreaCoveragePercentThreshold: 60 }).current;
   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
   }).current;

   const renderListItem = ({ item, index }: ListRenderItemInfo<T>) => renderItem(item, index);

   return (
      <View style={s.mediaContainer}>
         <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderListItem as any}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
         />
         <View style={s.mediaCounter}>
            <AppText size="xs" color={appColors.white}>
               {currentIndex + 1} / {data.length}
            </AppText>
         </View>
         <View style={s.dotsRow}>
            {data.map((_item: any, i: number) => (
               <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
            ))}
         </View>
      </View>
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
      flexDirection: "row",
      justifyContent: "center",
      gap: 4,
      paddingVertical: 12,
   },
   dot: { width: 5, height: 5, borderRadius: 12, backgroundColor: appColors.grey },
   dotActive: { backgroundColor: appColors.black, width: 6, height: 6 },
});
