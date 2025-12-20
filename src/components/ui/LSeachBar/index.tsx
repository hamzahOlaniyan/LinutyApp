import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import Icon from "@/icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import AppText from "../AppText";

type SearchBarProps = TextInputProps & {
  onPress?: () => void;
  placeholder?: string;
  searchBarValue?: (text: string) => void;
};

export default function LSeachBar({
  searchBarValue,
  placeholder
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    setValue(text);
    searchBarValue?.(text);
  };

  return (
    <View style={style.container}>
      <Icon name="search2" />
      <TextInput
        value={value}
        onChangeText={text => handleChange(text)}
        style={style.input}
        className="h-full flex-1"
        placeholder={placeholder}
        autoCapitalize="none"
      />
      {value && (
        <AppText className="text-xl" onPress={() => setValue("")}>
          X
        </AppText>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: appColors.border,
    backgroundColor: appColors.white,
    height: hp(6),
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8
  },
  input: {
    // height: "100%",
    fontFamily: Font.Regular
  }
});
