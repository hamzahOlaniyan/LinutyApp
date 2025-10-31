import { TiktokFont } from "@/assets/fonts/FontFamily";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import React from "react";
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";

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
   style?: StyleProp<ViewStyle>;
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
   style,
}: ButtonProps) {
   return (
      <TouchableOpacity
         className={`${className}`}
         style={[
            style,
            {
               borderRadius: 100,
               justifyContent: "center",
               paddingHorizontal:
                  size === "lg" ? 18 : size === "md" ? 16 : size === "sm" ? 12 : size === "xs" ? 10 : hp(5),
               borderWidth: variant === "outline" || "secondary" ? 1.5 : variant === "plain" ? 0 : 0,
               borderColor: variant === "secondary" ? appColors.grey : appColors.black,
               backgroundColor:
                  variant === "outline"
                     ? "transparent"
                     : variant === "plain"
                     ? "transparent"
                     : variant === "secondary"
                     ? appColors.dark_whitesmoke
                     : appColors.black,
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
            },
         ]}
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
                        fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.5) : size === "xs" ? hp(1.3) : hp(1.7),
                        textAlign: "center",
                        fontFamily: TiktokFont.TiktokMedium,
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
