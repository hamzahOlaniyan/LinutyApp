import { TiktokFont } from "@/assets/fonts/FontFamily";
import { colors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
// import Loading from "./Loading";

type ButtonProps = {
   title?: React.ReactNode;
   onPress?: () => void;
   isLoading?: boolean;
   className?: string;
   disabled?: boolean;
   size?: "lg" | "md" | "sm" | "xs";
   variant?: "default" | "outline" | "plain";
};

export default function Button({
   title,
   onPress,
   isLoading = false,
   className,
   disabled,
   size = "md",
   variant,
}: ButtonProps) {
   return (
      <Pressable
         style={{
            borderRadius: 100,
            width: "100%",
            borderColor: colors.primary,
            borderWidth: variant === "outline" ? 1 : 0,
            justifyContent: "center",
            backgroundColor:
               variant === "outline" ? colors.white : variant === "plain" ? "transparent" : colors.primary,
            height:
               size === "lg"
                  ? hp(5.5)
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
      >
         <Text
            style={{
               fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.5) : size === "xs" ? hp(1.3) : hp(1.7),
               fontFamily: TiktokFont.TiktokMedium,
               color: variant === "outline" ? colors.primary : variant === "plain" ? colors.primary : "white",
               textAlign: "center",
            }}
         >
            {isLoading ? <ActivityIndicator /> : <>{title}</>}
         </Text>
      </Pressable>
   );
}
{
}
