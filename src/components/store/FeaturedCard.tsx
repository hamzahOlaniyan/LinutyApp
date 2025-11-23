import { appColors } from "@/constant/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, Pressable, View } from "react-native";
import AppText from "../ui/AppText";

type Props = {
   item: any;
   isLoading: boolean;
};

export default function FeaturedCard({ item, isLoading }: Props) {
   const router = useRouter();

   if (isLoading) {
      return (
         <Animated.View
            style={{
               backgroundColor: appColors.white,
               borderRadius: 8,
               overflow: "hidden",
               width: 165,
               height: 275,
            }}
            className="animate-pulse"
         >
            <View className="bg-neutral-200 aspect-square w-full flex-1"></View>
            <View className="p-3 gap-2">
               <View className="bg-neutral-200 h-2 w-full rounded-full"></View>
               <View className="bg-neutral-200 h-2 w-full rounded-full"></View>
            </View>
         </Animated.View>
      );
   }

   return (
      <Pressable
         onPress={() => router.push(`/store/product/${item?.id}`)}
         style={{
            borderRadius: 8,
            overflow: "hidden",
            width: 165,
         }}
      >
         <Image
            source={{ uri: item?.images[0]?.url }}
            style={{
               aspectRatio: 1,
            }}
         />
         <View
            style={{
               padding: 10,
               gap: 2,
            }}
         >
            <AppText weight="med" cap="capitalize">
               {item?.name.trim()}
            </AppText>
            <AppText cap="capitalize">
               {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
            </AppText>
         </View>
      </Pressable>
   );
}
