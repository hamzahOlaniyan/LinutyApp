import React from "react";
import { Animated, Dimensions, View } from "react-native";

export default function Indicator({ item, scrollX }: { item: any; scrollX: any }) {
   const { width } = Dimensions.get("window");

   return (
      <View className="flex-row rounded-full p-1 px-2 bg-black/30 absolute bottom-10 left-1/2 -translate-x-1/2">
         {item?.map((_: any, idx: number) => {
            const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

            const opacity = scrollX.interpolate({
               inputRange,
               outputRange: [0.5, 1, 0.5],
               extrapolate: "clamp",
            });

            const scale = scrollX.interpolate({
               inputRange,
               outputRange: [0.5, 0.8, 0.5],
               extrapolate: "clamp",
            });
            return (
               <Animated.View
                  key={idx}
                  style={[
                     {
                        opacity,
                        transform: [{ scale }],
                     },
                  ]}
                  className="w-4 h-4 bg-white rounded-full z-50"
               />
            );
         })}
      </View>
   );
}
