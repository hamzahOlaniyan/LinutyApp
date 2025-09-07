import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../ui/AppText";

export default function StoreCard({ item }: any) {
   return (
      <Link href={`/productDetail/${item?.id}`} asChild className="flex-1">
         <Pressable className="flex-1 gap-2 relative">
            <Image source={item?.images[0]} style={{ borderRadius: 10, backgroundColor: "red", aspectRatio: 1 / 1 }} />
            <View className=" ">
               <AppText weight="med" cap="capitalize">
                  {item?.name}
               </AppText>
               {/* <AppText weight="semi" cap="capitalize">
                  {Intl.NumberFormat("en-UK", { style: "currency", currency: "GBP" }).format(item?.price)}
               </AppText> */}
            </View>
         </Pressable>
      </Link>
   );
}
