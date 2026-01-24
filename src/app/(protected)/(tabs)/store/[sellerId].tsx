import { FeedProduct } from "@/components/Feed/types";
import ProductCard from "@/components/Product/ProductCard";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import ScreenView from "@/components/ui/Layout/ScreenView";
import LSeachBar from "@/components/ui/LSeachBar";
import { ProductApi } from "@/hooks/useProductApi";
import Icon from "@/icons";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

export default function SellerStoreScreen() {
  const { sellerId, sellerAvatarUrl, sellerName, sellerUsername } =
    useLocalSearchParams<{
      sellerId?: string;
      sellerAvatarUrl: string;
      sellerName: string;
      sellerUsername: string;
    }>();

  const { data } = ProductApi.getProductByProfileId(sellerId ?? "");

  const products = data?.data;

  // const [sellerProducts, setSellerProducts] = useState<FeedProduct[]>([]);

  // useEffect(() => {
  //   if (data?.data) setSellerProducts(data?.data);
  // }, [data]);

  // const FeedItem = React.memo(function FeedItem({ product }: ProductCardType) {
  //   return <ProductCard product={product} />;
  // });

  // const renderItem = useCallback<ListRenderItem<FeedProduct>>(
  //   ({ item }) => <FeedItem product={item} />,
  //   []
  // );

  const renderItem: ListRenderItem<FeedProduct> = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  );

  return (
    <ScreenView className="flex-1 bg-yellow-100">
      <FlatList
        ListHeaderComponent={
          <>
            <View className="flex-row gap-4">
              <Avatar path={sellerAvatarUrl} size={100} />
              <View className="gap-4">
                <View>
                  <AppText variant={"titleLarge"} className="font-SemiBold">
                    {sellerName}
                  </AppText>
                  <AppText>@{sellerUsername}</AppText>
                </View>

                <View className="flex-row items-center gap-1">
                  <AppText>{(products?.length ?? 0) - 1} + listings</AppText>
                  <Icon name="store" size={20} />
                </View>
              </View>
            </View>
            <View className="my-3 gap-6 pb-3">
              <LSeachBar placeholder="search item" />
              <View className="flex-row items-end justify-between">
                <View className="-gap-2 flex-row">
                  <AppText className="font-SemiBold">{sellerName}</AppText>
                  <AppText>'s listing</AppText>
                </View>
              </View>
            </View>
          </>
        }
        data={products}
        keyExtractor={item => item?.id}
        renderItem={renderItem}
        bounces
        scrollEnabled
        showsVerticalScrollIndicator={false}
        // alwaysBounceVertical
        // overScrollMode="always"
        // removeClippedSubviews
        // initialNumToRender={6}
        // maxToRenderPerBatch={6}
        // windowSize={7}
        numColumns={2}
      />
    </ScreenView>
  );
}
