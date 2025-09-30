import { appColors } from "@/src/constant/colors";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function PostSkeleton() {
   const skeleton = Array.from({ length: 6 }, (_, i) => (
      <View key={i} className="bg-white mb-2">
         <Animated.View className="gap-3 flex-row animate-pulse duration-[100ms] p-5 py-8">
            <View className="w-12 h-12 bg-neutral-100 rounded-full"></View>
            <View className="gap-4 w-[80%]">
               <View className="w-20 h-4 bg-neutral-100 rounded-md"></View>
               <View className="gap-2">
                  <View className="w-full h-3 bg-neutral-100 rounded-md"></View>
                  <View className="w-full h-3 bg-neutral-100 rounded-md"></View>
                  <View className="w-full h-3 bg-neutral-100 rounded-md"></View>
               </View>
            </View>
         </Animated.View>
      </View>
   ));

   return (
      <View>
         <View className="bg-white">
            <Animated.View className="flex-row justify-between items-center px-4 w-full animate-pulse duration-[100ms]">
               <View className="w-24 h-10 bg-neutral-100 rounded-full"></View>
               <View className="flex-row items-center gap-4 py-3">
                  <View className="w-6 h-6 bg-neutral-100 rounded-full"></View>
                  <View className="w-6 h-6 bg-neutral-100 rounded-full"></View>
                  <View className="w-8 h-8 bg-neutral-100 rounded-full"></View>
               </View>
            </Animated.View>
         </View>
         <View style={{ backgroundColor: appColors.extralightOlive }}>{skeleton}</View>
      </View>
   );
}
