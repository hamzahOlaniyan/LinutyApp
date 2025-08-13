import { TiktokFont } from "@/src/assets/fonts/FontFamily";
import { hp } from "@/src/constant/common";
// import { useThemeStore } from "@/src/context/themeStore";
import React from "react";
import { Text, TextStyle } from "react-native";

type TextWeight = "black" | "bold" | "semi" | "med" | "reg" | "light";
type TextSize = "xxxxl" | "xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs";

type AppTextProps = {
   size?: TextSize;
   children: React.ReactNode;
   weight?: TextWeight;
   cap?: "capitalize" | "uppercase";
   color?: string;
   style?: any;
   align?: "left" | "right" | "center";
   className?: string;
};

export default function AppText({
   children,
   size = "md",
   weight = "reg",
   cap,
   color,
   style,
   align,
   className,
}: AppTextProps) {
   // const { currentTheme } = useThemeStore();

   const fontSize = {
      xxxxl: hp(4.4),
      xxxl: hp(3.3),
      xxl: hp(2.7),
      xl: hp(2.1),
      lg: hp(1.9),
      md: hp(1.7),
      sm: hp(1.5),
      xs: hp(1.2),
      xxs: hp(1),
   }[size];

   const fontFamilyMap: Record<TextWeight, TextStyle["fontFamily"]> = {
      black: TiktokFont.TiktokBlack,
      bold: TiktokFont.TiktokBold,
      semi: TiktokFont.TiktokSemiBold,
      med: TiktokFont.TiktokMedium,
      reg: TiktokFont.TiktokRegular,
      light: TiktokFont.TiktokLight,
   };

   const fontFamily = fontFamilyMap[weight];

   return (
      <Text
         style={[
            style,
            {
               fontSize,
               fontFamily,
               textTransform: cap,
               // color: currentTheme === "light" ? colors.light.text : colors.dark.text || color,
               color: color,
               textAlign: align,
            },
         ]}
         className={`${className} text-nowrap`}
      >
         {children}
      </Text>
   );
}
