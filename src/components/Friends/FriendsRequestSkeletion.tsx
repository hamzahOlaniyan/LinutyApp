import { Animated, View } from "react-native";

export default function FriendsRequestSkeletion() {
   const skeleton = Array.from({ length: 4 }, (_, i) => (
      <Animated.View
         key={i}
         className="gap-3 flex-1 flex-row justify-between items-center animate-pulse duration-[100ms] py-4 px-5"
      >
         <View className="flex-row justify-between items-center gap-4">
            <View style={{ width: 100, height: 100 }} className="bg-neutral-100 rounded-full"></View>
            <View className="gap-4 w-full flex-1 ">
               <View className="w-36 h-6 bg-neutral-100 rounded-full"></View>
               <View className="gap-2">
                  <View className="w-12 h-3 bg-neutral-100 rounded-md"></View>
               </View>
               <View className="flex-row gap-4">
                  <View className="flex-1 h-12 bg-neutral-100 rounded-full"></View>
                  <View className="flex-1 h-12 bg-neutral-100 rounded-full"></View>
               </View>
            </View>
         </View>
      </Animated.View>
   ));

   return <View>{skeleton}</View>;
}
