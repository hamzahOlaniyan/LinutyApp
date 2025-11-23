import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, Linking, ScrollView, TouchableOpacity, View } from "react-native";

export default function NewDetail() {
   const params = useLocalSearchParams<{
      id: string;
      item?: string;
   }>();

   const { width: screenWidth } = Dimensions.get("screen");

   const item = params.item ? JSON.parse(params.item) : null;

   const handlePress = async (url: string) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
         await Linking.openURL(url);
      } else {
         console.warn("Don't know how to open this URL:", url);
      }
   };

   return (
      <ScrollView
         scrollEnabled={true}
         showsVerticalScrollIndicator={false}
         style={{ backgroundColor: appColors.white }}
      >
         <View style={{ paddingHorizontal: wp(4), gap: 4 }}>
            <View className="flex-row justify-between">
               <AppText color={appColors.lightGrey} size="xs" cap="capitalize">
                  {item?.category}
               </AppText>
               <AppText size="xs" cap="capitalize" color={appColors.lightGrey}>
                  {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
               </AppText>
            </View>
            <AppText size="xl" weight="semi">
               {item.title}
            </AppText>
            <AppText size="sm" color={appColors.lightGrey}>
               {item?.source_url.replace(/^https?:\/\//, "")}
            </AppText>
         </View>

         <Image
            source={{ uri: item?.image_url }}
            style={{
               marginVertical: 10,
               width: screenWidth,
               height: screenWidth,
            }}
            contentFit="cover"
         />
         <View style={{ paddingHorizontal: wp(4), gap: 8, paddingBottom: 100 }}>
            <View className=" flex-1 justify-between">
               <View className="flex-row gap-1">
                  <AppText size="xs" cap="capitalize">
                     Written by:
                  </AppText>
                  <AppText size="xs" color={appColors.lightGrey} cap="capitalize">
                     {item?.creator}
                  </AppText>
               </View>
               <View className="flex-row gap-1">
                  <AppText size="xs" cap="capitalize">
                     Source:
                  </AppText>
                  <AppText size="xs" color={appColors.lightGrey} cap="capitalize">
                     {item?.source_name}
                  </AppText>
               </View>
            </View>
            <View className="mt-4 gap-4">
               <AppText>{item?.description}</AppText>
               <TouchableOpacity onPress={() => handlePress(item.link)} className="w-fit">
                  <AppText weight="med" color={appColors.blue}>
                     {` Complete article >`}
                  </AppText>
               </TouchableOpacity>
            </View>
         </View>
      </ScrollView>
   );
}
