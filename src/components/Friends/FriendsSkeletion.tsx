import { Animated, View } from "react-native";

export default function FriendsSkeletion() {
   const skeleton = Array.from({ length: 7 }, (_, i) => (
      <View key={i}>
         <Animated.View className="gap-3 flex-1 flex-row justify-between items-center animate-pulse duration-[100ms] py-4">
            <View className="flex-row justify-between items-center gap-4">
               <View style={{ width: 60, height: 60 }} className="bg-neutral-100 rounded-full"></View>
               <View className="gap-4 ">
                  <View className="w-36 h-6 bg-neutral-100 rounded-full"></View>
                  <View className="gap-2">
                     <View className="w-12 h-3 bg-neutral-100 rounded-md"></View>
                  </View>
               </View>
            </View>
            <View className="w-32 h-12 bg-neutral-100 rounded-full"></View>
         </Animated.View>
      </View>
   ));

   return <View>{skeleton}</View>;
}
