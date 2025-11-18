import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
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
         style={{ backgroundColor: appColors.white, flex: 1, paddingBottom: 2000 }}
      >
         <View style={{ paddingHorizontal: wp(3), gap: 8 }}>
            <AppText size="xxxl" weight="semi">
               {item.title}
            </AppText>
            <View className="flex-row justify-between">
               <View>
                  <AppText cap="capitalize">{item.creator}</AppText>
                  <AppText cap="capitalize">{item.source_name}</AppText>
               </View>
               <View>
                  <AppText cap="capitalize" align="right">
                     {item.category}
                  </AppText>
                  <AppText cap="capitalize">{dayjs(item?.pubDate).format("ddd DD MMM YYYY")}</AppText>
               </View>
            </View>
         </View>

         <Image
            source={{ uri: item?.image_url }}
            style={{
               marginVertical: 20,
               width: screenWidth,
               height: screenWidth,
               backgroundColor: "yellow",
            }}
         />

         <View style={{ paddingHorizontal: wp(3), gap: 8 }}>
            <AppText size="lg">{item?.description}</AppText>
            <AppText size="sm" color={appColors.lightGrey}>
               {item?.source_url.replace(/^https?:\/\//, "")}
            </AppText>
            <TouchableOpacity
               onPress={() => handlePress(item.link)}
               style={{ borderWidth: 1, borderRadius: 100, paddingHorizontal: 20, padding: 6 }}
               className="w-fit"
            >
               <AppText>Complete article</AppText>
            </TouchableOpacity>
         </View>

         {/* <View className="flex-1 gap-1">
            <AppText weight="semi">{item?.title}</AppText>
            <View className="flex-row justify-between">
               <AppText size="sm" color={appColors.lightGrey} align="right">
                  {dayjs(item?.pubDate).format("ddd DD MMM YYYY")}
               </AppText>
            </View>
         </View> */}
      </ScrollView>
   );
}
