import { appColors } from "@/constant/colors";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../ui/AppText";

export default function NewsCard({ item }: { item: any }) {
   const router = useRouter();

   return (
      <Pressable
         onPress={() =>
            router.push({
               pathname: `/news/${item?.article_id}` as any,
               params: {
                  item: JSON.stringify(item),
               },
            })
         }
         style={{ paddingVertical: 10, borderBottomColor: appColors.bordersLight, borderBottomWidth: 1 }}
         className="flex-row flex-1 items-center gap-3"
      >
         <Image
            source={{ uri: item?.image_url }}
            style={{ width: 100, height: 100, borderRadius: 6 }}
            contentFit="cover"
         />
         <View className="flex-1 gap-1">
            <View className="flex-row justify-between">
               {item?.category.map((cat: string) => (
                  <AppText key={cat} size="xxs" color={appColors.lightGrey} cap="capitalize">
                     {cat}
                  </AppText>
               ))}
               <AppText size="xxs" color={appColors.lightGrey} align="right">
                  {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
               </AppText>
            </View>
            <AppText size="sm" weight="med">
               {item?.title.substring(0, 100)}...
            </AppText>
            <View className="flex-row justify-between">
               <AppText size="xxs" color={appColors.lightGrey}>
                  {item?.source_name}
               </AppText>
            </View>
            <AppText size="xxs" color={appColors.lightGrey}>
               {item?.source_url.replace(/^https?:\/\//, "")}
            </AppText>
         </View>
      </Pressable>
   );
}
