import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function NewsSkeleton() {
   const skeleton = Array.from({ length: 8 }, (_, i) => (
      <View key={i} className="bg-white">
         <Animated.View className="animate-pulse duration-[100ms] ">
            <View className="flex-row gap-4 p-4">
               <View className="w-20 h-20 bg-neutral-100 rounded-lg"></View>
               <View className="gap-4 w-[80%]">
                  <View className="w-20 h-5 bg-neutral-100 rounded-md"></View>
                  <View className="gap-2">
                     <View className="w-full h-4 bg-neutral-100 rounded-md"></View>
                     <View className="w-full h-4 bg-neutral-100 rounded-md"></View>
                  </View>
               </View>
            </View>
         </Animated.View>
      </View>
   ));

   return <View style={{ gap: 12 }}>{skeleton}</View>;
}
