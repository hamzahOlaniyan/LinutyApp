import { Font } from "@/assets/fonts/FontFamily";

import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import React, { FC, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import AppText from "./AppText";

type InputProps = TextInputProps & {
   label?: string;
   error?: boolean;
   errorMessage?: string;
};

export const InputArea: FC<InputProps> = ({ label, error, errorMessage, ...props }) => {
   const [isFocused, setIsFocused] = useState(false);

   return (
      <View
         style={{
            borderWidth: 0,
            borderRadius: 10,
            height: hp(20),
            padding: 10,
            backgroundColor: appColors.offWhite,
         }}
      >
         <TextInput
            style={{
               fontSize: hp(2),
               fontFamily: Font.Regular,
            }}
            placeholderTextColor={appColors.placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            multiline
            {...props}
         />

         {error && errorMessage ? (
            <AppText color={appColors.error} size="sm">
               {errorMessage}
            </AppText>
         ) : null}
      </View>
   );
};
