import { FeedProduct } from "@/components/Feed/types";
import ProductCard from "@/components/Product/ProductCard";
import Button from "@/components/ui/Button";
import ScreenView from "@/components/ui/Layout/ScreenView";
import LSeachBar from "@/components/ui/LSeachBar";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import { ProductApi } from "@/hooks/useProductApi";
import Icon from "@/icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, ListRenderItem, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

export default function StorePage() {
  const { data } = ProductApi.useGetProductFeed();

  const products = data?.data;

  const [showSearchBar, setShowSearchBar] = useState(false);

  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(showSearchBar ? 50 : 0, { duration: 300 });
    opacity.value = withTiming(showSearchBar ? 1 : 0, { duration: 300 });
  }, [showSearchBar]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value
    };
  });

  const renderItem: ListRenderItem<FeedProduct> = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  );

  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <ScreenView>
        <View className="flex-row justify-between gap-0 py-4">
          <View className="flex-row gap-2">
            <Button
              size="sm"
              variant="secondary"
              icon={<Icon name={"menu"} />}
              onPress={handleOpenSheet}
            />
            <Button
              size="sm"
              variant="secondary"
              icon={<Icon name={"search2"} />}
              onPress={() => setShowSearchBar(!showSearchBar)}
            />
          </View>
          <Button
            onPress={() =>
              router.push("/(protected)/(tabs)/store/create-product")
            }
            size="sm"
            variant="outline"
            icon={<Icon name={"plus"} />}
          />
        </View>
        {showSearchBar && (
          <Animated.View style={animatedStyle} className="mb-3 mt-1">
            <LSeachBar placeholder="search item..." />
          </Animated.View>
        )}
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          scrollEnabled
          bounces
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
          overScrollMode="always"
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
          columnWrapperStyle={{
            gap: 10,
            rowGap: 10
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            rowGap: 20
          }}
        />
      </ScreenView>
      <Portal hostName="root">
        <ModalBottomSheet
          ref={bottomSheetRef}
          title="Search category"
          children={<View></View>}
        />
      </Portal>
    </View>
  );
}
