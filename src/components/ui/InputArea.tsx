import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import React, { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
   label?: string;
};

export default function InputArea(props: InputProps) {
   const [isFocused, setIsFocused] = useState(false);

   return (
      <View
         style={{
            borderWidth: 0.9,
            borderColor: isFocused ? appColors.inputActive : appColors.inputInactive,
            borderRadius: 15,
            height: hp(20),
            padding: 10,
         }}
      >
         <TextInput
            style={{
               fontSize: hp(2),
               fontFamily: TiktokFont.TiktokMedium,
            }}
            placeholderTextColor={appColors.placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            multiline
            {...props}
         />
      </View>
   );
}
