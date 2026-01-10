import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { PostApi } from "@/hooks/usePostApi";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken
} from "react-native";
import { MediaFile } from "../../../../../types/supabaseTypes";

export default function media() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { data } = PostApi.getPostMedia(postId);

  const [media, setMedia] = useState<MediaFile[]>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width: screenWidth } = Dimensions.get("window");

  useEffect(() => {
    if (data) setMedia(data);
  }, [data]);

  const onViewableItemsChanged = useRef(
    ({
      viewableItems
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      const idx = (viewableItems?.[0]?.index ?? 0) as number | null;
      setCurrentIndex(idx ?? 0);
    }
  ).current;

  const viewabilityConfig = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 60
  }).current;

  return (
    <View className="flex-1 bg-text">
      <FlatList
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        data={media}
        keyExtractor={(item, index) => item.url || index.toString()}
        renderItem={({ item }) => {
          const aspectRatio =
            item.width && item.height
              ? (item.width / item.height) * 1.1
              : 2 / 3;

          return (
            <Image
              source={{ uri: item.url }}
              style={{
                width: screenWidth,
                height: screenWidth,
                aspectRatio: aspectRatio
              }}
              contentFit="contain"
              contentPosition="center"
            />
          );
        }}
      />
      <View style={s.mediaCounter}>
        <AppText variant={"xs"} color={appColors.white}>
          {currentIndex + 1} / {media?.length}
        </AppText>
      </View>
      <View style={s.dotsRow}>
        {media?.map((_, i) => (
          <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  mediaCounter: {
    position: "absolute",
    right: 12,
    top: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10
  },
  dotsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    paddingTop: 12
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 12,
    backgroundColor: appColors.grey
  },
  dotActive: { width: 6, height: 6, backgroundColor: appColors.white }
});
