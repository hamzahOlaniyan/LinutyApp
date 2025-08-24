import { hp } from "@/src/constant/common";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { TiktokFont } from "@/assets/fonts/FontFamily";
import { colors } from "../constant/colors";

type ButtonProps = {
   text?: React.ReactNode;
   onPress?: () => void;
   isLoading?: boolean;
   className?: string;
   disabled?: boolean;
   size?: "lg" | "md" | "sm" | "xs";
   variant?: "default" | "outline" | "plain";
   indicatorColor?: string;
};

export default function GradientButton({
   text,
   onPress,
   isLoading = false,
   className,
   disabled,
   size = "md",
   variant = "default",
   indicatorColor,
}: ButtonProps) {
   return (
      <>
         {variant === "default" && (
            <LinearGradient
               colors={colors.gradients.primary}
               start={{ x: 0, y: 0 }}
               end={{ x: 1.2, y: 0 }}
               style={{
                  borderRadius: 100,
               }}
            >
               <TouchableOpacity
                  style={{
                     borderRadius: 100,
                     justifyContent: "center",
                     // backgroundColor: variant === "outline" ? "white" : "transparent",
                     paddingHorizontal: 16,
                     // borderWidth: variant === "outline" ? 1 : 0,
                     borderColor: "#48BE9A",
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
                     <ActivityIndicator color={indicatorColor} size={"small"} />
                  ) : (
                     <Text
                        style={{
                           fontSize:
                              size === "lg" ? hp(1.9) : size === "sm" ? hp(1.6) : size === "xs" ? hp(1.3) : hp(1.6),
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
         )}
      </>
   );
}
