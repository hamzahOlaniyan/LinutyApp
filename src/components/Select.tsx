import { colors } from "@/src/constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { hp } from "../constant/common";
import AppText from "./AppText";
import {
   Actionsheet,
   ActionsheetBackdrop,
   ActionsheetContent,
   ActionsheetDragIndicator,
   ActionsheetDragIndicatorWrapper,
} from "./ui/actionsheet";

interface SelectButtonProps {
   options: string[] | [] | null;
   onSelect: (value: string) => void;
   placeholder: string;
   modalTitle?: string;
   selectedValue?: string;
   label?: string;
}

export default function Select({
   options = [],
   onSelect,
   placeholder = "Select option",
   modalTitle,
   selectedValue,
   label,
}: SelectButtonProps) {
   const [selected, setSelected] = useState<string | null>(null);
   const [showActionsheet, setShowActionsheet] = React.useState(false);
   const handleClose = () => setShowActionsheet(false);

   const handleSelect = (option: string) => {
      setSelected(option);
      onSelect(option);
      setShowActionsheet(false);
   };
   return (
      <View className="flex-1">
         {label && (
            <Text style={{ fontSize: hp(1.7) }} className="text-text font-SansMed capitalize">
               {label}
            </Text>
         )}
         <TouchableOpacity
            onPress={() => setShowActionsheet(true)}
            style={{ height: hp(5) }}
            className="flex-1 w-full flex-row justify-between items-center border-b border-neutral-200 bg-red-600"
         >
            {selected ? (
               <AppText weight="semi" size="lg" cap="capitalize">
                  {selected}
               </AppText>
            ) : (
               <AppText weight="semi" size="lg" cap="capitalize">
                  {placeholder}
               </AppText>
            )}
            <MaterialCommunityIcons name="chevron-down" size={26} color={colors.placeholder} />
         </TouchableOpacity>

         <Actionsheet isOpen={showActionsheet} onClose={handleClose} preventScroll={true} snapPoints={[50, 75, 100]}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
               <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
               </ActionsheetDragIndicatorWrapper>
               <View className="flex-1 w-full">
                  <View className="mt-5">
                     <Text style={{ fontSize: hp(2) }} className="font-SansBold text-center">
                        {modalTitle}
                     </Text>
                  </View>
                  <View className="">
                     <Pressable onPress={handleClose}>
                        <FlatList
                           data={options}
                           keyExtractor={(item) => item}
                           renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => handleSelect(item)} style={{ paddingVertical: 12 }}>
                                 <Text style={{ fontSize: hp(2) }} className="font-SansMed capitalize">
                                    {item}
                                 </Text>
                              </TouchableOpacity>
                           )}
                           contentContainerStyle={{ paddingBottom: 100 }}
                        />
                     </Pressable>
                  </View>
               </View>
            </ActionsheetContent>
         </Actionsheet>
      </View>
   );
}
