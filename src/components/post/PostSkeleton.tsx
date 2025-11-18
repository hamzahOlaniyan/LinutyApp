import { appColors } from "@/src/constant/colors";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function PostSkeleton() {
   const skeleton = Array.from({ length: 2 }, (_, i) => (
      <View key={i} className="bg-white">
         <Animated.View className="animate-pulse duration-[100ms] ">
            <View className="flex-row gap-4 p-4">
               <View className="w-12 h-12 bg-neutral-200 rounded-full"></View>
               <View className="gap-4 w-[80%]">
                  <View className="w-20 h-5 bg-neutral-200 rounded-md"></View>
                  <View className="gap-2">
                     <View className="w-full h-4 bg-neutral-200 rounded-md"></View>
                     <View className="w-full h-4 bg-neutral-200 rounded-md"></View>
                  </View>
               </View>
            </View>
            <View className="w-full h-96 bg-neutral-200 rounded-md"></View>
            <View className="flex-row mt-4 gap-2 justify-around py-6">
               <View className="w-[60px] h-4 bg-neutral-200 rounded-md"></View>
               <View className="w-[60px] h-4 bg-neutral-200 rounded-md"></View>
               <View className="w-[60px] h-4 bg-neutral-200 rounded-md"></View>
            </View>
         </Animated.View>
      </View>
   ));

   return <View style={{ backgroundColor: appColors.extralightOlive, gap: 12 }}>{skeleton}</View>;
}
