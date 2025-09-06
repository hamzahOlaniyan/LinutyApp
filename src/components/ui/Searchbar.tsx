// import { useThemeStore } from "@/src/context/themeStore";
import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { Feather, Fontisto } from "@expo/vector-icons";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

type SearchProps = TextInputProps & {
   onPress?: () => void;
};

export default function Searchbar({ value, onChangeText, onPress, ...rest }: SearchProps) {
   // const { currentTheme } = useThemeStore();

   return (
      <View
         style={{
            height: hp(4.5),
            backgroundColor: appColors.extralightOlive,
         }}
         className={`w-full flex-row bg-offwightGreen items-center justify-center px-4 rounded-full gap-3`}
      >
         <Feather name="search" size={18} color="gray" />
         <TextInput
            value={value}
            onChangeText={onChangeText}
            style={{ fontSize: hp(2), fontFamily: TiktokFont.TiktokRegular }}
            className="flex-1 font-SansReg"
            placeholder="search item"
            placeholderTextColor={appColors.placeholder}
            autoCapitalize="none"
            {...rest}
         />
         {value && <Fontisto name="close-a" size={15} onPress={onPress} />}
      </View>
   );
}
