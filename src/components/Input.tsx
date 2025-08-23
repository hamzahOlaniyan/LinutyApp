import { TiktokFont } from "@/assets/fonts/FontFamily";
import { colors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TextInputProps, View } from "react-native";
import AppText from "./AppText";

type InputProps = TextInputProps & {
   icon?: React.ReactNode;
   label?: string;
   isPassword?: boolean;
   error?: boolean;
   errorMessage?: string;
   clearValue?: boolean;
   [key: string]: any;
};

export const Input: FC<InputProps> = ({ isPassword, icon, label, error, errorMessage, clearValue, ...props }) => {
   const [isFocused, setIsFocused] = useState(false);
   const [showPassword, setShowPassword] = useState(true);

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
         <View className={`${label ? "gap-1" : "gap-0"} gap-2`}>
            {label && (
               <Text style={{ fontSize: hp(1.7) }} className="text-text font-SansMed capitalize">
                  {label}
               </Text>
            )}

            <View
               style={{
                  height: hp(7),
                  borderWidth: 1,
                  marginBottom: 3,
                  borderColor: isFocused ? colors.inputActive : error ? colors.error : colors.inputInactive,
                  borderRadius: 15,
               }}
               className={`w-full flex-row items-center justify-center p-4 gap-2 `}
            >
               {icon && <View className="relative top-[1px]">{icon}</View>}
               <TextInput
                  style={{ fontSize: hp(2), fontFamily: TiktokFont.TiktokMedium }}
                  className="flex-1  p-0 m-0 h-full"
                  placeholderTextColor={`${colors.placeholder}`}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  {...props}
                  selectionColor={colors.primary}
                  selectionHandleColor={colors.primary}
                  secureTextEntry={isPassword && showPassword}
               />
               {/* {clearValue && <Fontisto name="close-a" size={20} color="#a3a3a3" onPress={() => setResetValue("")} />} */}
               {isPassword && (
                  <View>
                     <Ionicons
                        onPress={() => setShowPassword(!showPassword)}
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color={colors.inputActive}
                     />
                  </View>
               )}
            </View>
            {error && errorMessage ? (
               <AppText color={colors.error} size="sm">
                  {errorMessage}
               </AppText>
            ) : null}
         </View>
      </KeyboardAvoidingView>
   );
};
