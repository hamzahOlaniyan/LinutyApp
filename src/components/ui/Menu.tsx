import { appColors } from "@/constant/colors";
import React, { useEffect, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import AppText from "./AppText";

type MenuProps = {
   options?: string[];
};

export default function Menu({ options }: MenuProps) {
   const [showMenu, setShowMenu] = useState(false);
   const [selected, setSelected] = useState<string | null>(null);

   const scale = useSharedValue(2);
   const opacity = useSharedValue(0);

   useEffect(() => {
      if (showMenu) {
         // animate in
         scale.value = withSpring(1, { damping: 15 });
         opacity.value = withTiming(1);
      } else {
         // animate out
         scale.value = withTiming(0.9);
         opacity.value = withTiming(0);
      }
   }, [showMenu]);

   const animatedStyle = useAnimatedStyle(() => {
      return {
         opacity: opacity.value,
         transform: [{ scale: scale.value }],
      };
   });

   const selectClan = ["none", "yellow", "black", "white", "pink"];

   const handleSelected = (opt: string) => {
      if (opt === "none") {
         setSelected(null);
         setShowMenu(false);
         return;
      }
      setSelected(opt);
      setShowMenu(false);
   };

   return (
      <View className="w-full relative">
         <View className="flex-row items-center px-2">
            {selected && (
               <View className="p-2">
                  <AppText cap="capitalize">{selected}</AppText>
               </View>
            )}
            <Pressable onPress={() => setShowMenu(!showMenu)} className="">
               <AppText>filter icon here</AppText>
            </Pressable>
         </View>

         {showMenu && (
            <Animated.View
               style={[{ borderWidth: 1, borderRadius: 6, borderColor: appColors.bordersLight }, animatedStyle]}
               className="absolute -left-20 top-10 bg-white elevation-xl rounded-lg shadow-lg w-64"
            >
               <View style={{ borderBottomColor: appColors.bordersLight, borderBottomWidth: 1 }} className="p-4 py-2">
                  <AppText color={appColors.grey}>Select clan</AppText>
               </View>
               {selectClan?.map((opt, idx) => (
                  <TouchableOpacity key={idx} className="p-4" onPress={() => handleSelected(opt)}>
                     <AppText cap="capitalize">{opt}</AppText>
                  </TouchableOpacity>
               ))}
            </Animated.View>
         )}
      </View>
   );
}
