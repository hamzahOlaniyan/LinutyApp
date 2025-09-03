import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
   Actionsheet,
   ActionsheetBackdrop,
   ActionsheetContent,
   ActionsheetDragIndicator,
   ActionsheetDragIndicatorWrapper,
} from "./actionsheet";
import AppText from "./AppText";
import Searchbar from "./Searchbar";

interface SelectButtonProps {
   options: string[] | [] | null;
   onSelect: (value: any) => void;
   placeholder: string;
   modalTitle?: string;
   label?: string;
   height?: number;
   error?: boolean;
   errorMessage?: string;
   [key: string]: any;
   searchable?: boolean;
   selectedValue?: any;
}

export default function Select({
   options = [],
   onSelect,
   placeholder = "Select option",
   modalTitle,
   label,
   height = 50,
   error,
   errorMessage,
   selectedValue,
   searchable = false,
}: SelectButtonProps) {
   const [selected, setSelected] = useState<string | null>(null);
   const [showActionsheet, setShowActionsheet] = React.useState(false);
   const [searchText, setSearchText] = useState("");
   const [isFocused, setIsFocused] = useState(false);

   const handleClose = () => setShowActionsheet(false);

   const { bottom } = useSafeAreaInsets();

   useEffect(() => {
      if (typeof selectedValue !== "undefined") {
         setSelected(selectedValue ?? null);
      }
   }, [selectedValue]);

   const handleSelect = (option: string) => {
      setSelected(option);
      onSelect(option);
      setShowActionsheet(false);
   };

   return (
      <View className="flex-1 h-full">
         {label && (
            <Text style={{ fontSize: hp(1.7) }} className="text-text font-SansMed capitalize">
               {label}
            </Text>
         )}
         <View>
            <TouchableOpacity
               onPress={() => setShowActionsheet(true)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               style={{
                  height: hp(7),
                  padding: 10,
                  borderWidth: 1,
                  marginBottom: 3,
                  borderColor: isFocused ? appColors.inputActive : error ? appColors.error : appColors.placeholder,
               }}
               className="w-full flex-row justify-between items-center rounded-2xl"
            >
               {selected ? (
                  <AppText weight="med" size="lg" cap="capitalize">
                     {selected}
                  </AppText>
               ) : (
                  <AppText weight="med" size="md" cap="capitalize" color={appColors.placeholder}>
                     {placeholder}
                  </AppText>
               )}
               <MaterialCommunityIcons name="chevron-down" size={26} color={appColors.placeholder} />
            </TouchableOpacity>
            {error && errorMessage ? (
               <AppText color={appColors.error} size="sm">
                  {errorMessage}
               </AppText>
            ) : null}
         </View>
         <Actionsheet isOpen={showActionsheet} onClose={handleClose} preventScroll={true} snapPoints={[height]}>
            <ActionsheetBackdrop />
            <ActionsheetContent>
               <ActionsheetDragIndicatorWrapper>
                  <ActionsheetDragIndicator />
               </ActionsheetDragIndicatorWrapper>
               <View style={{ marginBottom: bottom }} className="flex-1 w-full overflow-hidden">
                  <View className="py-5 gap-3">
                     {modalTitle && (
                        <AppText weight="semi" align="center" size="lg" className="font-SansBold text-center">
                           {modalTitle}
                        </AppText>
                     )}

                     {searchable && (
                        <Searchbar value={searchText} onChangeText={setSearchText} onPress={() => setSearchText("")} />
                     )}
                  </View>
                  <Pressable onPress={handleClose}>
                     <FlatList
                        data={options?.filter((search) => search.toLowerCase().includes(searchText.toLowerCase()))}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                           <TouchableOpacity onPress={() => handleSelect(item)} style={{ paddingVertical: 12 }}>
                              <AppText size="lg" weight="med">
                                 {item}
                              </AppText>
                           </TouchableOpacity>
                        )}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                     />
                  </Pressable>
               </View>
            </ActionsheetContent>
         </Actionsheet>
      </View>
   );
}
