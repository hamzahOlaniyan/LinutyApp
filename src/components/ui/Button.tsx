import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
   text?: React.ReactNode;
   children?: React.ReactNode;
   onPress?: () => void;
   isLoading?: boolean;
   className?: string;
   disabled?: boolean;
   size?: "lg" | "md" | "sm" | "xs";
   variant?: "outline" | "plain";
   indicatorColor?: string;
};

export default function Button({
   text,
   children,
   onPress,
   isLoading = false,
   // className,
   disabled,
   size = "md",
   variant,
   indicatorColor,
}: ButtonProps) {
   return (
      <TouchableOpacity
         style={{
            borderRadius: 100,
            justifyContent: "center",
            paddingHorizontal: size === "lg" ? 18 : size === "md" ? 16 : size === "sm" ? 12 : size === "xs" ? 8 : hp(5),
            shadowColor: "#000",
            shadowOffset: {
               width: 0,
               height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 0.3,
            borderWidth: variant === "outline" ? 1.2 : 0,
            borderColor: appColors.buttonOutline,
            backgroundColor:
               variant === "outline" ? "transparent" : variant === "plain" ? "transparent" : appColors.lightOlive,
            height:
               size === "lg"
                  ? hp(5.6)
                  : size === "md"
                  ? hp(5)
                  : size === "sm"
                  ? hp(4.5)
                  : size === "xs"
                  ? hp(3.7)
                  : hp(5),
         }}
         onPress={onPress}
         disabled={disabled}
         // activeOpacity={0.9}
      >
         {isLoading ? (
            <ActivityIndicator color={indicatorColor} size={"small"} />
         ) : (
            <View className="justify-center items-center">
               {children && children}
               {text && (
                  <Text
                     style={{
                        fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.6) : size === "xs" ? hp(1.3) : hp(1.6),
                        color: appColors.buttonOutline,
                        textAlign: "center",
                        fontFamily: TiktokFont.TiktokRegular,
                     }}
                  >
                     {text}
                  </Text>
               )}
            </View>
         )}
      </TouchableOpacity>
   );
}
