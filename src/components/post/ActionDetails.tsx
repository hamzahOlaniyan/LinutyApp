import { FavoriteIcon } from "@/assets/icons/FavoriteIcon";
import { ShareIcon } from "@/assets/icons/shareIcon";
import { Thumbsup } from "@/assets/icons/thumbsup";
import React from "react";
import { View } from "react-native";
import AppText from "../ui/AppText";

export default function ActionDetails() {
   return (
      <View className="flex-row items-center">
         <View className="flex-row">
            <View className="w-6 h-6 rounded-full bg-green-300  bg-sky-220 justify-center items-center border-2 border-white">
               <Thumbsup size={12} />
            </View>
            <View className="w-6 h-6 rounded-full bg-red-300 justify-center items-center relative right-2 border-2 border-white">
               <FavoriteIcon size={12} />
            </View>
            <View className="w-6 h-6 rounded-full bg-slate-400 justify-center items-center relative right-4 border-2 border-white ">
               <ShareIcon size={12} />
            </View>
         </View>
         <AppText>129</AppText>
      </View>
   );
}
