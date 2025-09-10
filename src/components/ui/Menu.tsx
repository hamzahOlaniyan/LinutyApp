import { FilterIcon } from "@/assets/icons/filter";
import { appColors } from "@/src/constant/colors";
import React, { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

type MenuProps = {
   options?: string[];
};

export default function Menu({ options }: MenuProps) {
   const [showMenu, setShowMenu] = useState(false);
   const [selected, setSelected] = useState<string | null>(null);

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
         <View
            // style={{ borderWidth: 0.5, borderRadius: 6, borderColor: appColors.black }}
            className="flex-row items-center px-2"
         >
            {selected && (
               <View className="p-2">
                  <AppText cap="capitalize">{selected}</AppText>
               </View>
            )}
            <Pressable onPress={() => setShowMenu(!showMenu)} className="">
               <FilterIcon />
            </Pressable>
         </View>

         {showMenu && (
            // <View className="bg-black h-full w-full absolute top-0 left-0 right-0">
            <View
               style={{ borderWidth: 1, borderRadius: 6, borderColor: appColors.bordersLight }}
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
            </View>
            // </View>
         )}
      </View>
   );
}
