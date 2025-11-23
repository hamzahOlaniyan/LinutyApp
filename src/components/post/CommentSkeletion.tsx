import { Animated, View } from "react-native";

export default function CommentSkeletion() {
   const skeleton = Array.from({ length: 5 }, (_, i) => (
      <View key={i}>
         <Animated.View className="gap-3 flex-row animate-pulse duration-[100ms] py-4">
            <View className="w-12 h-12 bg-neutral-200 rounded-full"></View>
            <View className="gap-4 w-[80%]">
               <View className="w-20 h-4 bg-neutral-200 rounded-md"></View>
               <View className="gap-2">
                  <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
                  <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
                  <View className="w-full h-3 bg-neutral-200 rounded-md"></View>
               </View>
            </View>
         </Animated.View>
      </View>
   ));

   return <View>{skeleton}</View>;
}
