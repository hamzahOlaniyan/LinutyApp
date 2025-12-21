import { FeedProduct } from "@/components/Feed/types";
import ProductCard from "@/components/Product/ProductCard";
import ScreenView from "@/components/ui/Layout/ScreenView";
import LSeachBar from "@/components/ui/LSeachBar";
import { appColors } from "@/constant/colors";
import { ProductApi } from "@/hooks/useProductApi";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

export default function StorePage() {
  const { isLoading, data, refetch } = ProductApi.useGetProductFeed();

  const products: FeedProduct[] = data?.data;

  // const bottomSheetRef = useRef<BottomSheet>(null);

  const renderItem: ListRenderItem<FeedProduct> = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  );

  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <ScreenView>
        <LSeachBar />
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshing={isLoading}
          onRefresh={refetch}
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
            marginVertical: 8
          }}
          contentContainerStyle={{
            paddingBottom: 100,
            backgroundColor: appColors.primary,
            flex: 1
          }}
        />

        {/* <Portal hostName="root">
          <ModalBottomSheet
            ref={bottomSheetRef}
            title="Search category"
            children={
              <View>
              </View>
            }
          />
        </Portal> */}
      </ScreenView>
    </View>
  );
}
