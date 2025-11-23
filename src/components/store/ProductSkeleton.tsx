import React from "react";
import { Animated, Dimensions, View } from "react-native";

export default function ProductSkeleton() {
   const { width: screenWidth } = Dimensions.get("screen");

   return (
      <Animated.View className="flex-1 animate-pulse duration-[100ms]">
         <View style={{ width: screenWidth, height: screenWidth }} className="w-12 h-12 bg-neutral-200"></View>
         <View className="gap-4">
            <View className="w-20 h-4 bg-neutral-100 rounded-md"></View>
            <View className="gap-4 p-4">
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
            </View>
            <View className="gap-4 p-4">
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
            </View>
            <View className="gap-4 p-4">
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
            </View>
         </View>
      </Animated.View>
   );
}
