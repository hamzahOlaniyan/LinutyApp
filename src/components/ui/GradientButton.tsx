import { hp } from "@/src/constant/common";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { TiktokFont } from "@/assets/fonts/FontFamily";

type ButtonProps = {
   text?: React.ReactNode;
   onPress?: () => void;
   isLoading?: boolean;
   className?: string;
   disabled?: boolean;
   size?: "lg" | "md" | "sm" | "xs";
};

export default function GradientButton({ text, onPress, isLoading = false, disabled, size = "md" }: ButtonProps) {
   return (
      <>
         <LinearGradient
            colors={appColors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            dither={true}
            style={{
               borderRadius: 100,
               shadowColor: "#000",
               shadowOffset: {
                  width: 0,
                  height: 3,
               },
               shadowOpacity: 0.25,
               shadowRadius: 6,
               elevation: 0.3,
            }}
         >
            <TouchableOpacity
               style={{
                  borderRadius: 100,
                  justifyContent: "center",
                  paddingHorizontal: 16,
                  height:
                     size === "lg"
                        ? hp(5.6)
                        : size === "md"
                        ? hp(5)
                        : size === "sm"
                        ? hp(4.5)
                        : size === "xs"
                        ? hp(4)
                        : hp(5),
               }}
               onPress={onPress}
               disabled={disabled}
               activeOpacity={0.9}
            >
               {isLoading ? (
                  <ActivityIndicator color="white" size={"small"} />
               ) : (
                  <Text
                     style={{
                        fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.6) : size === "xs" ? hp(1.3) : hp(1.6),
                        color: "white",
                        textAlign: "center",
                        fontFamily: TiktokFont.TiktokRegular,
                     }}
                  >
                     {text}
                  </Text>
               )}
            </TouchableOpacity>
         </LinearGradient>
      </>
   );
}
