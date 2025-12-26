import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";
import LSeachBar from "./LSeachBar";
import { ModalBottomSheet } from "./ModalBottomSheet";

interface SelectButtonProps {
  options: string[] | [] | null;
  onSelect: (value: string) => void;
  placeholder: string;
  modalTitle?: string;
  label?: string;
  height?: number;
  error?: boolean;
  errorMessage?: string;
  searchable?: boolean;
  selectedValue?: string;
}

export default function Select({
  options = [],
  onSelect,
  placeholder = "Select option",
  modalTitle,
  label,
  error,
  errorMessage,
  selectedValue,
  searchable = false
}: SelectButtonProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.expand();
  const handleCloseSheet = () => bottomSheetRef.current?.close();

  useEffect(() => {
    if (typeof selectedValue !== "undefined") {
      setSelected(selectedValue ?? null);
    }
  }, [selectedValue]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    handleCloseSheet();
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  return (
    <View className="h-full flex-1 gap-2">
      {label && <AppText>{label}</AppText>}
      <View>
        <TouchableOpacity
          onPress={() => handleOpenSheet()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            height: hp(7),
            padding: 10,
            borderWidth: 0.9,
            borderColor: isFocused
              ? appColors.inputInactive
              : error
                ? appColors.error
                : appColors.inputInactive,
            borderRadius: 15
          }}
          className="w-full flex-row items-center justify-between rounded-2xl"
        >
          {selected ? (
            <AppText>{selected}</AppText>
          ) : (
            <AppText color={appColors.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={26}
            color={appColors.placeholder}
          />
        </TouchableOpacity>
        {error && errorMessage ? (
          <AppText color={appColors.error}>{errorMessage}</AppText>
        ) : null}
      </View>
      {/* <Portal hostName="root"> */}
      <ModalBottomSheet
        ref={bottomSheetRef}
        title={modalTitle}
        children={
          <View style={{ paddingHorizontal: wp(3) }}>
            {searchable && (
              <LSeachBar
                placeholder="search"
                searchBarValue={text => setSearchText(text)}
              />
            )}
            {/* <Pressable onPress={handleCloseSheet}> */}
            <FlatList
              data={options?.filter(search =>
                search.toLowerCase().includes(searchText.toLowerCase())
              )}
              scrollEnabled
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={{ paddingVertical: 12 }}
                >
                  <AppText>{item}</AppText>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            />
            {/* </Pressable> */}
          </View>
        }
      />
    </View>
  );
}
