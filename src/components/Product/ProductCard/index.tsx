import { FeedProduct } from "@/components/Feed/types";
import AppText from "@/components/ui/AppText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export type ProductCardType = {
  product: FeedProduct;
};

export default function ProductCard({ product }: ProductCardType) {
  const media = product?.media ?? [];

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/(protected)/(tabs)/store/product/${product.id}`)
      }
      className="w-full flex-1 gap-2"
    >
      {media?.map(pic => (
        <Image
          key={pic.id}
          source={{ uri: pic?.url }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            flex: 1
          }}
        />
      ))}
      <View>
        <AppText className="font-SemiBold">{product.title}</AppText>
        <AppText>
          {Intl.NumberFormat("en-UK", {
            style: "currency",
            currency: "GBP"
          }).format(product?.price)}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
