import { TiktokFont } from "@/src/assets/fonts/FontFamily";
import { colors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
   icon?: React.ReactNode;
   label?: string;
   isPassword?: boolean;
};

export const Input: FC<InputProps> = ({ isPassword, icon, label, ...props }) => {
   const [isFocused, setIsFocused] = useState(false);
   const [showPassword, setShowPassword] = useState(true);

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
         <View className={`${label ? "gap-1" : "gap-0"}`}>
            {label && (
               <Text style={{ fontSize: hp(1.7) }} className="text-text font-SansMed capitalize">
                  {label}
               </Text>
            )}

            <View
               style={{ height: hp(7) }}
               className={`w-full flex-row items-center justify-center border p-4 rounded-2xl border-neutral-200 gap-2 ${
                  isFocused && "border-neutral-500"
               }`}
            >
               {icon && <View className="relative top-[1px]">{icon}</View>}
               <TextInput
                  style={{ fontSize: hp(2), fontFamily: TiktokFont.TiktokMedium }}
                  className="flex-1  p-0 m-0 h-full"
                  placeholderTextColor={"#a3a3a3"}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoCapitalize="none"
                  {...props}
                  selectionColor={"#38704f"}
                  selectionHandleColor={"#38704f"}
                  secureTextEntry={isPassword && showPassword}
               />
               {isPassword && (
                  <View>
                     <Ionicons
                        onPress={() => setShowPassword(!showPassword)}
                        name={showPassword ? "eye" : "eye-off"}
                        size={24}
                        color={colors.gray}
                     />
                  </View>
               )}
            </View>
         </View>
      </KeyboardAvoidingView>
   );
};
