import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";

type Props = {
   item: any;
   isLoading: boolean;
};

export default function FeaturedCard({ item, isLoading }: Props) {
   const router = useRouter();

   let loading = true;

   if (loading) {
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
      <TouchableOpacity
         onPress={() => router.push(`/productDetail/${item?.id}`)}
         style={{
            backgroundColor: appColors.primary,
            borderRadius: 8,
            overflow: "hidden",
            width: 165,
         }}
      >
         <Image
            source={item?.images[0]?.url}
            style={{
               aspectRatio: 1,
            }}
         />
         <View
            style={{
               padding: 10,
               gap: 6,
            }}
         >
            <AppText size="sm" weight="med" cap="capitalize" color={appColors.white}>
               {item?.name.trim()}
            </AppText>
            <AppText size="sm" cap="capitalize" color={appColors.white}>
               {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
            </AppText>
         </View>
      </TouchableOpacity>
   );
}
