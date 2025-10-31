import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

export default function StoreCard({ item, isLoading }: { item: any; isLoading: boolean }) {
   const router = useRouter();

   if (isLoading) {
      return (
         <Animated.View className="animate-pulse bg-white flex-1 gap-2">
            <View className="bg-neutral-200 aspect-square"></View>
            <View className="p-3 gap-2">
               <View className="bg-neutral-200 h-2 w-full rounded-full"></View>
               <View className="bg-neutral-200 h-2 w-full rounded-full"></View>
            </View>
         </Animated.View>
      );
   }
   return (
      <TouchableOpacity
         onPress={() => router.push(`/productDetail/${item?.id}`)}
         className="flex-1"
         style={{ backgroundColor: appColors.white }}
      >
         <Image
            source={item?.images[0]?.url}
            style={{ width: "auto", height: "auto", aspectRatio: 1, backgroundColor: appColors.white }}
         />
         <View className="px-4 py-1 gap-1">
            <AppText size="sm" weight="med" cap="capitalize">
               {item?.name.trim()}
            </AppText>
            <AppText size="sm" cap="capitalize" color={appColors.secondary}>
               {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
            </AppText>
         </View>
      </TouchableOpacity>
   );
}
