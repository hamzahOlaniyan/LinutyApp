import { FeedProduct } from "@/components/Feed/types";
import AppText from "@/components/ui/AppText";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { appColors } from "@/constant/colors";
import { ProductApi } from "@/hooks/useProductApi";
import Icon from "@/icons";
import { useAuthStore } from "@/store/useAuthStore";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

import ProductDetail from "@/components/Product/Detail";
import ProductOptions from "@/components/Product/ProductOptions";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewabilityConfig,
  ViewToken
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function ProductScreen() {
  const { me } = useAuthStore();
  const { productId } = useLocalSearchParams<{ productId?: string }>();

  const { data } = ProductApi.useGetProductById(productId ?? null);
  const [product, setProduct] = useState<FeedProduct | null>(null);

  useEffect(() => {
    if (data?.data)
      setProduct(Array.isArray(data.data) ? data.data[0] : data.data);
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewabilityConfig = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 60
  }).current;

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

  const media = product?.media ?? [];

  const { width: screenWidth } = Dimensions.get("window");

  const isOwner = me?.id === product?.seller.id;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <TouchableOpacity onPress={handleOpenSheet} style={s.action}>
          <Icon name="threeDots" color="white" />
          <Portal hostName="root">
            <ModalBottomSheet
              ref={bottomSheetRef}
              snapPoints={["45%"]}
              children={
                <ProductOptions
                  bottomSheetRef={bottomSheetRef}
                  isUserOwner={isOwner}
                  productId={productId}
                />
              }
            />
          </Portal>
        </TouchableOpacity>

        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: appColors.text }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          data={media}
          keyExtractor={(item, index) => item.url || index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.url }}
              style={{
                width: screenWidth,
                height: screenWidth
              }}
              contentPosition="center"
            />
          )}
        />
        <View style={s.mediaCounter}>
          <AppText variant={"xs"} color={appColors.white}>
            {currentIndex + 1} / {media.length}
          </AppText>
        </View>
        <View style={s.dotsRow}>
          {media?.map((_, i) => (
            <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
          ))}
        </View>
      </View>
      <ScreenView className="pb-10">
        <ProductDetail item={product} />
      </ScreenView>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  action: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
    zIndex: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  mediaContainer: { position: "relative" },
  mediaCounter: {
    position: "absolute",
    right: 12,
    top: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  dotsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    position: "relative",
    top: -15
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 12,
    backgroundColor: appColors.grey
  },
  dotActive: { width: 8, height: 8, backgroundColor: appColors.text }
});
