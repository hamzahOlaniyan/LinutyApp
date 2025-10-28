import { appColors } from "@/src/constant/colors";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../ui/AppText";

export default function StoreCard({ item }: any) {
   return (
      <Link
         href={`/productDetail/${item?.id}`}
         asChild
         className="flex-1"
         style={{ backgroundColor: appColors.white, paddingBottom: 6 }}
      >
         <Pressable className="flex-1 gap-2 relative">
            <Image source={item?.images[0]} style={{ aspectRatio: 1 / 1 }} />
            <View className="px-2 gap-1">
               <AppText size="sm" weight="med" cap="capitalize">
                  {item?.name.trim()}
               </AppText>
               <AppText size="sm" cap="capitalize">
                  {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
               </AppText>
            </View>
         </Pressable>
      </Link>
   );
}
