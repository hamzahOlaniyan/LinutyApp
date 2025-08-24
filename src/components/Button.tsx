import { hp } from "@/src/constant/common";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { TiktokFont } from "@/assets/fonts/FontFamily";
import MaskedView from "@react-native-masked-view/masked-view";
import AppText from "./AppText";

function GradientText({ text, style }: { text: string; style?: any }) {
   return (
      <MaskedView maskElement={<Text style={[style, { backgroundColor: "transparent" }]}>{text}</Text>}>
         <LinearGradient
            colors={["#06b6d4", "#3b82f6", "#1d417b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 21, justifyContent: "center", alignItems: "center" }}
         >
            <AppText weight="med" style={[style, { opacity: 0 }]}>
               {text}
            </AppText>
         </LinearGradient>
      </MaskedView>
   );
}

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
      <LinearGradient
         colors={
            variant === "outline"
               ? ["#06b6d4", "#3b82f6", "#1d417b"] // real gradient for border
               : variant === "plain"
               ? ["transparent", "transparent"]
               : ["#06b6d4", "#3b82f6", "#1d417b"]
         }
         start={{ x: 0, y: 0 }}
         end={{ x: 1.2, y: 0 }}
         style={{
            borderRadius: 100,
            padding: variant === "outline" ? 1.2 : 0,
         }}
      >
         <TouchableOpacity
            style={{
               borderRadius: 100,
               justifyContent: "center",
               backgroundColor: variant === "outline" ? "white" : "transparent",
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
         >
            {variant === "outline" ? (
               <GradientText
                  text={title as string}
                  style={{
                     fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.6) : size === "xs" ? hp(1.3) : hp(1.6),
                     textAlign: "center",
                     fontFamily: TiktokFont.TiktokRegular,
                  }}
               />
            ) : (
               <Text
                  style={{
                     fontSize: size === "lg" ? hp(1.9) : size === "sm" ? hp(1.6) : size === "xs" ? hp(1.3) : hp(1.6),
                     color: variant === "plain" ? "black" : "white",
                     textAlign: "center",
                     fontFamily: TiktokFont.TiktokRegular,
                  }}
               >
                  {title}
               </Text>
            )}
         </TouchableOpacity>
      </LinearGradient>
   );
}
{
}
