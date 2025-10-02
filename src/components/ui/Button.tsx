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
   variant?: "outline" | "plain" | "secondary";
   indicatorColor?: string;
   icon?: React.ReactNode;
};

export default function Button({
   text,
   children,
   onPress,
   isLoading = false,
   className,
   disabled,
   size = "md",
   variant,
   indicatorColor,
   icon,
}: ButtonProps) {
   return (
      <TouchableOpacity
         className={`${className}`}
         style={{
            borderRadius: 100,
            justifyContent: "center",
            paddingHorizontal:
               size === "lg" ? 18 : size === "md" ? 16 : size === "sm" ? 12 : size === "xs" ? 10 : hp(5),
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
               variant === "outline"
                  ? "transparent"
                  : variant === "plain"
                  ? "transparent"
                  : variant === "secondary"
                  ? appColors.searchBar
                  : appColors.lightOlive,
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
      >
         {isLoading ? (
            <ActivityIndicator color={indicatorColor} size={"small"} />
         ) : (
            <View className="flex-row justify-center items-center gap-2">
               {icon && icon}
               {text && (
                  <Text
                     style={{
                        fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.6) : size === "xs" ? hp(1.3) : hp(1.6),
                        textAlign: "center",
                        fontFamily: TiktokFont.TiktokSemiBold,
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
