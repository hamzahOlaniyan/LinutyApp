// import { useThemeStore } from "@/context/themeStore";
import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { Feather, Fontisto } from "@expo/vector-icons";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

type SearchProps = TextInputProps & {
   onPress?: () => void;
   placeholder?: string;
};

export default function Searchbar({ value, onChangeText, onPress, placeholder, ...rest }: SearchProps) {
   // const { currentTheme } = useThemeStore();

   return (
      <View
         style={{
            height: hp(5.5),
            backgroundColor: appColors.searchBar,
            borderWidth: 1,
            borderColor: appColors.searchBorder,
         }}
         className={`w-full flex-row bg-offwightGreen items-center justify-center px-4 rounded-full gap-3`}
      >
         <Feather name="search" size={20} />
         <TextInput
            value={value}
            onChangeText={onChangeText}
            style={{ fontSize: hp(1.9), fontFamily: TiktokFont.TiktokRegular }}
            className="flex-1 h-full"
            placeholder={placeholder}
            placeholderTextColor={appColors.placeholder}
            autoCapitalize="none"
            {...rest}
         />
         {value && <Fontisto name="close-a" size={15} onPress={onPress} />}
      </View>
   );
}
