import React from "react";
import { View } from "react-native";

export default function CommentSkeletion() {
   return (
      <View className="gap-3 flex-row animate-pulse">
         <View className="w-12 h-12 bg-neutral-100 rounded-full"></View>
         <View className="gap-2 w-[80%]">
            <View className="w-20 h-4 bg-neutral-100 rounded-md"></View>
            <View className="w-full h-4 bg-neutral-100 rounded-md"></View>
            <View className="w-full h-4 bg-neutral-100 rounded-md"></View>
            <View className="w-full h-4 bg-neutral-100 rounded-md"></View>
            <View className="w-full h-4 bg-neutral-100 rounded-md"></View>
         </View>
      </View>
   );
}
