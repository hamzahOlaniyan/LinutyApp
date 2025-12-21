import { FeedProduct } from "@/components/Feed/types";
import AppText from "@/components/ui/AppText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

type ProductCard = {
  product: FeedProduct;
};

export default function ProductCard({ product }: ProductCard) {
  const media = product?.media ?? [];

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/(protected)/(tabs)/store/product/${product.id}`)
      }
      style={{ width: 195 }}
    >
      {media.map(pic => (
        <Image
          key={pic.id}
          source={{ uri: pic.url }}
          style={{ width: "100%", height: 200 }}
        />
      ))}
      <AppText>{product.title}</AppText>
      <AppText>{product.price}</AppText>
    </TouchableOpacity>
  );
}
