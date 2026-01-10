import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../AppText";
import LSeachBar from "../LSeachBar";
import { ModalBottomSheet } from "../ModalBottomSheet";
import { SelectButtonProps } from "./type";

export default function Select({
  options = [],
  onSelect,
  placeholder = "Select option",
  modalTitle,
  label,
  error,
  errorMessage,
  selectedValue,
  snapPoints,
  snap,
  searchable = false
}: SelectButtonProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (typeof selectedValue !== "undefined") {
      setSelected(selectedValue ?? null);
    }
  }, [selectedValue]);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    handleClosePress();
  };

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{ paddingVertical: 12 }}
      >
        <AppText>{item}</AppText>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View className="h-full flex-1 gap-2">
      {label && <AppText variant={"title"}>{label}</AppText>}
      <View>
        <TouchableOpacity
          onPress={() => handleSnapPress(Number(snap ?? null))}
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

      {/* MODEL BOTTOMSHEET */}
      <Portal hostName="root">
        <ModalBottomSheet
          ref={bottomSheetRef}
          title={modalTitle}
          snapPoints={snapPoints}
          children={
            <View
              style={{
                paddingHorizontal: wp(3),
                marginBottom: bottom,
                gap: 12
              }}
            >
              {searchable && (
                <LSeachBar
                  placeholder="search"
                  searchBarValue={text => setSearchText(text)}
                />
              )}
              <BottomSheetFlatList
                data={options?.filter(o =>
                  o.toLowerCase().includes(searchText.toLowerCase())
                )}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
              />
            </View>
          }
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 200
  }
});
